import { ErrorOutline } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const ErrorModal = ({ text }) => {
  React.useEffect(() => {
    setTimeout(() => {
      window.modalDeferred.resolve(null)
    }, 2000)
  }, [])

  return (
    <ErrorModalContainer className="error__modal">
      <div className="error__modal--title">Oh! Snap</div>
      <div className="error__modal--body">
        <ErrorOutline className="error__modal--icon" />
        <p className="leading-4">{text}</p>
      </div>
    </ErrorModalContainer>
  )
}

export default ErrorModal

const ErrorModalContainer = styled.div`
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
    color: rgb(97, 26, 21);
    background-color: rgb(253, 236, 234);

    .error__modal--icon {
      margin-right: 12px;
      margin-left: -20px;
    }
  }
`
