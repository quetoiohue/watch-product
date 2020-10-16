import { TableHead } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FadeTable from '../../components/core/FadeTable'
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
      <TableHead>
        <TableCell>Product</TableCell>
        <TableCell style={{ width: 150 }} align="right">
          Alerts
        </TableCell>
        <TableCell style={{ width: 150 }} align="right">
          Actual Price
        </TableCell>
        <TableCell style={{ width: 150 }} align="right">
          Old Price
        </TableCell>
        <TableCell style={{ width: 150 }} align="right">
          Discount
        </TableCell>
        <TableCell style={{ width: 150 }} align="right">
          Date
        </TableCell>
      </TableHead>
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
          <TableCell
            style={{ width: 150 }}
            align="right"
            className="product__alerts font-medium"
          >
            {row.product_alerts.map((_alert) => {
              return (
                !!_alert.status && (
                  <div key={_alert.alert_type_id}>{getAlert(_alert)}</div>
                )
              )
            })}
          </TableCell>
          <TableCell
            style={{ width: 150 }}
            align="right"
            className="font-semibold"
          >
            {formatMoney(row.actual_price, row.currency)}
          </TableCell>
          <TableCell
            style={{ width: 150 }}
            align="right"
            className="old__price font-semibold"
          >
            {formatMoney(row.old_price, row.currency)}
          </TableCell>
          <TableCell
            style={{ width: 150 }}
            align="right"
            className="font-semibold"
          >
            -{row.discount}%
          </TableCell>
          <TableCell style={{ width: 150 }} align="right">
            {formatDate(row.created_at)}
          </TableCell>
        </TableRowInner>
      ))}
    </React.Fragment>
  )

  return (
    <TableContainer>
      {/* <Portal container={document.getElementById('header__icon')}>
        <span>But I actually render here!</span>
      </Portal> */}
      <FadeTable Headers={Headers} Rows={<Rows />} />
    </TableContainer>
  )
}

const TableContainer = styled.div`
  .table__body {
    max-height: 400px;
    td,
    th {
      &.font-medium {
        font-weight: 500;
      }
      &.font-semibold {
        font-weight: 600;
      }
    }
  }
`

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
    font-weight: 500;
    span {
      margin-right: 5px;
    }
  }

  .old__price {
    text-decoration: line-through;
  }
`
