import React from 'react';
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

function createData(name, average, min, max, percent) {
  return { name, average, min, max, percent };
}

export const Stats = props => {

  const rows = [
    createData('Price Stats', props.averagePrice, props.minPrice, props.maxPrice, props.percentChange),
  ];
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell>Statistics</TableCell>
            <TableCell align="right">Average Price</TableCell>
            <TableCell align="right">Min Price</TableCell>
            <TableCell align="right">Max Price</TableCell>
            <TableCell align="right">Percent Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">${row.average}</TableCell>
              <TableCell align="right">${row.min}</TableCell>
              <TableCell align="right">${row.max}</TableCell>
              <TableCell align="right">{row.percent}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
