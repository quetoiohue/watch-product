import React from 'react'
import { Container } from '@material-ui/core'

const public = () => {
  return (
    <div className="public-layout flex">
      <SimpleHeader className="flex-none flex" />
      <main className="main-layout"></main>
    </div>
  )
}

export default public
