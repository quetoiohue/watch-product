import { Paper } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { EMAIL, SMS } from '../../constants'
import { getAlertValue } from '../../helpers'
import AlertBoard from './components/AlertBoard'
import FooterButtons from './components/FooterButtons'
import HeaderBar from './components/HeaderBar'

const ProductAlerts = () => {
  const { editingProduct } = useSelector((state) => state.user)
  const [alerts, setAlerts] = React.useState({
    email: false,
    sms: false,
  })

  React.useEffect(() => {
    const { product_alerts } = editingProduct || {}

    if (!product_alerts) {
      return
    }

    setAlerts((prevAlerts) => ({
      ...prevAlerts,
      email: getAlertValue(product_alerts, EMAIL),
      sms: getAlertValue(product_alerts, SMS),
    }))
  }, [editingProduct])

  const onChangeAlertStatus = (event) => {
    const { checked, name } = event.target

    setAlerts((prevAlerts) => ({
      ...prevAlerts,
      [name]: checked,
    }))
  }

  return (
    <ProductAlertsContainer>
      <HeaderBar />
      <AlertBoard alerts={alerts} onChangeAlertStatus={onChangeAlertStatus} />
      <FooterButtons alerts={alerts} />
    </ProductAlertsContainer>
  )
}

export default ProductAlerts

const ProductAlertsContainer = styled(Paper)`
  .header__bar {
    padding: 20px;
    border-bottom: 1px solid var(--gray-2);

    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .alert__board {
    border-bottom: 1px solid var(--gray-2);
    padding: 24px 20px;

    .alert__item {
      padding: 8px 0px;

      .alert__item--info {
        span {
          margin-right: 5px;
        }
      }
    }
  }

  .footer__buttons {
    padding: 12px 20px;

    .footer__button {
      &.next__btn {
        width: 125px;
      }
      margin-left: 10px;
    }
  }
`
