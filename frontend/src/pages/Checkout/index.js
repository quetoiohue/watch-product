import { Paper } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { httpGet } from '../../helpers/http'
import PackageCard from './components/PackageCard'

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
  return (
    <CheckoutContainer>
      <div className="header__bar flex justify-between items-center">
        <span className="title">Price</span>
        <div />
      </div>
      <div className="content__container flex items-start justify-between">
        {packageTypes.map((_package) => (
          <PackageCard key={_package.id} packageType={_package} />
        ))}
      </div>
    </CheckoutContainer>
  )
}

export default Checkout

const CheckoutContainer = styled(Paper)`
  .header__bar {
    padding: 20px;
    border-bottom: 1px solid var(--gray-2);

    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .content__container {
    padding: 40px 20px;

    .card__container:last-child {
      border: none;
    }
  }
`
