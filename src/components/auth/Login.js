import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { PocketBrokerContext } from "../../context/PocketBrokerContext";
// import the demo user
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography, Box } from "@material-ui/core";
import url from "../../url-config";
import { DemoUser } from "./DemoUser";
import '../../index.css';
const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#f0eace",
    borderRadius: "2%",
  },
}));

export const Login = () => {
  const classes = useStyles();
  const { login, authToken, setUserId, getUser } = useContext(PocketBrokerContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    Axios.post(`${url}/auth/login`, {
      email,
      password,
    }).then(res => {
      if (res.status === 200) {
        const { access_token, user_id } = res.data;
        login(access_token);
        setUserId(user_id);
        window.localStorage.setItem("user_id", user_id);
        getUser(user_id);
      }
    }).catch(err => {
      console.error(err);
    });
  };

  if (authToken) {
    return <Redirect to="/" />;
  }
  return (
    <Box style={{ margin: "10% 35%", justifyContent: "center" }}>
      <Grid
        className={classes.formContainer}
        container
        component="form"
        alignItems="center"
        alignContent="center"
        justify="center"
        direction="column"
      >
        <TextField
          label="email"
          margin="normal"
          autoComplete='email address'
          onChange={e => setEmail(e.target.value)}>
        </TextField>
        <TextField
          label="Password"
          margin="normal"
          type="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}>
        </TextField>
        <Grid container item direction="column" justify="center" alignContent="center">
          <Button color="secondary" variant="contained" width="100%" onClick={loginUser} style={{margin:"10px 0px"}}>Login</Button>
          <DemoUser />
        </Grid>
        <Typography style={{margin: '10px'}}>
          <a href="/sign-up">Sign Up Here!</a>
        </Typography>
      </Grid>
    </Box>
  )
}
