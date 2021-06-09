import React from 'react'

export const useTabs = () => {
  const [index, setIndex] = React.useState(0)

  const Tab: React.FC<{ index: number }> = (props) => {
    if (props.index !== index) return null
    return React.createElement(React.Fragment, {}, props.children)
  }

  return {
    index,
    setIndex,
    isActive(_index: number) {
      return _index === index
    },
    Tab,
  }
}
