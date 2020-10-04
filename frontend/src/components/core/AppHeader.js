import { Container, IconButton, Portal } from '@material-ui/core'
import {
  AddCircleOutline,
  NotificationsNone,
  AccountCircle,
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from './ButtonSubmit'
import LightLogo from './LightLogo'

const AppHeader = (props) => {
  const history = useHistory()
  const container = React.useRef(null)

  const onClickSetting = () => {
    history.push('/setting')
  }
  return (
    <AppHeaderContainer className="flex-none">
      <Container className="py-2">
        <div className="flex justify-between items-center">
          <div className="nav-logo flex-none" id="header__icon" ref={container}>
            <LightLogo />
          </div>
          <div className="nav-spacing flex-1" />
          <div className="nav-btn flex-none flex">
            <IconButton>
              <AddCircleOutline />
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
            <IconButton onClick={onClickSetting}>
              <AccountCircle />
            </IconButton>
          </div>
        </div>
      </Container>
    </AppHeaderContainer>
  )
}

export default AppHeader

const AppHeaderContainer = styled.div`
  background: var(--black);
  color: var(--gray-2);

  button {
    color: var(--gray-2);
  }
`
