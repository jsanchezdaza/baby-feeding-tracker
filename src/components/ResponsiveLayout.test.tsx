import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import BabyList from './BabyList'
import AddBabyForm from './AddBabyForm'
import type { Baby } from '../types/baby'

// Mock viewport sizes
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('Responsive Layout Tests', () => {
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
  const mockOnCancel = vi.fn()

  let originalInnerWidth: number
  let originalInnerHeight: number

  beforeAll(() => {
    // Store original dimensions
    originalInnerWidth = window.innerWidth
    originalInnerHeight = window.innerHeight
  })

  afterAll(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    })
  })

  describe('Mobile viewport (320px)', () => {
    beforeAll(() => {
      mockViewport(320, 568)
    })

    it('should render BabyList with mobile-optimized spacing', () => {
      render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} />)

      const title = screen.getByText('Registro de tomas de Sofia')
      expect(title).toBeInTheDocument()

      // Verify babies are displayed (should be single column on mobile)
      expect(screen.getByText('Sofia')).toBeInTheDocument()
      expect(screen.getByText('Diego')).toBeInTheDocument()
    })

    it('should render AddBabyForm with mobile-optimized layout', () => {
      render(<AddBabyForm onAddBaby={mockOnAddBaby} onCancel={mockOnCancel} />)

      expect(screen.getByText('Agregar nuevo bebé')).toBeInTheDocument()
      expect(screen.getByLabelText(/nombre del bebé/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument()

      // Buttons should be stacked vertically on mobile
      const saveButton = screen.getByText('Guardar')
      const cancelButton = screen.getByText('Cancelar')
      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })
  })

  describe('Tablet viewport (768px)', () => {
    beforeAll(() => {
      mockViewport(768, 1024)
    })

    it('should render BabyList with tablet layout', () => {
      render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} />)

      expect(screen.getByText('Registro de tomas de Sofia')).toBeInTheDocument()
      expect(screen.getByText('Sofia')).toBeInTheDocument()
      expect(screen.getByText('Diego')).toBeInTheDocument()
    })
  })

  describe('Desktop viewport (1024px+)', () => {
    beforeAll(() => {
      mockViewport(1024, 768)
    })

    it('should render BabyList with desktop layout', () => {
      render(<BabyList babies={mockBabies} onAddBaby={mockOnAddBaby} />)

      expect(screen.getByText('Registro de tomas de Sofia')).toBeInTheDocument()
      expect(screen.getByText('Sofia')).toBeInTheDocument()
      expect(screen.getByText('Diego')).toBeInTheDocument()
    })
  })
})