import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateData } from "../../redux/Actions/Action";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Edit(props) {
  const propsId = props.match.params.id;
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const titleHandler = (title) => {
    const newData = { ...data };
    newData.title = title;
    setData(newData);
  };

  const descHandler = (desc) => {
    const newData = { ...data };
    newData.desc = desc;
    setData(newData);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_BACKEND_SERVER + "update", data)
      .then((res) => dispatch(updateData(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_SERVER + "edit/" + propsId)
      .then((res) => setData(res.data));
  }, [propsId]);

  const form = data._id ? (
    <form noValidate autoComplete="off" onSubmit={(e) => submitHandler(e)}>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
              defaultValue={data.title}
              onChange={(e) => {
                titleHandler(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="component-simple">Description</InputLabel>
            <Input
              defaultValue={data.desc}
              onChange={(e) => descHandler(e.target.value)}
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
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  ) : null;

  return (
    <Container>
      <IconButton aria-label="back" onClick={() => props.history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Box border={2} borderColor="grey.500" p={4} borderRadius={16}>
        {form}
      </Box>
    </Container>
  );
}
