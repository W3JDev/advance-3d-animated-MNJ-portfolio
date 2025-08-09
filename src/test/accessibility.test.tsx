import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// Extend Vitest matchers for axe
expect.extend(toHaveNoViolations);

// TypeScript declaration for jest-axe matcher
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

describe('Accessibility Tests', () => {
  it('should have no accessibility violations on simple button', async () => {
    const { container } = render(
      <button aria-label="Test button">Click me</button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
