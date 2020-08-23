import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import { PocketBrokerContext } from '../../context/PocketBrokerContext'

export const DemoUser = () => {
  const { login, authToken, setUserID, getUser, authAxios } = useContext(PocketBrokerContext);

  const email = 'demouser@demo.com'
  const password = 'password';

  if (authToken) {
    return <Redirect to='/' />
  }

  const postLogin = () => {
    authAxios.post("/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          const { access_token, user_id } = res.data;
          login(access_token);
          setUserID(user_id);
          getUser(user_id)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <div style={{ height: 20 }} />
      <Button
        color="secondary"
        variant="contained"
        onClick={postLogin}
      >
        <PermIdentity />
        Login As Demo User
      </Button>

      <div />
    </div>
  );
};
