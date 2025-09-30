import { useState } from 'react'
import BabyList from './components/BabyList'
import AddBabyForm from './components/AddBabyForm'
import BabyDetail from './components/BabyDetail'
import BottleBackground from './components/BottleBackground'
import type { Baby } from './types/baby'
import type { FeedingRecord } from './types/feeding'

function App() {
  const [babies, setBabies] = useState<Baby[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null)
  const [feedingRecords, setFeedingRecords] = useState<FeedingRecord[]>([
    {
      id: '1',
      babyId: 'mock',
      amount: 120,
      timestamp: new Date('2024-01-15T09:30:00')
    },
    {
      id: '2',
      babyId: 'mock',
      amount: 150,
      timestamp: new Date('2024-01-15T13:15:00')
    },
    {
      id: '3',
      babyId: 'mock',
      amount: 100,
      timestamp: new Date('2024-01-14T18:45:00')
    },
    {
      id: '4',
      babyId: 'mock',
      amount: 180,
      timestamp: new Date('2024-01-14T10:20:00')
    }
  ])

  const handleAddBaby = (babyData: { name: string; birthDate: Date }) => {
    const newBaby: Baby = {
      id: crypto.randomUUID(),
      name: babyData.name,
      birthDate: babyData.birthDate
    }
    setBabies((prev) => [...prev, newBaby])
    setShowAddForm(false)
  }

  const handleCancel = () => {
    setShowAddForm(false)
  }

  const handleOpenAddForm = () => {
    setShowAddForm(true)
  }

  const handleSelectBaby = (baby: Baby) => {
    setSelectedBaby(baby)
  }

  const handleBackFromDetail = () => {
    setSelectedBaby(null)
  }

  const handleAddFeeding = (amount: number) => {
    if (!selectedBaby) return

    const newFeeding: FeedingRecord = {
      id: crypto.randomUUID(),
      babyId: selectedBaby.id,
      amount,
      timestamp: new Date()
    }

    setFeedingRecords(prev => [...prev, newFeeding])
  }

  return (
    <>
      <BottleBackground />
      {showAddForm && <AddBabyForm onAddBaby={handleAddBaby} onCancel={handleCancel} />}
      {selectedBaby && (
        <BabyDetail
          baby={selectedBaby}
          feedingRecords={feedingRecords.filter(record => record.babyId === selectedBaby.id)}
          onBack={handleBackFromDetail}
          onAddFeeding={handleAddFeeding}
        />
      )}
      {!showAddForm && !selectedBaby && (
        <BabyList babies={babies} onAddBaby={handleOpenAddForm} onSelectBaby={handleSelectBaby} />
      )}
    </>
  )
}

export default App
