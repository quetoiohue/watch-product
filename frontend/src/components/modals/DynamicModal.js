import { Fade, IconButton, Modal } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import styled from 'styled-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../reducers/actions/modal'
import ErrorModal from './ErrorModal'
import SuccessModal from './SuccessModal'
import ConfirmModal from './ConfirmModal'
import SpinnerLoading from './SpinnerLoading'

const DynamicModal = () => {
  const dispatch = useDispatch()
  const { modal, props } = useSelector((state) => state.modal)

  const ModalType = () => {
    switch (modal) {
      case 'success-modal':
        return <SuccessModal text={props.text} />
      case 'error-modal':
        return <ErrorModal text={props.text} />
      case 'confirm-modal':
        return <ConfirmModal {...props} />
      case 'spinner-loading':
        return <SpinnerLoading />
      default:
        return null
    }
  }

  const handleConfirm = () => {
    console.log('close')
    window.modalDeferred.resolve()
  }

  return (
    <ModalContainer
      open={!!modal}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!modal}>
        <div
          className={`modal__container ${
            modal === 'spinner-loading' && 'is__spinner-loading'
          }`}
        >
          <header className="modal__header">
            <IconButton onClick={handleConfirm} className="modal__header--btn">
              <Close />
            </IconButton>
          </header>
          <main className="modal__inner">
            <ModalType />
          </main>
        </div>
      </Fade>
    </ModalContainer>
  )
}

export default DynamicModal

const ModalContainer = styled(Modal)`
  .modal__container {
    width: 400px;
    margin: 200px auto auto;
    background: #fff;

    outline: none;

    &.is__spinner-loading {
      .modal__header--btn {
        visibility: hidden;
      }
    }
  }

  .modal__header {
    text-align: right;
    padding: 12px;

    .modal__header--btn {
      padding: 4px;
    }
  }

  .modal__inner {
    padding: 0px 55px 55px;
  }

  ${({ theme }) => theme.mobile`
  .modal__container {
    width: calc(100% - 10px);
  }
  .modal__inner {
    padding: 0px 20px 55px 30px;
  }
      
    `}
`
