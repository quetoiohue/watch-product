import React from 'react'
import styled from 'styled-components'

const SpinnerLoading = () => {
  const loadingTimeout = React.useRef(null)

  React.useEffect(() => {
    loadingTimeout.current = setTimeout(() => {
      window.modalDeferred.resolve()
    }, 1000)

    return () => clearTimeout(loadingTimeout)
  }, [])

  return (
    <SuccessModalContainer className="error__modal">
      <div className="error__modal--body" />
    </SuccessModalContainer>
  )
}

export default SpinnerLoading

const SuccessModalContainer = styled.div`
  text-align: center;
  width: 300px;

  .error__modal--body {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/static/media/loading.408292d8.gif');
    background-repeat: no-repeat;
    padding: 0;
    background-size: cover;
    height: 110px;
    background-position: center;
  }
`
