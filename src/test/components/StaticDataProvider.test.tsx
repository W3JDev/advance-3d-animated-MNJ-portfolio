import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StaticDataProvider, usePortfolioData } from '../../components/StaticDataProvider'

// Test component to consume the context
function TestComponent() {
  const { projects, testimonials, faqs, settings, about } = usePortfolioData()
  
  return (
    <div>
      <div data-testid="projects-count">{projects.length}</div>
      <div data-testid="testimonials-count">{testimonials.length}</div>
      <div data-testid="faqs-count">{faqs.length}</div>
      <div data-testid="settings-email">{settings.email}</div>
      <div data-testid="about-bio">{about.bio}</div>
    </div>
  )
}

describe('StaticDataProvider', () => {
  it('provides portfolio data correctly', () => {
    render(
      <StaticDataProvider>
        <TestComponent />
      </StaticDataProvider>
    )
    
    // Check data counts
    expect(screen.getByTestId('projects-count')).toHaveTextContent('5') // 5 projects
    expect(screen.getByTestId('testimonials-count')).toHaveTextContent('6') // 6 testimonials
    expect(screen.getByTestId('faqs-count')).toHaveTextContent('6') // 6 FAQs
    
    // Check settings data
    expect(screen.getByTestId('settings-email')).toHaveTextContent('mnjewelps@gmail.com')
    
    // Check about data
    expect(screen.getByTestId('about-bio')).toContain('Full-Stack AI Developer')
  })

  it('throws error when used outside provider', () => {
    // Silence console.error for this test
    const originalError = console.error
    console.error = () => {}
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('usePortfolioData must be used within a StaticDataProvider')
    
    console.error = originalError
  })
})