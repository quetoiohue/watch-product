import { Button } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

import SimpleTable from '../../components/core/SimpleTable'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function DemoTable() {
  const Headers = (
    <React.Fragment>
      <TableCell>Product</TableCell>
      <TableCell align="right">Actual Price</TableCell>
      <TableCell align="right"></TableCell>
    </React.Fragment>
  )

  const Rows = () => (
    <React.Fragment>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  )

  return <SimpleTable Headers={Headers} Rows={<Rows />} />
}
