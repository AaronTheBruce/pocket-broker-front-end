import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(crypto, percent_change, sell_price, buy_price, purchase_power) {
//   return { crypto, percent_change, sell_price, buy_price, purchase_power };
// }

export const Events = (props) => {

  // const rows = [
  //   createData(props.crypto, props.averagePrice, props.minPrice, props.maxPrice, props.priceChange, props.percentChange),
  // ];

  /**
   * GET ALL events by current user_id on render
   * map them to the return below
   */

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Events</TableCell>
            <TableCell align="center">CryptoName</TableCell>
            <TableCell align="center">Percent Change</TableCell>
            <TableCell align="center">Sell Price (USD)</TableCell>
            <TableCell align="center">Buy Price (USD)</TableCell>
            <TableCell align="center">Purchase Power (USD)</TableCell>
            <TableCell align="center">Edit Button</TableCell>
            <TableCell align="center">Delete Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align="center">In Dev</TableCell>
          <TableCell align="center">Bitcoin</TableCell>
          <TableCell align="center">3.00%</TableCell>
          <TableCell align="center">20000</TableCell>
          <TableCell align="center">10000</TableCell>
          <TableCell align="center">$50</TableCell>
          <TableCell align="center">Edit Button</TableCell>
          <TableCell align="center">Delete Button</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
