import React from 'react'

const useInputChange = (defaultValue = null) => {
  const [state, setState] = React.useState(defaultValue)

  return [
    state,
    (event) => {
      const { value, name } = event.target

      setState({
        ...state,
        [name]: value,
      })
    },
    setState,
  ]
}

export default useInputChange
