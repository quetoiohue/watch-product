import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const ButtonSubmit = ({ isWorking, children, ...props }) => {
  return (
    <ButtonSubmitInner {...props} disabled={isWorking}>
      {isWorking && <CircularProgress size={20} className="isWorking" />}{' '}
      <span className={isWorking ? 'hidden' : ''}>{children}</span>
    </ButtonSubmitInner>
  )
}

export default ButtonSubmit

const ButtonSubmitInner = styled(Button)`
  height: 34px;
  border-radius: 17px;

  .isWorking {
    position: absolute;
    color: var(--gray-2);
  }

  .hidden {
    visibility: hidden;
  }
`
