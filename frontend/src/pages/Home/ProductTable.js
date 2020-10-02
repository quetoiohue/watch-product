import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import SimpleTable from '../../components/core/SimpleTable'
import { CALL, EMAIL, SMS } from '../../constants'
import { getAlert } from '../../helpers'
import { formatDate, formatMoney } from '../../helpers/format'
import { setEditingProduct } from '../../reducers/actions/user'

export default function ProductTable(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { products } = user?.user || []

  const onClickRow = async (row) => {
    await dispatch(setEditingProduct(row))
    await history.push('/products/' + row.id)
  }

  const Headers = (
    <React.Fragment>
      <TableCell>Product</TableCell>
      <TableCell align="center">Alerts</TableCell>
      <TableCell align="right">Actual Price</TableCell>
      <TableCell align="right">Old Price</TableCell>
      <TableCell align="center">Discount</TableCell>
      <TableCell align="center">Date</TableCell>
    </React.Fragment>
  )

  const Rows = () => (
    <React.Fragment>
      {products?.map((row) => (
        <TableRowInner key={row.name} hover onClick={() => onClickRow(row)}>
          <TableCell component="th" scope="row">
            <div className="product__info">
              <img src={row.image} alt="product image" />
              <p>{row.name}</p>
            </div>
          </TableCell>
          <TableCell align="center" className="product__alerts">
            {row.product_alerts.map((_alert) => {
              return (
                !!_alert.status && (
                  <div key={_alert.alert_type_id}>{getAlert(_alert)}</div>
                )
              )
            })}
          </TableCell>
          <TableCell align="right">
            {formatMoney(row.actual_price, row.currency)}
          </TableCell>
          <TableCell align="right" className="old__price">
            {formatMoney(row.old_price, row.currency)}
          </TableCell>
          <TableCell align="center">-{row.discount}%</TableCell>
          <TableCell align="center">{formatDate(row.created_at)}</TableCell>
        </TableRowInner>
      ))}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {/* <Portal container={document.getElementById('header__icon')}>
        <span>But I actually render here!</span>
      </Portal> */}
      <SimpleTable Headers={Headers} Rows={<Rows />} />
    </React.Fragment>
  )
}

const TableRowInner = styled(TableRow)`
  cursor: pointer;

  .product__info {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
      width: 50px;
      height: auto;
      margin-right: 8px;
    }
  }

  .product__alerts {
    word-break: break-word;

    span {
      margin-right: 5px;
    }
  }

  .old__price {
    text-decoration: line-through;
  }
`
