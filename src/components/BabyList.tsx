import type { Baby } from '../types/baby'
import BottleBackground from './BottleBackground'

interface BabyListProps {
  babies: Baby[]
  onAddBaby: () => void
}

const EmptyState = ({ onAddBaby }: { onAddBaby: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:p-6 relative">
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center w-full max-w-sm sm:max-w-md">
      <h1 className="text-2xl sm:text-3xl font-semibold text-purple-400 mb-4 sm:mb-6 tracking-wide drop-shadow-sm">
        Registro de tomas
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        No hay bebés registrados aún
      </p>
      <button
        onClick={onAddBaby}
        className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
      >
        Añadir bebé
      </button>
    </div>
  </div>
)

const BabyCard = ({ baby }: { baby: Baby }) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer touch-manipulation">
    <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 truncate">
      {baby.name}
    </h3>
    <p className="text-gray-600 text-sm sm:text-base">
      Nacido: {baby.birthDate.toLocaleDateString('es-ES')}
    </p>
    <p className="text-gray-500 text-xs mt-1">
      {Math.floor((Date.now() - baby.birthDate.getTime()) / (1000 * 60 * 60 * 24))} días
    </p>
  </div>
)

const FloatingAddButton = ({ onAddBaby }: { onAddBaby: () => void }) => (
  <div className="fixed bottom-6 right-6 sm:relative sm:bottom-auto sm:right-auto sm:mt-8 sm:text-center">
    <button
      onClick={onAddBaby}
      className="w-14 h-14 sm:w-auto sm:h-auto bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-full sm:rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation sm:py-3 sm:px-6"
      aria-label="Añadir bebé"
    >
      <span className="sm:hidden text-2xl">+</span>
      <span className="hidden sm:inline">Añadir otro bebé</span>
    </button>
  </div>
)

const BabyList: React.FC<BabyListProps> = ({ babies, onAddBaby }) => {
  if (babies.length === 0) {
    return (
      <>
        <BottleBackground />
        <EmptyState onAddBaby={onAddBaby} />
      </>
    )
  }

  return (
    <>
      <BottleBackground />
      <div className="min-h-screen px-4 py-6 sm:p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-400 leading-tight px-2 tracking-wide drop-shadow-sm">
              Seleccione un bebé
            </h1>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {babies.map((baby) => (
              <BabyCard key={baby.id} baby={baby} />
            ))}
          </div>

          <FloatingAddButton onAddBaby={onAddBaby} />
        </div>
      </div>
    </>
  )
}

export default BabyList