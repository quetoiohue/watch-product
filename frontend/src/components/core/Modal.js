import { Fade, IconButton, Modal } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const BasicModal = ({ isOpen, close, title, children }) => {
  return (
    <ModalContainer
      open={isOpen}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className="modal__container">
          <header className="modal__header">
            <div
              className={
                title
                  ? 'modal__header--title'
                  : 'modal__header--title invisibility'
              }
            >
              {title}
            </div>
            <IconButton
              onClick={close}
              aria-label="delete"
              className="modal__header--btn"
            >
              <Close />
            </IconButton>
          </header>
          <main className="modal__inner">{children}</main>
        </div>
      </Fade>
    </ModalContainer>
  )
}

export default BasicModal

const ModalContainer = styled(Modal)`
  .modal__container {
    width: 600px;
    margin: 200px auto auto;
    background: #fff;

    outline: none;
  }

  .modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    .modal__header--title {
      margin-left: 16px;
      font-size: 18px;
      font-weight: 500;
    }
    .modal__header--btn {
      padding: 4px;
    }
  }

  .modal__inner {
    padding: 0px 55px 55px;
  }
`
