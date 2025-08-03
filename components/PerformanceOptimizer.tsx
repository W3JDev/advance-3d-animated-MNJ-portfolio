import React, { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    isOptimized: true
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({
          ...prev,
          fps,
          isOptimized: fps >= 55 // Consider 55+ FPS as optimized
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return metrics;
}

// Optimized motion wrapper with reduced motion support
interface OptimizedMotionProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  viewport?: any;
  layoutId?: string;
}

export const OptimizedMotion = memo(({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit,
  transition = { duration: 0.3, ease: 'easeOut' },
  whileHover,
  whileTap,
  viewport = { once: true, margin: '-50px' },
  layoutId
}: OptimizedMotionProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Simplified animations for reduced motion preference
  const optimizedProps = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.1 },
        whileHover: undefined,
        whileTap: undefined
      };
    }
    
    return {
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap
    };
  }, [shouldReduceMotion, initial, animate, exit, transition, whileHover, whileTap]);

  return (
    <motion.div
      className={className}
      viewport={viewport}
      layoutId={layoutId}
      {...optimizedProps}
    >
      {children}
    </motion.div>
  );
});

OptimizedMotion.displayName = 'OptimizedMotion';

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
}

// Optimized image component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==',
  width,
  height
}: OptimizedImageProps) => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {!isIntersecting ? (
          <motion.img
            key="placeholder"
            src={placeholder}
            alt=""
            className="w-full h-full object-cover blur-sm"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.img
            key="actual"
            src={hasError ? placeholder : src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoaded ? 'blur-0' : 'blur-sm'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            decoding="async"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Debounced value hook for performance
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttled callback hook
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

// Memory-efficient list virtualization for large datasets
interface VirtualizedListProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

export const VirtualizedList = memo(({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = ''
}: VirtualizedListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = useMemo(() => 
    items.slice(visibleStart, visibleEnd),
    [items, visibleStart, visibleEnd]
  );

  const handleScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, 16); // ~60fps

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleStart * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={visibleStart + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

// Performance context for global optimization settings
interface PerformanceContextType {
  isHighPerformanceMode: boolean;
  enableAnimations: boolean;
  enableParticles: boolean;
  enableBlur: boolean;
  setHighPerformanceMode: (enabled: boolean) => void;
}

const PerformanceContext = React.createContext<PerformanceContextType>({
  isHighPerformanceMode: false,
  enableAnimations: true,
  enableParticles: true,
  enableBlur: true,
  setHighPerformanceMode: () => {}
});

export const usePerformanceContext = () => React.useContext(PerformanceContext);

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const [isHighPerformanceMode, setIsHighPerformanceMode] = useState(false);
  const metrics = usePerformanceMonitor();

  // Auto-enable high performance mode if FPS drops
  useEffect(() => {
    if (metrics.fps < 45 && !isHighPerformanceMode) {
      setIsHighPerformanceMode(true);
    }
  }, [metrics.fps, isHighPerformanceMode]);

  const value = useMemo(() => ({
    isHighPerformanceMode,
    enableAnimations: !isHighPerformanceMode,
    enableParticles: !isHighPerformanceMode,
    enableBlur: !isHighPerformanceMode,
    setHighPerformanceMode: setIsHighPerformanceMode
  }), [isHighPerformanceMode]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};
