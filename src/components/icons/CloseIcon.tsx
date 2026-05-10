export function CloseIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="15" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <line x1="15" y1="1" x2="1" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
