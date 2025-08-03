import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestimonialGrid } from '../../components/TestimonialGrid'

const mockTestimonials = [
  {
    id: '1',
    name: 'John Doe',
    role: 'CEO',
    company: 'Test Company',
    content: 'Great work on the project!',
    rating: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'CTO',
    company: 'Another Company',
    content: 'Excellent technical skills and delivery.',
    rating: 5,
    featured: false
  }
]

describe('TestimonialGrid', () => {
  it('renders all testimonials correctly', () => {
    render(<TestimonialGrid testimonials={mockTestimonials} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('CEO')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('Great work on the project!')).toBeInTheDocument()
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('CTO')).toBeInTheDocument()
    expect(screen.getByText('Another Company')).toBeInTheDocument()
    expect(screen.getByText('Excellent technical skills and delivery.')).toBeInTheDocument()
  })

  it('renders empty state when no testimonials provided', () => {
    render(<TestimonialGrid testimonials={[]} />)
    
    expect(screen.getByText(/no testimonials available/i)).toBeInTheDocument()
  })

  it('displays rating stars correctly', () => {
    render(<TestimonialGrid testimonials={mockTestimonials} />)
    
    // Should render 5 stars for each testimonial (both have 5-star ratings)
    const stars = screen.getAllByTestId('star-icon')
    expect(stars).toHaveLength(10) // 5 stars × 2 testimonials
  })
})