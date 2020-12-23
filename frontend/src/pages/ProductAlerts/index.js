import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BasicPaper from '../../components/core/BasicPaper'
import { EMAIL, SMS } from '../../constants'
import { getAlertValue } from '../../helpers'
import AlertBoard from './components/AlertBoard'
import FooterButtons from './components/FooterButtons'

const ProductAlerts = () => {
  const { user, editingProduct } = useSelector(state => state.user)
  const { total_point } = user || {}
  const [alerts, setAlerts] = React.useState({
    email: false,
    sms: false
  })

  React.useEffect(() => {
    const { product_alerts } = editingProduct || {}

    if (!product_alerts) {
      return
    }

    setAlerts(prevAlerts => ({
      ...prevAlerts,
      email: getAlertValue(product_alerts, EMAIL),
      sms: getAlertValue(product_alerts, SMS)
    }))
  }, [editingProduct])

  const onChangeAlertStatus = event => {
    const { checked, name } = event.target

    setAlerts(prevAlerts => ({
      ...prevAlerts,
      [name]: checked
    }))
  }

  const headerBar = (
    <>
      <span className="title">Types of alerts</span>
      <div className="user__point">
        Available points:{' '}
        <span className="text-primary font-medium"> {total_point} </span>
      </div>
    </>
  )

  return (
    <ProductAlertsContainer>
      <BasicPaper
        headerBar={headerBar}
        mainContent={
          <AlertBoard
            alerts={alerts}
            onChangeAlertStatus={onChangeAlertStatus}
          />
        }
      />
      <FooterButtons alerts={alerts} />
    </ProductAlertsContainer>
  )
}

export default ProductAlerts

const ProductAlertsContainer = styled.div`
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
