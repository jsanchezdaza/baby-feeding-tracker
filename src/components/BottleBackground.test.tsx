import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
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

  it('should maintain stable bottle positions between renders', () => {
    let triggerRerender: () => void

    const Wrapper = () => {
      const [, setCount] = React.useState(0)
      triggerRerender = () => setCount(c => c + 1)
      return <BottleBackground />
    }

    render(<Wrapper />)

    const background = screen.getByTestId('bottle-background')
    const firstRenderHTML = background.innerHTML

    React.act(() => {
      triggerRerender()
    })

    const secondRenderHTML = background.innerHTML
    expect(secondRenderHTML).toBe(firstRenderHTML)
  })
})