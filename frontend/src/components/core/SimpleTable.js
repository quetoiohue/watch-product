import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function BasicTable({ Headers, Rows }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>{Headers}</TableRow>
        </TableHead>
        <TableBody>{Rows}</TableBody>
      </Table>
    </TableContainer>
  )
}
