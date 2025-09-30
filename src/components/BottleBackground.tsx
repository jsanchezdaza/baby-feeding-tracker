import { useMemo } from 'react'
import BottleIcon from './BottleIcon'

const GRID_COLS = 6
const GRID_ROWS = 5
const BOTTLE_COUNT = 30
const GRID_MARGIN = 5
const GRID_WIDTH = 90
const JITTER_RANGE = 15
const SIZE_MIN = 25
const SIZE_MAX = 45
const OPACITY_MIN = 0.15
const OPACITY_MAX = 0.4
const ANIMATION_DELAY_MAX = 4
const ANIMATION_DURATION_MIN = 4
const ANIMATION_DURATION_MAX = 6

interface Bottle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  color: string
  animationDelay: number
  animationDuration: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

const generateBottlePosition = (index: number): Bottle => {
  const col = index % GRID_COLS
  const row = Math.floor(index / GRID_COLS)

  const baseX = (col / (GRID_COLS - 1)) * GRID_WIDTH + GRID_MARGIN
  const baseY = (row / (GRID_ROWS - 1)) * GRID_WIDTH + GRID_MARGIN

  const jitterX = (Math.random() - 0.5) * JITTER_RANGE
  const jitterY = (Math.random() - 0.5) * JITTER_RANGE

  return {
    id: index,
    x: clamp(baseX + jitterX, 0, 95),
    y: clamp(baseY + jitterY, 0, 95),
    size: Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN,
    rotation: Math.random() * 360,
    opacity: Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN,
    color: Math.random() > 0.5 ? 'text-pink-400' : 'text-purple-400',
    animationDelay: Math.random() * ANIMATION_DELAY_MAX,
    animationDuration: ANIMATION_DURATION_MIN + Math.random() * (ANIMATION_DURATION_MAX - ANIMATION_DURATION_MIN)
  }
}

const BottleBackground = () => {
  const bottles = useMemo(
    () => Array.from({ length: BOTTLE_COUNT }, (_, i) => generateBottlePosition(i)),
    []
  )

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
            animationDelay: `${bottle.animationDelay}s`,
            animationDuration: `${bottle.animationDuration}s`
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