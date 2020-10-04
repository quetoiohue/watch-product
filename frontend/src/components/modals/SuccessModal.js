import { Check } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const SuccessModal = ({ text }) => {
  return (
    <SuccessModalContainer className="error__modal">
      <div className="error__modal--title">Confirmation</div>
      <div className="error__modal--body">
        <Check className="error__modal--icon" />
        <p className="leading-4">{text}</p>
      </div>
    </SuccessModalContainer>
  )
}

export default SuccessModal

const SuccessModalContainer = styled.div`
  text-align: center;
  width: 300px;

  .error__modal--title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 12px;
  }

  .error__modal--body {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 40px;
    color: rgb(30, 70, 32);
    background-color: rgb(237, 247, 237);

    .error__modal--icon {
      margin-right: 20px;
      margin-left: -20px;
    }
  }
`
