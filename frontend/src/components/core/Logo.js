import React from 'react'
import styled from 'styled-components'
import ButtonLink from './ButtonLink'

const LogoIcon = styled.p`
  font-size: 24px;
  font-weight: 600;
  word-spacing: -8px;
  span {
    color: var(--gray-1);
  }
`

const Logo = () => {
  return (
    <React.Fragment>
      <ButtonLink to="/">
        <LogoIcon>
          Deal <span>Hunter</span>
        </LogoIcon>
      </ButtonLink>
    </React.Fragment>
  )
}

export default Logo
