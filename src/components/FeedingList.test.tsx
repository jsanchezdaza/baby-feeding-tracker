import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeedingList from './FeedingList'
import type { FeedingRecord } from '../types/feeding'

describe('FeedingList', () => {
  const mockFeedingRecords: FeedingRecord[] = [
    {
      id: '1',
      babyId: 'baby1',
      amount: 120,
      timestamp: new Date('2024-01-15T09:30:00')
    },
    {
      id: '2',
      babyId: 'baby1',
      amount: 150,
      timestamp: new Date('2024-01-15T13:15:00')
    },
    {
      id: '3',
      babyId: 'baby1',
      amount: 100,
      timestamp: new Date('2024-01-14T18:45:00')
    }
  ]

  it('should display feeding records with date, time and amount', () => {
    render(<FeedingList feedingRecords={mockFeedingRecords} />)

    // Check if amounts are displayed
    expect(screen.getByText('120 ml')).toBeInTheDocument()
    expect(screen.getByText('150 ml')).toBeInTheDocument()
    expect(screen.getByText('100 ml')).toBeInTheDocument()

    // Check if dates are displayed (format: dd/mm/yyyy) - using getAllByText for duplicates
    expect(screen.getAllByText('15/01/2024')).toHaveLength(2)
    expect(screen.getByText('14/01/2024')).toBeInTheDocument()

    // Check if times are displayed (format: HH:MM)
    expect(screen.getByText('09:30')).toBeInTheDocument()
    expect(screen.getByText('13:15')).toBeInTheDocument()
    expect(screen.getByText('18:45')).toBeInTheDocument()
  })

  it('should display empty state when no feeding records exist', () => {
    render(<FeedingList feedingRecords={[]} />)

    expect(screen.getByText('No hay tomas registradas aún')).toBeInTheDocument()
  })

  it('should display records in chronological order (most recent first)', () => {
    render(<FeedingList feedingRecords={mockFeedingRecords} />)

    const records = screen.getAllByTestId('feeding-record')

    // Most recent should be first (15/01/2024 13:15)
    expect(records[0]).toHaveTextContent('150 ml')
    expect(records[0]).toHaveTextContent('13:15')

    // Then 15/01/2024 09:30
    expect(records[1]).toHaveTextContent('120 ml')
    expect(records[1]).toHaveTextContent('09:30')

    // Oldest should be last (14/01/2024 18:45)
    expect(records[2]).toHaveTextContent('100 ml')
    expect(records[2]).toHaveTextContent('18:45')
  })
})