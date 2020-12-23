import { TableHead } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import FadeTable from '../../components/core/FadeTable'
import { formatMoney } from '../../helpers/format'
import { displayModal } from '../../reducers/actions/modal'

export default function DemoTable(props) {
  const { products } = props

  const handleSave = async () => {
    return displayModal('error-modal', { text: 'You need login to save.' })
  }

  const Headers = (
    <React.Fragment>
      <TableHead>
        <TableCell>Product</TableCell>
        <TableCell style={{ width: 250 }} align="right">
          Actual Price
        </TableCell>
        <TableCell style={{ width: 250 }} align="right"></TableCell>
      </TableHead>
    </React.Fragment>
  )

  const Rows = (
    <React.Fragment>
      {products?.map((row) => (
        <TableRow key={row.title}>
          <TableCell component="th" scope="row">
            <div className="product__info">
              <img src={row.imageURL} alt=".product" />
              <p>{row.title}</p>
            </div>
          </TableCell>
          <TableCell style={{ width: 250 }} align="right">
            {formatMoney(row.price, row.currency)}
          </TableCell>
          <TableCell style={{ width: 250 }} align="right">
            <ButtonSubmit
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </ButtonSubmit>
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  )

  const renderMobile = {
    Headers: (
      <React.Fragment>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell style={{ width: 250 }} align="center">
              Price
            </TableCell>
          </TableRow>
        </TableHead>
      </React.Fragment>
    ),
    Rows: (
      <React.Fragment>
        {products?.map((row) => (
          <TableRow key={row.title} className="mobile__row">
            <TableCell component="th" scope="row">
              <div className="product__img">
                <img src={row.imageURL} alt=".product" />
              </div>
            </TableCell>
            <TableCell style={{ width: 250 }} align="center">
              <div className="product__info">
                <p className="info__name">{row.title}</p>
                <div className="flex items-center justify-between">
                  <div className="actual__price">
                    {formatMoney(row.price, row.currency)}
                  </div>
                  <ButtonSubmit
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </ButtonSubmit>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    ),
  }

  return (
    !!products.length && (
      <TableContainer>
        {window.innerWidth <= 468 ? (
          <FadeTable Headers={renderMobile.Headers} Rows={renderMobile.Rows} />
        ) : (
          <FadeTable Headers={Headers} Rows={Rows} />
        )}
      </TableContainer>
    )
  )
}

const TableContainer = styled.div`
  .table__body {
    max-height: 325px;

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

    .mobile__row {
      .product__img img {
        width: 50px;
        height: auto;
        margin-right: 8px;
      }

      .product__info {
        display: block;

        .info__name {
          text-align: left;
          font-size: 12px;
          margin-bottom: 8px;
        }

        button {
          height: 30px;
        }
      }
    }
  }
`
