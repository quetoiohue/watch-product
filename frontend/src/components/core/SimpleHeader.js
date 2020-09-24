import React from 'react'
import { Button, Container } from '@material-ui/core'
import Logo from './Logo'

const SimpleHeader = () => {
  return (
    <div className="flex-none">
      <Container className="py-2">
        <div className="flex justify-between items-center">
          <div className="nav-logo flex-none">
            <Logo />
          </div>
          <div className="nav-spacing flex-1" />
          <div className="nav-btn flex-none">
            <Button>Login</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SimpleHeader
