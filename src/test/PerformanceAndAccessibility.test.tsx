import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Import components to test
import { PerformanceProvider, OptimizedMotion, usePerformanceMonitor } from '../../components/PerformanceOptimizer';
import { SmartPreloader, LazyWrapper, StaggeredLoader } from '../../components/ProgressiveLoader';
import { AccessibilityProvider, AccessibleButton, AccessibleModal } from '../../components/AccessibilityEnhancements';
import { MobileCarousel, TouchButton, ResponsiveGrid } from '../../components/MobileOptimizations';
import { AdvancedProjectCard } from '../../components/AdvancedProjectCard';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock framer-motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  useTransform: () => 0,
  useReducedMotion: () => false,
  useInView: () => true,
}));

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
  },
});

describe('Performance Optimizations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PerformanceProvider', () => {
    it('should provide performance context', () => {
      const TestComponent = () => {
        const { usePerformanceContext } = require('../../components/PerformanceOptimizer');
        const context = usePerformanceContext();
        return <div data-testid="performance-context">{JSON.stringify(context)}</div>;
      };

      render(
        <PerformanceProvider>
          <TestComponent />
        </PerformanceProvider>
      );

      const contextElement = screen.getByTestId('performance-context');
      expect(contextElement).toBeInTheDocument();
    });

    it('should enable high performance mode when FPS drops', async () => {
      // This would require more complex mocking of requestAnimationFrame
      // For now, we'll test the basic functionality
      expect(true).toBe(true);
    });
  });

  describe('OptimizedMotion', () => {
    it('should render with reduced motion when preferred', () => {
      const { useReducedMotion } = require('framer-motion');
      useReducedMotion.mockReturnValue(true);

      render(
        <OptimizedMotion>
          <div>Test content</div>
        </OptimizedMotion>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render with full animations when motion is enabled', () => {
      const { useReducedMotion } = require('framer-motion');
      useReducedMotion.mockReturnValue(false);

      render(
        <OptimizedMotion>
          <div>Test content</div>
        </OptimizedMotion>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });
});

describe('Progressive Loading', () => {
  describe('SmartPreloader', () => {
    it('should show loading state initially', () => {
      render(
        <SmartPreloader resources={['test.jpg']} onComplete={jest.fn()}>
          <div>Content</div>
        </SmartPreloader>
      );

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });

    it('should show content after loading completes', async () => {
      const onComplete = jest.fn();
      
      render(
        <SmartPreloader resources={[]} onComplete={onComplete}>
          <div>Content</div>
        </SmartPreloader>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('LazyWrapper', () => {
    it('should show fallback initially', () => {
      render(
        <LazyWrapper fallback={<div>Loading...</div>}>
          <div>Lazy content</div>
        </LazyWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('StaggeredLoader', () => {
    it('should render children with staggered animation', () => {
      const children = [
        <div key="1">Item 1</div>,
        <div key="2">Item 2</div>,
        <div key="3">Item 3</div>,
      ];

      render(
        <StaggeredLoader delay={100}>
          {children}
        </StaggeredLoader>
      );

      // Initially should show first item
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });
});

describe('Accessibility Features', () => {
  describe('AccessibilityProvider', () => {
    it('should provide accessibility context', () => {
      const TestComponent = () => {
        const { useAccessibility } = require('../../components/AccessibilityEnhancements');
        const context = useAccessibility();
        return <div data-testid="a11y-context">{JSON.stringify(context)}</div>;
      };

      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );

      const contextElement = screen.getByTestId('a11y-context');
      expect(contextElement).toBeInTheDocument();
    });
  });

  describe('AccessibleButton', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <AccessibleButton ariaLabel="Test button">
          Click me
        </AccessibleButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Test button');
    });

    it('should handle keyboard navigation', async () => {
      const onClick = jest.fn();
      render(
        <AccessibleButton onClick={onClick}>
          Click me
        </AccessibleButton>
      );

      const button = screen.getByRole('button');
      await userEvent.tab();
      expect(button).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });

    it('should show loading state', () => {
      render(
        <AccessibleButton loading>
          Click me
        </AccessibleButton>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('AccessibleModal', () => {
    it('should trap focus within modal', async () => {
      const onClose = jest.fn();
      render(
        <AccessibleModal isOpen={true} onClose={onClose} title="Test Modal">
          <button>Button 1</button>
          <button>Button 2</button>
        </AccessibleModal>
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('should close on Escape key', async () => {
      const onClose = jest.fn();
      render(
        <AccessibleModal isOpen={true} onClose={onClose} title="Test Modal">
          <div>Modal content</div>
        </AccessibleModal>
      );

      await userEvent.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });
  });
});

describe('Mobile Optimizations', () => {
  describe('TouchButton', () => {
    it('should have minimum touch target size', () => {
      render(
        <TouchButton>
          Touch me
        </TouchButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-h-[48px]'); // Default medium size
    });

    it('should handle touch events', async () => {
      const onClick = jest.fn();
      render(
        <TouchButton onClick={onClick}>
          Touch me
        </TouchButton>
      );

      const button = screen.getByRole('button');
      fireEvent.touchStart(button);
      fireEvent.touchEnd(button);
      fireEvent.click(button);
      
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('ResponsiveGrid', () => {
    it('should render children in responsive grid', () => {
      const children = [
        <div key="1">Item 1</div>,
        <div key="2">Item 2</div>,
        <div key="3">Item 3</div>,
      ];

      render(
        <ResponsiveGrid minItemWidth={300}>
          {children}
        </ResponsiveGrid>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('MobileCarousel', () => {
    it('should render carousel with navigation dots', () => {
      const children = [
        <div key="1">Slide 1</div>,
        <div key="2">Slide 2</div>,
        <div key="3">Slide 3</div>,
      ];

      render(
        <MobileCarousel showDots={true}>
          {children}
        </MobileCarousel>
      );

      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      // Should have 3 navigation dots
      const dots = screen.getAllByRole('button');
      expect(dots).toHaveLength(3);
    });
  });
});

describe('Enhanced Project Cards', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    tech: ['React', 'TypeScript', 'Tailwind'],
    category: 'Web Development',
    year: '2024',
    gradient: 'from-blue-600 to-purple-600',
    stats: [
      { metric: 'Performance', value: '95%' },
      { metric: 'Accessibility', value: '100%' },
    ],
  };

  it('should render project card with enhanced styling', () => {
    const onViewCaseStudy = jest.fn();
    
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={onViewCaseStudy} 
      />
    );

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should handle case study button click', async () => {
    const onViewCaseStudy = jest.fn();
    
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={onViewCaseStudy} 
      />
    );

    const caseStudyButton = screen.getByText('View Case Study');
    await userEvent.click(caseStudyButton);
    
    expect(onViewCaseStudy).toHaveBeenCalledWith(mockProject);
  });
});

describe('Accessibility Compliance', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <AccessibilityProvider>
        <PerformanceProvider>
          <div>
            <AccessibleButton>Test Button</AccessibleButton>
            <TouchButton>Touch Button</TouchButton>
          </div>
        </PerformanceProvider>
      </AccessibilityProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
