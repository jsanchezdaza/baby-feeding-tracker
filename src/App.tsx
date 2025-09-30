import { useState, useEffect } from 'react'
import BabyList from './components/BabyList'
import AddBabyForm from './components/AddBabyForm'
import BabyDetail from './components/BabyDetail'
import BottleBackground from './components/BottleBackground'
import type { Baby } from './types/baby'
import type { FeedingRecord } from './types/feeding'
import { createBaby, getBabies } from './services/babyService'
import { createFeeding, getFeedingsByBaby } from './services/feedingService'

function App() {
  const [babies, setBabies] = useState<Baby[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null)
  const [feedingRecords, setFeedingRecords] = useState<FeedingRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBabies()
  }, [])

  useEffect(() => {
    if (selectedBaby) {
      loadFeedingRecords(selectedBaby.id)
    }
  }, [selectedBaby])

  const loadBabies = async () => {
    try {
      const data = await getBabies()
      setBabies(data)
    } catch (error) {
      console.error('Error loading babies:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadFeedingRecords = async (babyId: string) => {
    try {
      const data = await getFeedingsByBaby(babyId)
      setFeedingRecords(data)
    } catch (error) {
      console.error('Error loading feeding records:', error)
    }
  }

  const handleAddBaby = async (babyData: { name: string; birthDate: Date }) => {
    try {
      const newBaby = await createBaby(babyData)
      setBabies((prev) => [newBaby, ...prev])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error creating baby:', error)
    }
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

  const handleAddFeeding = async (amount: number) => {
    if (!selectedBaby) return

    try {
      const newFeeding = await createFeeding({
        babyId: selectedBaby.id,
        amount
      })
      setFeedingRecords(prev => [newFeeding, ...prev])
    } catch (error) {
      console.error('Error creating feeding:', error)
    }
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
