import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

describe('App Component', () => {
  it('mounts and shows hero fallback', async () => {
    render(<App />)
    await screen.findByTestId('fallback-hero')
  })
})