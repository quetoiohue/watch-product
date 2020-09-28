import { Paper } from '@material-ui/core'
import { ArrowRightAlt, NotificationsNone } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getAlert } from '../../../helpers'
import ButtonSubmit from '../../../components/core/ButtonSubmit'
import { formatMoney } from '../../../helpers/format'

const ProductInfo = () => {
  const { editingProduct } = useSelector((state) => state.user)
  const {
    image,
    name,
    actual_price,
    old_price,
    discount,
    currency,
    link,
    product_alerts,
  } = editingProduct || {}

  return (
    <>
      <Paper>
        <div className="flex product__info">
          <img src={image} alt="product" />
          <div className="product__info--detail flex items-center justify-between flex-1">
            <div className="product__detail--sum">
              <p className="product__sum--name">{name}</p>
              <div className="flex">
                <span className="actual__price">
                  {formatMoney(actual_price)}
                </span>
                <span className="old__price">{formatMoney(old_price)}</span>
              </div>
              <p className="product__sum--alert">
                <NotificationsNone />
                {product_alerts?.map((_alert) => {
                  return (
                    <span key={_alert.alert_type_id}>{getAlert(_alert)}</span>
                  )
                })}
              </p>
            </div>
            <div className="product__discount">{discount}%</div>
          </div>
        </div>
      </Paper>
      <ButtonSubmit
        href={link}
        target="_blank"
        className="product__btn"
        endIcon={<ArrowRightAlt />}
      >
        GO TO SHOP
      </ButtonSubmit>
    </>
  )
}

export default ProductInfo
