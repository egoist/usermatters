import React from 'react'

export const useClickOutside = <ElementType extends Element = any>(
  handleClick: () => void,
) => {
  const ref = React.useRef<ElementType | null>(null)

  React.useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) {
        handleClick()
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return ref
}
