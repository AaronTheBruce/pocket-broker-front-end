import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { PocketBrokerContext } from "../../context/PocketBrokerContext";
// import the demo user
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import url from "../../url-config";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: theme.palette.secondary.main,
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
      if(res.status === 200) {
        const {access_token, user_id} = res.data;
        login(access_token);
        setUserId(user_id);
        window.localStorage.setItem("user_id", user_id);
        getUser(user_id);
      }
    }).catch(err => {
      console.error(err);
    });
  };

  if(authToken) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Grid container>
        <Grid item>
          {/* image ? */}
        </Grid>
      </Grid>
      <Grid
        className={classes.formContainer}
        container
        component="form"
        item
        alignItems="center"
        justify="space-between"
        direction="column"
      >
        <TextField label="email" margin="normal" autoComplete='email address' onChange={e => setEmail(e.target.value)}></TextField>
        <TextField label="Password" margin="normal" type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)}></TextField>
        <Grid container item direction="column" justify="center" alignContent="center">
          <Button color="primary" variant="contained" width="100%" onClick={loginUser}>Login</Button>
          {/* DemoUser Button */}
        </Grid>
        <Typography>
          Are ye registered?<a href="/sign-up">Sign Up Here!</a>
        </Typography>
      </Grid>
    </>
  )
}
