import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import ProductTable from './Home/ProductTable'

const HomePage = () => {
  return (
    <HomePageContainer>
      <Typography className="title" variant="h5">
        All Products
      </Typography>
      <section className="table-container">
        <ProductTable />
      </section>
    </HomePageContainer>
  )
}

export default HomePage

const HomePageContainer = styled.div`
  .title {
    margin-bottom: 16px;
  }
`
