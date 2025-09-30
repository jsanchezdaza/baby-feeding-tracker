import { useState } from 'react'

interface AddBabyFormData {
  name: string
  birthDate: Date
}

interface AddBabyFormProps {
  onAddBaby: (babyData: AddBabyFormData) => void
  onCancel: () => void
}

const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  autoCapitalize,
  max
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
  autoCapitalize?: string
  max?: string
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm sm:text-base font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      max={max}
      className="w-full px-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors touch-manipulation"
      required
    />
  </div>
)

const ActionButtons = ({ onCancel }: { onCancel: () => void }) => (
  <div className="flex flex-col sm:flex-row gap-3 pt-4">
    <button
      type="submit"
      className="w-full sm:flex-1 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-4 sm:py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
    >
      Guardar
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 sm:py-3 px-6 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation"
    >
      Cancelar
    </button>
  </div>
)

const AddBabyForm: React.FC<AddBabyFormProps> = ({ onAddBaby, onCancel }) => {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onAddBaby({
      name: name.trim(),
      birthDate: new Date(birthDate)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:p-6 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <header className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 text-center leading-tight tracking-wide drop-shadow-sm">
            Agregar nuevo bebé
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="name"
            label="Nombre del bebé"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre"
            autoComplete="given-name"
            autoCapitalize="words"
          />

          <FormInput
            id="birthDate"
            label="Fecha de nacimiento"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />

          <ActionButtons onCancel={onCancel} />
        </form>

        <div className="mt-4 sm:hidden">
          <p className="text-xs text-gray-500 text-center">
            Toca fuera del teclado para cerrar
          </p>
        </div>
      </div>
    </div>
  )
}

export default AddBabyForm