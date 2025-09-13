import { useState } from 'react'
import BabyList from './components/BabyList'
import AddBabyForm from './components/AddBabyForm'
import type { Baby } from './types/baby'

function App() {
  const [babies, setBabies] = useState<Baby[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

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

  if (showAddForm) {
    return <AddBabyForm onAddBaby={handleAddBaby} onCancel={handleCancel} />
  }

  return <BabyList babies={babies} onAddBaby={handleOpenAddForm} />
}

export default App
