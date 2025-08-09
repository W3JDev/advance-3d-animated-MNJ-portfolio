import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock SmartPreloader to skip real loading
vi.mock('../../components/ProgressiveLoader', async (orig) => {
  const actual: any = await orig();
  return {
    ...actual,
    SmartPreloader: ({ children }: any) => <>{children}</>,
  };
});

describe('Lazy loading & Suspense integration', () => {
  it('renders hero fallback placeholder', async () => {
    render(<App />);
    // Hero fallback should appear while lazy loading
    await waitFor(() => expect(screen.getByTestId('fallback-hero')).toBeTruthy());
  });
});
