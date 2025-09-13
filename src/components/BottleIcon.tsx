interface BottleIconProps {
  size?: number
  opacity?: number
  className?: string
}

const BottleIcon: React.FC<BottleIconProps> = ({
  size = 24,
  opacity = 0.1,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ opacity }}
  >
    <ellipse cx="12" cy="3" rx="2" ry="1.5" fill="currentColor" opacity="0.9" />
    <rect x="10.5" y="4" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.9" />
    <path
      d="M8 6C8 5.5 8.5 5 9 5H15C15.5 5 16 5.5 16 6V7H17C17.5 7 18 7.5 18 8V9H16V10L16.5 10.5V19C16.5 20.1 15.6 21 14.5 21H9.5C8.4 21 7.5 20.1 7.5 19V10.5L8 10V9H6V8C6 7.5 6.5 7 7 7H8V6Z"
      fill="currentColor"
      opacity="0.8"
    />
    <rect x="7" y="7" width="10" height="1.5" rx="0.5" fill="currentColor" opacity="0.9" />
    <path
      d="M8.5 11H15.5V17C15.5 17.5 15 18 14.5 18H9.5C9 18 8.5 17.5 8.5 17V11Z"
      fill="currentColor"
      opacity="0.4"
    />
    <line x1="8" y1="13" x2="9" y2="13" stroke="currentColor" opacity="0.6" strokeWidth="0.5" />
    <line x1="8" y1="15" x2="9" y2="15" stroke="currentColor" opacity="0.6" strokeWidth="0.5" />
    <line x1="8" y1="17" x2="9" y2="17" stroke="currentColor" opacity="0.6" strokeWidth="0.5" />
    <ellipse cx="11" cy="14" rx="1" ry="3" fill="white" opacity="0.3" />
  </svg>
)

export default BottleIcon