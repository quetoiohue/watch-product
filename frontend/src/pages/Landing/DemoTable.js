import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import styled from 'styled-components'
import ButtonSubmit from '../../components/core/ButtonSubmit'
import SimpleTable from '../../components/core/SimpleTable'

export default function DemoTable(props) {
  const { products } = props

  const Headers = (
    <React.Fragment>
      <TableCell>Product</TableCell>
      <TableCell align="right">Actual Price</TableCell>
      <TableCell align="right"></TableCell>
    </React.Fragment>
  )

  const Rows = () => (
    <React.Fragment>
      {products?.map((row) => (
        <TableRowInner key={row.title}>
          <TableCell component="th" scope="row">
            <div className="product__info">
              <img src={row.imageURL} alt="product image" />
              <p>{row.title}</p>
            </div>
          </TableCell>
          <TableCell align="right">{`${row.price}${row.currency}`}</TableCell>
          <TableCell align="right">
            <ButtonSubmit variant="contained" color="primary">
              Add
            </ButtonSubmit>
          </TableCell>
        </TableRowInner>
      ))}
    </React.Fragment>
  )

  return !!products.length && <SimpleTable Headers={Headers} Rows={<Rows />} />
}

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
`
