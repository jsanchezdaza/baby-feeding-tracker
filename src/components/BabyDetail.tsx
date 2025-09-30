import { useState } from 'react'
import type { Baby } from '../types/baby'
import type { FeedingRecord } from '../types/feeding'
import FeedingList from './FeedingList'

interface BabyDetailProps {
  baby: Baby
  feedingRecords: FeedingRecord[]
  onBack: () => void
  onAddFeeding: (amount: number) => void
}

const BabyDetail: React.FC<BabyDetailProps> = ({ baby, feedingRecords, onBack, onAddFeeding }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [amount, setAmount] = useState('')

  const getTimeSinceLastFeeding = () => {
    if (feedingRecords.length === 0) {
      return 'Sin tomas registradas'
    }

    const sortedRecords = [...feedingRecords].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )
    const lastFeeding = sortedRecords[0]
    const now = Date.now()
    const timeDiff = now - lastFeeding.timestamp.getTime()

    const minutes = Math.floor(timeDiff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours === 0) {
      return `${minutes} minutos`
    } else {
      return `${hours}h ${remainingMinutes}m`
    }
  }

  const handleAddFeeding = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseInt(amount)
    if (numAmount > 0) {
      onAddFeeding(numAmount)
      setAmount('')
      setShowAddForm(false)
    }
  }

  const handleCancel = () => {
    setAmount('')
    setShowAddForm(false)
  }

  if (showAddForm) {
    return (
      <div className="min-h-screen px-4 py-6 sm:p-6 relative z-10">
        <div className="max-w-md mx-auto">
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-400 leading-tight px-2 tracking-wide drop-shadow-sm">
              Añadir toma para {baby.name}
            </h1>
          </header>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleAddFeeding} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad (ml)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Ej: 150"
                  min="1"
                  max="500"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
                >
                  Guardar toma
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:p-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-400 leading-tight px-2 tracking-wide drop-shadow-sm">
              Registro de tomas de {baby.name}
            </h1>
          </header>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Tiempo desde la última toma
            </h2>
            <p className="text-purple-600 text-2xl sm:text-3xl font-bold">
              {getTimeSinceLastFeeding()}
            </p>
          </div>

          <div className="mb-6">
            <FeedingList feedingRecords={feedingRecords} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
            >
              Añadir nueva toma
            </button>
            <button
              onClick={onBack}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
  )
}

export default BabyDetail