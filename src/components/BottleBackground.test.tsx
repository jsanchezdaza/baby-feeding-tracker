import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BottleBackground from './BottleBackground'

describe('BottleBackground', () => {
  it('should render background container', () => {
    render(<BottleBackground />)

    const background = screen.getByTestId('bottle-background')
    expect(background).toBeInTheDocument()
  })

  it('should have appropriate CSS classes for background pattern', () => {
    render(<BottleBackground />)

    const background = screen.getByTestId('bottle-background')
    expect(background).toHaveClass('fixed', 'inset-0', 'pointer-events-none')
  })

  it('should not interfere with user interactions', () => {
    render(<BottleBackground />)

    const background = screen.getByTestId('bottle-background')
    expect(background).toHaveClass('pointer-events-none')
  })
})