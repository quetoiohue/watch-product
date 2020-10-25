import { TableCell, TableHead, TableRow } from '@material-ui/core'
import { NotificationsActive } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FadeTable from '../../components/core/FadeTable'
import { getAlert } from '../../helpers'
import { formatDate, formatMoney, formatMonth } from '../../helpers/format'
import { httpPost } from '../../helpers/http'
import { setEditingProduct } from '../../reducers/actions/user'

export default function ProductTable(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { products } = user?.user || []

  React.useEffect(() => {
    async function fetchLinksFromDemo() {
      const links = JSON.parse(localStorage.getItem('links'))
      if (links?.length) {
        await httpPost(
          '/products',
          {
            links,
          },
          {}
        )

        localStorage.removeItem('links')
      }
    }

    fetchLinksFromDemo()
  }, [dispatch])

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
        <TableRowInner key={row.id} hover onClick={() => onClickRow(row)}>
          <TableCell component="th" scope="row">
            <div className="product__info">
              <img src={row.image} alt="product" />
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

  const renderMobile = {
    Headers: (
      <React.Fragment>
        <TableHead>
          <TableCell>Product</TableCell>
          <TableCell style={{ width: 250 }} align="center">
            Price
          </TableCell>
        </TableHead>
      </React.Fragment>
    ),
    Rows: (
      <React.Fragment>
        {products?.map((row) => (
          <TableRow
            key={row.id}
            className="mobile__row"
            hover
            onClick={() => onClickRow(row)}
          >
            <TableCell component="th" scope="row">
              <div className="product__img">
                <img src={row.image} alt="product" />
                {!!row.product_alerts.length && (
                  <NotificationsActive color="action" className="img__notice" />
                )}
              </div>
            </TableCell>
            <TableCell
              style={{ width: 250 }}
              className="info__cell"
              align="center"
            >
              <div className="product__info flex items-center justify-between">
                <div>
                  <p className="info__name">{row.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="actual__price font-semibold">
                      {formatMoney(row.actual_price, row.currency)}
                    </div>
                    <div className="old_price font-semibold">
                      {formatMoney(row.old_price, row.currency)}
                    </div>
                  </div>
                </div>
                <div className="info__discount">
                  <p className="text-primary discount__value">
                    -{row.discount}%
                  </p>
                  <p className="discount__date">
                    {formatMonth(row.created_at)}
                  </p>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    ),
  }

  return (
    <TableContainer>
      {window.innerWidth <= 468 ? (
        <FadeTable Headers={renderMobile.Headers} Rows={renderMobile.Rows} />
      ) : (
        <FadeTable Headers={Headers} Rows={<Rows />} />
      )}
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
    tr {
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
    }
  }

  .mobile__row {
    .info__cell {
      text-align: left;
      font-size: 12px;
      line-height: 14px;
      padding: 12px 10px;

      .info__discount {
        text-align: right;
        margin-left: 12px;
      }

      .product__info {
        align-items: start;
      }

      .info__name {
        margin-bottom: 8px;
      }
      .old_price {
        text-decoration: line-through;
      }
    }

    .product__img {
      position: relative;
      .img__notice {
        position: absolute;
        top: -10px;
        left: -10px;
      }
      img {
        width: 50px;
        height: auto;
      }
    }
  }
`

const TableRowInner = styled(TableRow)``
