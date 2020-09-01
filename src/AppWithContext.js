import React, {useState} from "react";
import App from "./App";
import {PocketBrokerContext} from "./context/PocketBrokerContext";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import url from "./url-config";

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");
  const [authToken, setAuthToken] = useState(accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);
  const [currentUser, setCurrentUser] = useState();
  const [userId, setUserId] = useState(user_id);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    }
  }));

  const classes = useStyles();

  const authAxios = Axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const login = token => {
    window.localStorage.setItem("access_token", token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  const getUser = async userId => {
    if(!userId){
      return {};
    }
    const User = await authAxios.get(`/users/${userId}`, "User").then(res => {
      const {user} = res.data;
      setCurrentUser(user);
    });

    return User;
  };

  return (
    <PocketBrokerContext.Provider
      className={classes.paper}
      value={{
        authToken,
        isLoggedIn,
        login,
        logOut,
        currentUser,
        setCurrentUser,
        userId,
        setUserId,
        getUser,
        authAxios,
        url, }}
    >
      <App accessToken={accessToken} className={classes.paper}/>
    </PocketBrokerContext.Provider>
  )

}
