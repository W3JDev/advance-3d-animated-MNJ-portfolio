import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Skeleton components for progressive loading
export const SkeletonCard = memo(() => (
  <div className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 animate-pulse">
    <div className="space-y-4">
      {/* Category badge skeleton */}
      <div className="w-20 h-6 bg-white/20 rounded-full" />
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="w-3/4 h-6 bg-white/20 rounded" />
        <div className="w-1/2 h-6 bg-white/20 rounded" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-white/15 rounded" />
        <div className="w-full h-4 bg-white/15 rounded" />
        <div className="w-2/3 h-4 bg-white/15 rounded" />
      </div>
      
      {/* Meta info skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white/20 rounded" />
            <div className="w-12 h-3 bg-white/20 rounded" />
          </div>
        ))}
      </div>
      
      {/* Tech stack skeleton */}
      <div className="flex flex-wrap gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-16 h-6 bg-white/20 rounded-lg" />
        ))}
      </div>
      
      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="w-8 h-5 bg-white/20 rounded mx-auto mb-1" />
            <div className="w-12 h-3 bg-white/15 rounded mx-auto" />
          </div>
        ))}
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-white/20 rounded-xl" />
        <div className="w-12 h-12 bg-white/20 rounded-xl" />
        <div className="w-12 h-12 bg-white/20 rounded-xl" />
      </div>
    </div>
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonText = memo(({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-white/20 rounded animate-pulse ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonAvatar = memo(({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} bg-white/20 rounded-full animate-pulse`} />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Progressive loading hook
export function useProgressiveLoading<T>(
  loadFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await loadFunction();
        
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, dependencies);

  return { data, loading, error };
}

// Staggered loading container
interface StaggeredLoaderProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export const StaggeredLoader = memo(({ 
  children, 
  delay = 100, 
  className = '' 
}: StaggeredLoaderProps) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < children.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, children.length, delay]);

  return (
    <div className={className}>
      <AnimatePresence>
        {children.slice(0, visibleCount).map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: 'easeOut',
              delay: index * 0.05 
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

StaggeredLoader.displayName = 'StaggeredLoader';

// Smart preloader for critical resources
interface PreloaderProps {
  resources: string[];
  onComplete?: () => void;
  children: React.ReactNode;
}

export const SmartPreloader = memo(({ 
  resources, 
  onComplete, 
  children 
}: PreloaderProps) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const progress = useMemo(() => 
    resources.length > 0 ? (loadedCount / resources.length) * 100 : 100,
    [loadedCount, resources.length]
  );

  useEffect(() => {
    if (resources.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const loadResource = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = url;
        } else if (url.match(/\.(woff|woff2|ttf|otf)$/i)) {
          const font = new FontFace('preload-font', `url(${url})`);
          font.load().then(() => resolve()).catch(() => reject());
        } else {
          // For other resources, use fetch
          fetch(url)
            .then(() => resolve())
            .catch(() => reject());
        }
      });
    };

    const loadAllResources = async () => {
      let loaded = 0;
      
      for (const resource of resources) {
        try {
          await loadResource(resource);
        } catch (error) {
          console.warn(`Failed to preload resource: ${resource}`);
        } finally {
          loaded++;
          setLoadedCount(loaded);
        }
      }
      
      setIsComplete(true);
      onComplete?.();
    };

    loadAllResources();
  }, [resources, onComplete]);

  if (!isComplete) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
          
          <motion.p
            className="text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading... {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
});

SmartPreloader.displayName = 'SmartPreloader';

// Lazy loading wrapper with intersection observer
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const LazyWrapper = memo(({
  children,
  fallback = <SkeletonCard />,
  threshold = 0.1,
  rootMargin = '100px',
  className = ''
}: LazyWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return (
    <div ref={setRef} className={className}>
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="fallback"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fallback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LazyWrapper.displayName = 'LazyWrapper';
