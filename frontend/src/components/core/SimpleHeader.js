import { Container } from '@material-ui/core'
import React from 'react'
import ButtonSubmit from './ButtonSubmit'
import Logo from './Logo'

const SimpleHeader = (props) => {
  return (
    <div className="flex-none">
      <Container className="py-2">
        <div className="flex justify-between items-center">
          <div className="nav-logo flex-none">
            <Logo />
          </div>
          <div className="nav-spacing flex-1" />
          <div className="nav-btn flex-none">
            <ButtonSubmit onClick={props.openLoginModal}>Login</ButtonSubmit>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SimpleHeader
