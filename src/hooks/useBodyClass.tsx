import React from 'react'

export const useBodyClass = (className: string) => {
  React.useEffect(() => {
    document.body.classList.add(className)
  }, [className])
}
