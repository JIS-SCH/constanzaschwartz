import Image from 'next/image'
import { R2 } from '@/src/utils/r2'

interface ImageR2Props {
  path: string // ej: "PROJECTS/ECO AL INFINITO/IMGS/WEBp/image.webp"
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ImageR2({ 
  path, 
  alt, 
  width, 
  height, 
  fill = false,
  priority = false,
  className,
  style 
}: ImageR2Props) {
  const src = R2.url(path)
  
  // Si no hay width/height y no es fill, usar dimensions del archivo sería ideal
  // Por ahora required pasar width/height o usar fill
  
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        style={style}
      />
    )
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
    />
  )
}

// Export URL helper for manual usage
export { R2 }