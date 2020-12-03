import React from 'react'
import styled from 'styled-components'
import HeaderButtons from './Home/HeaderButtons'
import ProductTable from './Home/ProductTable'

const HomePage = () => {
  return (
    <HomePageContainer>
      <HeaderButtons />
      <section className="table-container">
        <ProductTable />
      </section>
    </HomePageContainer>
  )
}

export default HomePage

const HomePageContainer = styled.div``
