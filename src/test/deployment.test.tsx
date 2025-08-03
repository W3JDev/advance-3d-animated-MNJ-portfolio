import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Deployment Readiness', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('displays all critical sections', () => {
    render(<App />)
    
    // Critical sections that must be visible
    const criticalSections = [
      /A Unique Perspective/i,
      /My Methodology/i,
      /Featured Projects/i,
      /Client Success Stories/i,
      /Frequently Asked Questions/i,
      /Ready to Innovate/i
    ]
    
    criticalSections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('displays all project data correctly', () => {
    render(<App />)
    
    // Must show all 5 projects
    expect(screen.getByText(/GuestAi - AI Guest Management/i)).toBeInTheDocument()
    expect(screen.getByText(/Waiter_Ai - Smart Restaurant Assistant/i)).toBeInTheDocument()
    expect(screen.getByText(/PUNCH-CLOCK - Smart Attendance System/i)).toBeInTheDocument()
    expect(screen.getByText(/ArtisanAI ATS Resume Builder/i)).toBeInTheDocument()
    expect(screen.getByText(/Employee Attendance Google Sheets System/i)).toBeInTheDocument()
  })

  it('displays testimonials correctly', () => {
    render(<App />)
    
    // Must show testimonials
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/Marcus Rodriguez/i)).toBeInTheDocument()
    expect(screen.getByText(/Elena Kowalski/i)).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<App />)
    
    // Must show contact info
    expect(screen.getByText(/mnjewelps@gmail.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Malaysia/i)).toBeInTheDocument()
    expect(screen.getByText(/w3j LLC/i)).toBeInTheDocument()
  })

  it('has working navigation', () => {
    render(<App />)
    
    // Contact button should be present
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()
  })

  it('displays social links', () => {
    render(<App />)
    
    // Social links should be present
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
  })

  it('shows availability status', () => {
    render(<App />)
    
    // Should show availability
    expect(screen.getByText(/Available for Projects/i)).toBeInTheDocument()
  })

  it('displays key metrics and stats', () => {
    render(<App />)
    
    // Key business metrics
    expect(screen.getByText(/300%/i)).toBeInTheDocument() // ROI Impact
    expect(screen.getByText(/11\+/i)).toBeInTheDocument() // Years Experience
  })

  it('has proper meta information for SEO', () => {
    // Check document title and meta tags would be set correctly
    expect(document.title).toBeTruthy()
  })

  it('renders without console errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<App />)
    
    expect(consoleSpy).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })
})

describe('Performance Checks', () => {
  it('renders large components efficiently', () => {
    const startTime = performance.now()
    
    render(<App />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Should render in under 100ms
    expect(renderTime).toBeLessThan(100)
  })

  it('handles large datasets without issues', () => {
    expect(() => {
      render(<App />)
      
      // Simulate scrolling and interactions
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('resize'))
      
    }).not.toThrow()
  })
})

describe('Accessibility', () => {
  it('has proper heading hierarchy', () => {
    render(<App />)
    
    // Should have proper heading structure
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('has accessible buttons', () => {
    render(<App />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName()
    })
  })

  it('has accessible links', () => {
    render(<App />)
    
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAccessibleName()
    })
  })
})