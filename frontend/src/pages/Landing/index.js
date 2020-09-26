import React from 'react'
import styled from 'styled-components'
import { Button, Input, Typography } from '@material-ui/core'

import DemoTable from './DemoTable'
import FormAddTempProduct from './FormAddTempProduct'

const Landing = () => {
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    return () => {
      const links = products.map((_p) => _p.link)
      console.log('links', products, links)

      localStorage.setItem('links', JSON.stringify(links))
    }
  }, [products])

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct])
  }

  return (
    <LandingContainer>
      <section className="text-center">
        <Typography variant="h4" className="title">
          Monitor in <span> real time </span> prices of your products
        </Typography>
        <Typography variant="body2" className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <FormAddTempProduct products={products} addProduct={handleAddProduct} />
      </section>
      <section className="table-container">
        <DemoTable products={products} />
      </section>
    </LandingContainer>
  )
}

export default Landing

const LandingContainer = styled.div`
  .title {
    margin-bottom: 12px;
    font-weight: 600;
    span {
      color: var(--primary-color);
    }
  }

  .subtitle {
    margin-bottom: 24px;
  }

  .form-input {
    display: inline-block;
    .input {
      width: 400px;
      margin-right: 12px;
    }
  }

  .table-container {
    margin-top: 48px;
  }
`
