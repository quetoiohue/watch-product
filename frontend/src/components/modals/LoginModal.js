import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

import ButtonSubmit from '../core/ButtonSubmit'

const LoginModal = () => {
  return (
    <LoginContainer>
      <Typography variant="body2" className="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <ButtonSubmit className="login-btn" color="primary">
        Sign in with facebook
      </ButtonSubmit>
    </LoginContainer>
  )
}

export default LoginModal

const LoginContainer = styled.div`
  text-align: center;

  .login-btn {
    margin-top: 24px;
  }
`
