import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement>

/** Ancho máximo y padding lateral consistentes en todas las secciones. */
export function Container({ children, className = '', ...rest }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...rest}>
      {children}
    </div>
  )
}
