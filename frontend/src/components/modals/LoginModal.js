import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'

import ButtonSubmit from '../core/ButtonSubmit'
import { httpPost } from '../../helpers/http'
import { Facebook } from '@material-ui/icons'
import { displayModal } from '../../reducers/actions/modal'
import GoogleIcon from '../../assets/images/ic-google.svg'

const LoginModal = () => {
  const history = useHistory()

  const responseFacebook = async (response) => {
    try {
      console.log(response)

      displayModal('spinner-loading')

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
    } finally {
      displayModal(null)
    }
  }

  const responseGoogle = async (response) => {
    try {
      console.log(response)

      displayModal('spinner-loading')

      const userInfo = await httpPost(
        '/auth/login/google',
        {
          social_token: response.tokenId,
        },
        {}
      )

      await localStorage.setItem('authToken', userInfo.access_token)
      await history.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      displayModal(null)
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
      <div className="btn__wrapper">
        <FacebookLogin
          appId={`1018593771993374`}
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
        <GoogleLogin
          clientId={`227371493769-dl0dk46balnt0pcgspoejhm4b8e6706q.apps.googleusercontent.com`}
          render={(renderProps) => (
            <ButtonSubmit
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="login__btn gg__btn"
              color="default"
              variant="contained"
            >
              <span className="login__btn--inner">
                <img
                  src={GoogleIcon}
                  alt="google"
                  className="login__btn--icon"
                />
                <span className="login__btn--text">Sign in with google</span>
              </span>
            </ButtonSubmit>
          )}
          buttonText="Login"
          autoLoad={false}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </LoginContainer>
  )
}

export default LoginModal

const LoginContainer = styled.div`
  text-align: center;

  .btn__wrapper {
    display: inline-block;

    .login__btn {
      margin-top: 24px;
      padding: 0px 24px;
      height: 36px;

      .login__btn--inner {
        display: flex;
        align-items: center;

        .login__btn--icon {
          margin-right: 8px;
          width: 24px;
          height: 24px;
        }
      }
    }

    .gg__btn {
      display: block;
      width: 100%;
    }
  }
`
