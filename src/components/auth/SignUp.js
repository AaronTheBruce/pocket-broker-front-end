import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom"
import { Grid, TextField, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { PocketBrokerContext } from "../../context/PocketBrokerContext";
import url from '../../url-config';

const useStyles = makeStyles(theme => ({
  formContainer: {
    backgroundColor: "#f0eace",
    borderRadius: "2%",
  },
  spacing: {
    margin: '5px 5px',
  }
}));

export function SignUp() {
  const classes = useStyles();
  const { login, authToken, setUserID, getUser } = useContext(PocketBrokerContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  // if the user is already authentication, redirect to the root route
  if (authToken) {
    return <Redirect to="/" />;
  }

  const loginUser = () => {
    Axios.post(`${url}/auth/login`, {
      email,
      password,
    }).then(res => {
      if (res.status === 200) {
        const { access_token, user_id } = res.data;
        login(access_token);
        setUserID(user_id);
        getUser(user_id);
      }
    }).catch(err => {
      console.error(err);
    });
  };

  const signUpUser = () => {
    Axios.post(`${url}/auth/signup`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    }).then(({ email, password }) => loginUser({ email, password }));
  };

  return (
    <Box borderRadius="25%" style={{ margin: "10% 35%", justifyContent: "center" }}>
      <Grid
        className={classes.formContainer}
        component="form"
        container
        item
        alignItems="center"
        justify="space-between"
        direction="column"
        onSubmit={signUpUser}
      >
        <Grid style={{ display: "flex", flexDirection: "column" }}>

          <TextField label="First Name" margin="normal" onChange={e => setFirstName(e.target.value)} />
          <TextField label="Last Name" margin="normal" onChange={e => setLastName(e.target.value)} />
          <TextField label="Email" type="email" margin="normal" onChange={e => setEmail(e.target.value)} />
          <TextField label="Phone Number" type="phone" margin="normal" onChange={e => setPhoneNumber(e.target.value)} />
          <TextField label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />

          <Button color="secondary" onClick={signUpUser} variant="contained" style={{width:"100%", margin:"10px 0px"}}>
            Submit
          </Button>
          <Typography style={{ margin: '5px' }}>
            Already signed up? <a href="/login">Login</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
