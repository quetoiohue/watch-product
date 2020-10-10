import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../../helpers/format'

const ProductPrices = () => {
  const { editingProduct } = useSelector((state) => state.user)
  const { actual_price, cheapest_price, initial_price } = editingProduct || {}

  return (
    <>
      <Paper className="highlight__prices">
        <div className="highlight__price flex justify-between items-center">
          <Typography>Current price </Typography>
          <Typography className="text-primary">
            {formatMoney(actual_price)}
          </Typography>
        </div>
        <div className="highlight__price flex justify-between items-center">
          <Typography>The cheapest price </Typography>
          <Typography className="text-success">
            {formatMoney(cheapest_price)}
          </Typography>
        </div>
        <div className="highlight__price flex justify-between items-center">
          <Typography>Initial price </Typography>
          <Typography className="text-warning">
            {formatMoney(initial_price)}
          </Typography>
        </div>
      </Paper>
    </>
  )
}

export default ProductPrices
