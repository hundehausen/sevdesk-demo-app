import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CustomTable({ data }) {
  function getKeys() {
    return Object.keys(data[0]);
  }

  function getHeader() {
    const keys = getKeys();
    const cells = keys.map((key, index) => {
      return (
        <TableCell align="center" key={key}>
          {key.toUpperCase()}
        </TableCell>
      );
    });
    return (
      <TableHead>
        <TableRow>{cells}</TableRow>
      </TableHead>
    );
  }

  function getRowsData() {
    const keys = getKeys();
    return data.map((row, index) => {
      return (
        <TableRow key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </TableRow>
      );
    });
  }

  function RenderRow({ data, keys }) {
    return keys.map((key, index) => {
      return (
        <TableCell align="center" key={key + ": " + data[key]}>
          {data[key]}
        </TableCell>
      );
    });
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        {getHeader()}
        <TableBody>{getRowsData()}</TableBody>
      </Table>
    </TableContainer>
  );
}
