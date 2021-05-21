import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteData } from "../../redux/Actions/Action";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableView() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const deleteHandler = (id) => {
    return axios
      .get(process.env.REACT_APP_BACKEND_SERVER + "delete/" + id)
      .then((res) => dispatch(deleteData(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => setRows(data), [data]);

  const table =
    rows &&
    rows.map((row, key) => (
      <TableRow key={key}>
        <TableCell align="center">{key + 1}</TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.desc}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="update"
            component={Link}
            to={"/edit/" + row._id}
            className={classes.margin}
          >
            <UpdateIcon color="primary" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="delete"
            onClick={() => deleteHandler(row._id)}
            className={classes.margin}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Box m={2}>
        <Container align="right">
          <Button
            component={Link}
            to="/addnew"
            variant="contained"
            color="primary"
            disableElevation
          >
            Add New
          </Button>
        </Container>
      </Box>
      <Box mb={10}>
        <Container>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sl. No.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{table}</TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
