import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ButtonLink from './ButtonLink'

const LogoIcon = styled.p`
  font-size: 24px;
  font-weight: 600;
  word-spacing: -8px;

  &.logo {
    color: #fff;
    span {
      color: var(--gray-1);
    }
  }
`
const LightLogo = () => {
  return (
    <ButtonLink className="px-0" to="/">
      <LogoIcon className="logo">
        Deal <span>Hunter</span>
      </LogoIcon>
    </ButtonLink>
  )
}

export default LightLogo
