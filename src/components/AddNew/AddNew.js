import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNew } from "../../redux/Actions/Action";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function AddNew(props) {
  const dispatch = useDispatch();
  const [newdata, setNewdata] = useState({
    title: "",
    desc: "",
  });

  const titleHandler = (title) => {
    const newState = { ...newdata };
    newState.title = title;
    setNewdata(newState);
  };

  const descHandler = (desc) => {
    const newState = { ...newdata };
    newState.desc = desc;
    setNewdata(newState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post(process.env.REACT_APP_BACKEND_SERVER, newdata)
      .then((res) => dispatch(addNew(res.data)))
      .catch((err) => console.log(err));

    const newState = { ...newdata };
    newState.title = "";
    newState.desc = "";
    setNewdata(newState);
  };

  return (
    <Container>
      <IconButton aria-label="back" onClick={() => props.history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Box border={2} borderColor="grey.500" p={4} borderRadius={16}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(event) => submitHandler(event)}
        >
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  id="title"
                  onChange={(event) => titleHandler(event.target.value)}
                  label="Title"
                  value={newdata.title}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  onChange={(event) => descHandler(event.target.value)}
                  value={newdata.desc}
                  label="Description"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
