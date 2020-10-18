import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from '../core/ButtonSubmit'

const ConfirmModal = ({ text, cancelText = 'Cancel', confirmText = 'OK' }) => {
  const handleConfirm = () => {
    console.log('OK')
    window.modalDeferred.resolve()
  }
  const handleCancel = () => {
    console.log('Cancel')
    window.modalDeferred.resolve(null)
  }
  return (
    <ConfirmModalContainer className="error__modal">
      <div className="error__modal--title">{text}</div>
      <div className="error__modal--body">
        <ButtonSubmit
          color="default"
          variant="contained"
          onClick={handleCancel}
          className="mr-4 button"
        >
          {cancelText}
        </ButtonSubmit>
        <ButtonSubmit
          color="secondary"
          variant="contained"
          onClick={handleConfirm}
          className="button"
        >
          {confirmText}
        </ButtonSubmit>
      </div>
    </ConfirmModalContainer>
  )
}

export default ConfirmModal

const ConfirmModalContainer = styled.div`
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
    padding: 12px 0px;

    .button {
      width: 100px;
      &.mr-4 {
        margin-right: 16px;
      }
    }
  }
`
