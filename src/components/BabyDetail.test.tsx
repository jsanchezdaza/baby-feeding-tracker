import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BabyDetail from './BabyDetail'
import type { Baby } from '../types/baby'
import type { FeedingRecord } from '../types/feeding'

describe('BabyDetail', () => {
  const mockBaby: Baby = {
    id: '1',
    name: 'Sofia',
    birthDate: new Date('2024-01-15')
  }

  const mockFeedingRecords: FeedingRecord[] = [
    {
      id: '1',
      babyId: '1',
      amount: 120,
      timestamp: new Date('2024-01-15T09:30:00')
    },
    {
      id: '2',
      babyId: '1',
      amount: 150,
      timestamp: new Date('2024-01-15T13:15:00')
    }
  ]

  it('should display correct title with baby name', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    expect(screen.getByText('Registro de tomas de Sofia')).toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', async () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    const user = userEvent.setup()

    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    const backButton = screen.getByText('Volver')
    await user.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it('should display time since last feeding information', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    expect(screen.getByText('Tiempo desde la última toma')).toBeInTheDocument()
    expect(screen.getByText('Sin tomas registradas')).toBeInTheDocument()
  })

  it('should display feeding records when provided', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    render(<BabyDetail baby={mockBaby} feedingRecords={mockFeedingRecords} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    expect(screen.getByText('Historial de tomas')).toBeInTheDocument()
    expect(screen.getByText('120 ml')).toBeInTheDocument()
    expect(screen.getByText('150 ml')).toBeInTheDocument()
  })

  it('should display empty state when no feeding records provided', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    expect(screen.getByText('No hay tomas registradas aún')).toBeInTheDocument()
  })

  it('should display add feeding button', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    expect(screen.getByText('Añadir nueva toma')).toBeInTheDocument()
  })

  it('should show add feeding form when button is clicked', async () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    const user = userEvent.setup()

    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    const addButton = screen.getByText('Añadir nueva toma')
    await user.click(addButton)

    expect(screen.getByText('Añadir toma para Sofia')).toBeInTheDocument()
    expect(screen.getByLabelText('Cantidad (ml)')).toBeInTheDocument()
  })

  it('should call onAddFeeding when form is submitted', async () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()
    const user = userEvent.setup()

    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    const addButton = screen.getByText('Añadir nueva toma')
    await user.click(addButton)

    const amountInput = screen.getByLabelText('Cantidad (ml)')
    await user.type(amountInput, '150')

    const saveButton = screen.getByText('Guardar toma')
    await user.click(saveButton)

    expect(mockOnAddFeeding).toHaveBeenCalledWith(150)
  })

  it('should have increased top padding', () => {
    const mockOnBack = vi.fn()
    const mockOnAddFeeding = vi.fn()

    render(<BabyDetail baby={mockBaby} feedingRecords={[]} onBack={mockOnBack} onAddFeeding={mockOnAddFeeding} />)

    const container = screen.getByText('Registro de tomas de Sofia').closest('.min-h-screen')
    expect(container).toHaveClass('pt-12')
  })
})