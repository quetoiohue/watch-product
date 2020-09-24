import React from 'react'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

import SimpleHeader from '../components/core/SimpleHeader'

const MainContent = styled.main`
  padding: 80px;
  /* background-image: url('');
  background-repeat: no-repeat;
    background-position: center;
    background-size: cover; */
`

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout flex-col mh-100v">
      <SimpleHeader className="flex-none flex" />
      <MainContent className="main-layout flex-1">
        <Container>{children}</Container>
      </MainContent>
    </div>
  )
}

export default PublicLayout
