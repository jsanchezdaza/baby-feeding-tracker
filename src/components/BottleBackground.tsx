import BottleIcon from './BottleIcon'

const BottleBackground = () => {
  const bottles = Array.from({ length: 30 }, (_, i) => {
    const gridCols = 6
    const gridRows = 5
    const col = i % gridCols
    const row = Math.floor(i / gridCols)

    const baseX = (col / (gridCols - 1)) * 90 + 5
    const baseY = (row / (gridRows - 1)) * 90 + 5

    const jitterX = (Math.random() - 0.5) * 15
    const jitterY = (Math.random() - 0.5) * 15

    return {
      id: i,
      x: Math.max(0, Math.min(95, baseX + jitterX)),
      y: Math.max(0, Math.min(95, baseY + jitterY)),
      size: Math.random() * 20 + 25,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.25 + 0.15,
      color: Math.random() > 0.5 ? 'text-pink-400' : 'text-purple-400'
    }
  })

  return (
    <div
      data-testid="bottle-background"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-blue-50" />
      {bottles.map((bottle) => (
        <div
          key={bottle.id}
          className="absolute animate-pulse"
          style={{
            left: `${bottle.x}%`,
            top: `${bottle.y}%`,
            transform: `rotate(${bottle.rotation}deg)`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          <BottleIcon
            size={bottle.size}
            opacity={bottle.opacity}
            className={bottle.color}
          />
        </div>
      ))}

      {/* Subtle overlay to ensure readability */}
      <div className="absolute inset-0 bg-white bg-opacity-10" />
    </div>
  )
}

export default BottleBackground