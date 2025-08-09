import { useEffect, useRef } from 'react';

interface PrefetchOnViewOptions {
  prefetch: () => void | Promise<void>;
  rootMargin?: string;
  once?: boolean;
}

// Hook: prefetch upcoming section when current sentinel enters viewport threshold
export function usePrefetchOnView({ prefetch, rootMargin = '200px', once = true }: PrefetchOnViewOptions) {
  const triggeredRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (triggeredRef.current) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          Promise.resolve(prefetch());
          if (once) observer.disconnect();
        }
      });
    }, { rootMargin });

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefetch, rootMargin, once]);

  return sentinelRef;
}
