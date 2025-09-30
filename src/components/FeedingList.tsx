import type { FeedingRecord } from '../types/feeding'

interface FeedingListProps {
  feedingRecords: FeedingRecord[]
}

const FeedingRecordRow = ({ record }: { record: FeedingRecord }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div
      data-testid="feeding-record"
      className="bg-white rounded-lg shadow-sm p-4 sm:p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="text-gray-600 text-sm sm:text-base">
            {formatDate(record.timestamp)}
          </div>
          <div className="text-gray-800 font-medium text-sm sm:text-base">
            {formatTime(record.timestamp)}
          </div>
        </div>
        <div className="text-purple-600 font-semibold text-lg sm:text-xl">
          {record.amount} ml
        </div>
      </div>
    </div>
  )
}

const EmptyFeedingState = () => (
  <div className="text-center py-8 sm:py-12">
    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
      <p className="text-gray-500 text-base sm:text-lg">
        No hay tomas registradas aún
      </p>
      <p className="text-gray-400 text-sm sm:text-base mt-2">
        Las tomas aparecerán aquí cuando las agregues
      </p>
    </div>
  </div>
)

const FeedingList: React.FC<FeedingListProps> = ({ feedingRecords }) => {
  if (feedingRecords.length === 0) {
    return <EmptyFeedingState />
  }

  const sortedRecords = [...feedingRecords].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  )

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
        Historial de tomas
      </h3>
      {sortedRecords.map((record) => (
        <FeedingRecordRow key={record.id} record={record} />
      ))}
    </div>
  )
}

export default FeedingList