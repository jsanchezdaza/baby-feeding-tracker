import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBabyForm from './AddBabyForm'

describe('AddBabyForm', () => {
  it('should render form with name and birth date inputs', () => {
    const mockOnAdd = vi.fn()
    const mockOnCancel = vi.fn()

    render(<AddBabyForm onAddBaby={mockOnAdd} onCancel={mockOnCancel} />)

    expect(screen.getByLabelText(/nombre del bebé/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument()
    expect(screen.getByText('Guardar')).toBeInTheDocument()
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
  })

  it('should call onAddBaby with form data when submitted', async () => {
    const mockOnAdd = vi.fn()
    const mockOnCancel = vi.fn()
    const user = userEvent.setup()

    render(<AddBabyForm onAddBaby={mockOnAdd} onCancel={mockOnCancel} />)

    const nameInput = screen.getByLabelText(/nombre del bebé/i)
    const dateInput = screen.getByLabelText(/fecha de nacimiento/i)
    const submitButton = screen.getByText('Guardar')

    await user.type(nameInput, 'Sofia')
    await user.type(dateInput, '2024-01-15')
    await user.click(submitButton)

    expect(mockOnAdd).toHaveBeenCalledWith({
      name: 'Sofia',
      birthDate: new Date('2024-01-15')
    })
  })

  it('should call onCancel when cancel button is clicked', async () => {
    const mockOnAdd = vi.fn()
    const mockOnCancel = vi.fn()
    const user = userEvent.setup()

    render(<AddBabyForm onAddBaby={mockOnAdd} onCancel={mockOnCancel} />)

    const cancelButton = screen.getByText('Cancelar')
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('should not submit form with empty name', async () => {
    const mockOnAdd = vi.fn()
    const mockOnCancel = vi.fn()
    const user = userEvent.setup()

    render(<AddBabyForm onAddBaby={mockOnAdd} onCancel={mockOnCancel} />)

    const dateInput = screen.getByLabelText(/fecha de nacimiento/i)
    const submitButton = screen.getByText('Guardar')

    await user.type(dateInput, '2024-01-15')
    await user.click(submitButton)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })
})