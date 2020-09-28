import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import ButtonSubmit from '../core/ButtonSubmit'
import { httpPost } from '../../helpers/http'
import { Facebook } from '@material-ui/icons'

const LoginModal = () => {
  const history = useHistory()

  const responseFacebook = async (response) => {
    try {
      console.log(response)

      const userInfo = await httpPost(
        '/auth/login/facebook',
        {
          social_token: response.accessToken,
        },
        {}
      )

      await localStorage.setItem('authToken', userInfo.access_token)
      await history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContainer>
      <Typography variant="body2" className="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <FacebookLogin
        appId="223847348301833"
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps) => (
          <ButtonSubmit
            onClick={renderProps.onClick}
            isWorking={renderProps.isProcessing}
            className="login__btn"
            color="primary"
            variant="contained"
          >
            <span className="login__btn--inner">
              <Facebook className="login__btn--icon" />
              <span className="login__btn--text">Sign in with facebook</span>
            </span>
          </ButtonSubmit>
        )}
      />
    </LoginContainer>
  )
}

export default LoginModal

const LoginContainer = styled.div`
  text-align: center;

  .login__btn {
    margin-top: 24px;
    padding: 0px 24px;
    height: 36px;

    .login__btn--inner {
      display: flex;
      align-items: center;

      .login__btn--icon {
        margin-right: 5px;
      }
    }
  }
`
