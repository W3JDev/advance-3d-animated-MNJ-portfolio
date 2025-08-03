import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AdvancedProjectCard } from '../../components/AdvancedProjectCard'

const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  longDescription: 'Detailed test project description',
  tech: ['React', 'TypeScript', 'Node.js'],
  category: 'Web Development',
  year: '2024',
  gradient: 'from-blue-600 to-purple-600',
  stats: [
    { metric: 'Performance', value: '95%' },
    { metric: 'Satisfaction', value: '98%' }
  ],
  features: ['Feature 1', 'Feature 2'],
  impact: {
    business: 'Increased revenue by 50%',
    technical: 'Improved performance by 3x',
    user: 'Enhanced user experience'
  },
  githubUrl: 'https://github.com/test/project',
  featured: true
}

describe('AdvancedProjectCard', () => {
  const mockOnViewCaseStudy = vi.fn()

  it('renders project information correctly', () => {
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={mockOnViewCaseStudy}
      />
    )
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project description')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('displays project stats correctly', () => {
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={mockOnViewCaseStudy}
      />
    )
    
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
  })

  it('calls onViewCaseStudy when case study button is clicked', () => {
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={mockOnViewCaseStudy}
      />
    )
    
    const caseStudyButton = screen.getByRole('button', { name: /view case study/i })
    fireEvent.click(caseStudyButton)
    
    expect(mockOnViewCaseStudy).toHaveBeenCalledWith(mockProject)
  })

  it('renders GitHub link when provided', () => {
    render(
      <AdvancedProjectCard 
        project={mockProject} 
        index={0} 
        onViewCaseStudy={mockOnViewCaseStudy}
      />
    )
    
    const githubLink = screen.getByRole('link', { name: /view code/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project')
  })
})