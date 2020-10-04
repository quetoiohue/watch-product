import { Paper } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const BasicPaper = ({ headerBar, mainContent }) => {
  return (
    <BasicPaperContainer>
      <header className="header__bar flex justify-between items-center">
        {headerBar}
      </header>
      <main className="content__container">{mainContent}</main>
    </BasicPaperContainer>
  )
}

export default BasicPaper

const BasicPaperContainer = styled(Paper)`
  .header__bar {
    padding: 20px;
    border-bottom: 1px solid var(--gray-2);

    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
`
