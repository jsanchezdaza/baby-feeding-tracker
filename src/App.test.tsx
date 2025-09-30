import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('should maintain stable background when navigating between screens', async () => {
    const user = userEvent.setup()

    render(<App />)

    const background = screen.getByTestId('bottle-background')
    const initialHTML = background.innerHTML

    // Navigate to Add Baby Form
    const addButton = screen.getByText(/añadir bebé/i)
    await user.click(addButton)

    const currentHTML = background.innerHTML
    expect(currentHTML).toBe(initialHTML)

    // Navigate back to BabyList
    const cancelButton = screen.getByText(/cancelar/i)
    await user.click(cancelButton)

    const finalHTML = background.innerHTML
    expect(finalHTML).toBe(initialHTML)
  })
})