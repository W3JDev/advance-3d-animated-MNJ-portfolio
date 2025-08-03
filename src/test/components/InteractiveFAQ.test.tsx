import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InteractiveFAQ } from '../../components/InteractiveFAQ'

const mockFAQs = [
  {
    id: '1',
    question: 'What is your experience?',
    answer: 'I have 11+ years of experience in F&B and 5+ years in AI development.',
    category: 'Experience',
    order: 1
  },
  {
    id: '2',
    question: 'What technologies do you use?',
    answer: 'I specialize in React, TypeScript, Python, and AI/ML technologies.',
    category: 'Technical',
    order: 2
  }
]

describe('InteractiveFAQ', () => {
  it('renders FAQ questions correctly', () => {
    render(<InteractiveFAQ faqs={mockFAQs} />)
    
    expect(screen.getByText('What is your experience?')).toBeInTheDocument()
    expect(screen.getByText('What technologies do you use?')).toBeInTheDocument()
  })

  it('shows answer when question is clicked', () => {
    render(<InteractiveFAQ faqs={mockFAQs} />)
    
    const firstQuestion = screen.getByText('What is your experience?')
    fireEvent.click(firstQuestion)
    
    expect(screen.getByText(/I have 11\+ years of experience/i)).toBeInTheDocument()
  })

  it('toggles answer visibility on multiple clicks', () => {
    render(<InteractiveFAQ faqs={mockFAQs} />)
    
    const firstQuestion = screen.getByText('What is your experience?')
    
    // Click to open
    fireEvent.click(firstQuestion)
    expect(screen.getByText(/I have 11\+ years of experience/i)).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(firstQuestion)
    expect(screen.queryByText(/I have 11\+ years of experience/i)).not.toBeInTheDocument()
  })

  it('renders empty state when no FAQs provided', () => {
    render(<InteractiveFAQ faqs={[]} />)
    
    expect(screen.getByText(/no frequently asked questions available/i)).toBeInTheDocument()
  })
})