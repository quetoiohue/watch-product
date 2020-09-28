import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const ButtonLink = ({ to, children, ...props }) => {
  const history = useHistory()

  const onClick = () => {
    if (!to) return

    history.push(to)
  }

  return (
    <ButtonLinkInner
      {...props}
      className={!props.color && 'non-bg'}
      onClick={onClick}
    >
      {children}
    </ButtonLinkInner>
  )
}

export default ButtonLink

const ButtonLinkInner = styled(Button)`
  &.non-bg {
    background: none;
    padding-left: 0px;
    padding-right: 0px;
  }
`
