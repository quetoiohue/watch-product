import React from 'react'
import styled from 'styled-components'
import LoadingImage from '../../assets/images/loading.gif'

const SpinnerLoading = () => {
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
    background-image: url(${LoadingImage});
    background-repeat: no-repeat;
    padding: 0;
    background-size: cover;
    height: 110px;
    background-position: center;
  }
`
