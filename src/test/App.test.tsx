import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

describe('App Component', () => {
  it('renders the main portfolio sections', () => {
    render(<App />)
    
    // Check for main sections
    expect(screen.getByText(/A Unique Perspective/i)).toBeInTheDocument()
    expect(screen.getByText(/My Methodology/i)).toBeInTheDocument()
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument()
    expect(screen.getByText(/Client Success Stories/i)).toBeInTheDocument()
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument()
    expect(screen.getByText(/Ready to Innovate/i)).toBeInTheDocument()
  })

  it('displays portfolio data correctly', () => {
    render(<App />)
    
    // Check for projects
    expect(screen.getByText(/GuestAi - AI Guest Management/i)).toBeInTheDocument()
    expect(screen.getByText(/Waiter_Ai - Smart Restaurant Assistant/i)).toBeInTheDocument()
    expect(screen.getByText(/PUNCH-CLOCK - Smart Attendance System/i)).toBeInTheDocument()
    
    // Check for testimonials
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/Marcus Rodriguez/i)).toBeInTheDocument()
    
    // Check for settings data
    expect(screen.getByText(/Malaysia/i)).toBeInTheDocument()
    expect(screen.getByText(/w3j LLC/i)).toBeInTheDocument()
  })

  it('renders navigation elements', () => {
    render(<App />)
    
    // Check for contact button
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()
  })

  it('displays social links correctly', () => {
    render(<App />)
    
    // Check for social links in footer
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/Email/i)).toBeInTheDocument()
  })
})