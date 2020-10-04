import { Paper } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { httpGet } from '../../helpers/http'
import PackageCard from './components/PackageCard'
import BasicPaper from '../../components/core/BasicPaper'

const Checkout = () => {
  const [packageTypes, setPackageTypes] = React.useState([])

  React.useEffect(() => {
    async function fetchPackages() {
      const response = await httpGet('/package-types')

      const { result } = response
      setPackageTypes([...result])
    }

    fetchPackages()
  }, [])

  console.log(packageTypes)

  const headerBar = (
    <>
      <span className="title">Price</span>
      <div />
    </>
  )

  const mainContent = (
    <div className="flex items-center justify-center">
      {packageTypes.map((_package) => (
        <PackageCard key={_package.id} packageType={_package} />
      ))}
    </div>
  )

  return (
    <CheckoutContainer>
      <BasicPaper headerBar={headerBar} mainContent={mainContent} />
    </CheckoutContainer>
  )
}

export default Checkout

const CheckoutContainer = styled.div`
  .content__container {
    padding: 40px 20px;

    .card__container:last-child {
      border: none;
    }
  }
`
