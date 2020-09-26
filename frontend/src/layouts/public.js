import React from 'react'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

import SimpleHeader from '../components/core/SimpleHeader'
import Modal from '../components/core/Modal'
import LoginModal from '../components/modals/LoginModal'

const MainContent = styled.main`
  padding: 80px 0px;
  /* background-image: url('');
  background-repeat: no-repeat;
    background-position: center;
    background-size: cover; */
`

const PublicLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="public-layout flex-col mh-100v">
      <SimpleHeader
        className="flex-none flex"
        openLoginModal={() => setIsOpen(true)}
      />
      <MainContent className="main-layout flex-1">
        <Container>{children}</Container>
      </MainContent>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)} title="Login">
        <LoginModal />
      </Modal>
    </div>
  )
}

export default PublicLayout
