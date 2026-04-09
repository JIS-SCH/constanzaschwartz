export function WaveformIcon({ width = 20, color = 'currentColor' }: { width?: number; color?: string }) {
  const height = width * 0.5
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 10 Q3 10 5 10 Q7 2 9 2 Q11 2 13 18 Q15 18 17 2 Q19 2 21 18 Q23 18 25 2 Q27 2 29 18 Q31 18 33 10 Q35 10 40 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
