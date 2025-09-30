import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BabyList from './BabyList'
import type { Baby } from '../types/baby'

describe('BabyList', () => {
  it('should show "Añadir bebé" button when no babies exist', () => {
    const mockOnAddBaby = vi.fn()
    render(<BabyList babies={[]} onAddBaby={mockOnAddBaby} />)

    expect(screen.getByText('Añadir bebé')).toBeInTheDocument()
  })

  it('should display list of babies when babies exist', () => {
    const mockBabies: Baby[] = [
      {
        id: '1',
        name: 'Sofia',
        birthDate: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Diego',
        birthDate: new Date('2024-03-20')
      }
    ]
    const mockOnAddBaby = vi.fn()

    render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} />)

    expect(screen.getByText('Sofia')).toBeInTheDocument()
    expect(screen.getByText('Diego')).toBeInTheDocument()
    expect(screen.queryByText('Añadir bebé')).not.toBeInTheDocument()
  })

  it('should show "Seleccione un bebé" title when babies exist', () => {
    const mockBabies: Baby[] = [
      {
        id: '1',
        name: 'Sofia',
        birthDate: new Date('2024-01-15')
      }
    ]
    const mockOnAddBaby = vi.fn()

    render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} />)

    expect(screen.getByText('Seleccione un bebé')).toBeInTheDocument()
  })

  it('should call onAddBaby when "Añadir bebé" button is clicked', async () => {
    const mockOnAddBaby = vi.fn()
    const user = userEvent.setup()

    render(<BabyList babies={[]} onAddBaby={mockOnAddBaby} />)

    const addButton = screen.getByText('Añadir bebé')
    await user.click(addButton)

    expect(mockOnAddBaby).toHaveBeenCalled()
  })

  it('should call onSelectBaby when a baby card is clicked', async () => {
    const mockBabies: Baby[] = [
      {
        id: '1',
        name: 'Sofia',
        birthDate: new Date('2024-01-15')
      }
    ]
    const mockOnAddBaby = vi.fn()
    const mockOnSelectBaby = vi.fn()
    const user = userEvent.setup()

    render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} onSelectBaby={mockOnSelectBaby} />)

    const babyCard = screen.getByText('Sofia')
    await user.click(babyCard)

    expect(mockOnSelectBaby).toHaveBeenCalledWith(mockBabies[0])
  })
})