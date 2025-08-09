import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  root: Element | Document | null = null;
  rootMargin: string = '0px';
  thresholds: readonly number[] = [0];
  
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {
    if (options?.root) this.root = options.root;
    if (options?.rootMargin) this.rootMargin = options.rootMargin;
    if (options?.threshold) {
      this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold];
    }
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock window.ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock framer-motion for tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    button: 'button',
    a: 'a',
    img: 'img',
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useSpring: (value: any) => value,
  useTransform: (value: any, input: any, output: any) => output[0],
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock SmartPreloader to instantly render children
vi.mock('../../components/ProgressiveLoader', async (orig) => {
  const actual: any = await orig()
  return Object.assign({}, actual, {
    SmartPreloader: (props: any) => {
      return props.children
    },
  })
})

// Mock MotionProvider to avoid dynamic import in tests
vi.mock('../../components/MotionProvider', async (orig) => {
  const actual: any = await orig()
  return {
    ...actual,
    MotionProvider: ({ children }: any) => children,
    useMotion: () => ({
      motion: new Proxy({}, { get: (_t, p: string) => p }),
      useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
      useSpring: (v: any) => v,
      useTransform: (_v: any, _i: any, o: any) => (Array.isArray(o) ? o[0] : 0),
      AnimatePresence: ({ children }: any) => children,
      isLoaded: true,
      ensureMotion: () => {},
    }),
  }
})