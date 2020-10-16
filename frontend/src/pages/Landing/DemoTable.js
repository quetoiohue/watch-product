import { TableHead } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import FadeTable from '../../components/core/FadeTable'
import SimpleTable from '../../components/core/SimpleTable'
import { formatMoney } from '../../helpers/format'
import { displayModal } from '../../reducers/actions/modal'

export default function DemoTable(props) {
  const dispatch = useDispatch()
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
        <TableRowInner key={row.title}>
          <TableCell component="th" scope="row">
            <div className="product__info">
              <img src={row.imageURL} alt="product image" />
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
        </TableRowInner>
      ))}
    </React.Fragment>
  )

  return (
    !!products.length && (
      <TableContainer>
        <FadeTable Headers={Headers} Rows={Rows} />
      </TableContainer>
    )
  )
}

const TableContainer = styled.div`
  .table__body {
    max-height: 325px;
  }
`

const TableRowInner = styled(TableRow)`
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
  .table__body {
    max-height: 325px;
  }
`
