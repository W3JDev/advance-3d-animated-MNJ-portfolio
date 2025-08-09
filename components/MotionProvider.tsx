import React, { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';

// Types for framer-motion subset we use
interface MotionLib {
  motion: any;
  useScroll: () => any;
  useSpring: any;
  useTransform: any;
  AnimatePresence?: any;
}

interface MotionContextValue extends MotionLib {
  isLoaded: boolean;
  ensureMotion: () => void;
}

const noop = () => {};

// Create shims that swallow animation props to avoid React unknown attribute warnings
const animationPropKeys = new Set(['initial','animate','whileInView','whileHover','whileTap','exit','transition','variants','viewport','layout']);
const createShim = (Tag: keyof JSX.IntrinsicElements) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef<any, any>((props, ref) => {
    const cleaned: any = { ref };
    for (const key in props) {
      if (!animationPropKeys.has(key)) cleaned[key] = props[key];
    }
    return React.createElement(Tag, cleaned, props.children);
  });
};

const shimMotion: any = new Proxy({}, {
  get: (_t, p: string) => createShim(p as keyof JSX.IntrinsicElements)
});

// Create stable shimmed scroll progress object
const stableScrollProgress = { get: () => 0 };
const stableScrollData = { scrollYProgress: stableScrollProgress };

// Create stable shimmed functions
const stableUseScroll = () => stableScrollData;
const stableUseSpring = (v: any) => v;
const stableUseTransform = (_v: any, _i: any, o: any) => Array.isArray(o) ? o[0] : 0;
const stableAnimatePresence = ({ children }: { children: ReactNode }) => <>{children}</>;

const defaultValue: MotionContextValue = {
  motion: shimMotion,
  useScroll: stableUseScroll,
  useSpring: stableUseSpring,
  useTransform: stableUseTransform,
  AnimatePresence: stableAnimatePresence,
  isLoaded: false,
  ensureMotion: noop,
};

const MotionContext = createContext<MotionContextValue>(defaultValue);

interface MotionProviderProps { children: ReactNode; eager?: boolean; }

export const MotionProvider: React.FC<MotionProviderProps> = ({ children, eager = false }) => {
  const [lib, setLib] = useState<MotionContextValue>(defaultValue);
  const loadingRef = useRef(false);

  const load = useCallback(() => {
    if (loadingRef.current || lib.isLoaded) return;
    loadingRef.current = true;
    import('framer-motion').then(m => {
      setLib({
        motion: m.motion,
        useScroll: m.useScroll,
        useSpring: m.useSpring,
        useTransform: m.useTransform,
        AnimatePresence: m.AnimatePresence,
        isLoaded: true,
        ensureMotion: load,
      });
    }).catch(() => {
      loadingRef.current = false;
    });
  }, [lib.isLoaded]);

  useEffect(() => {
    if (eager) load();
    const handler = () => load();
    const events = ['pointerdown','mousemove','keydown','scroll','touchstart'];
    events.forEach(ev => window.addEventListener(ev, handler, { once: true, passive: true }));
    return () => events.forEach(ev => window.removeEventListener(ev, handler));
  }, [eager, load]);

  return <MotionContext.Provider value={lib}>{children}</MotionContext.Provider>;
};

export function useMotion() { return useContext(MotionContext); }
