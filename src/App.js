import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { PocketBrokerContext } from './context/PocketBrokerContext';
import theme from "./theme"

function App() {
  // const { authToken, currentUser, userID } = useContext(PocketBrokerContext);
  return (
    <>
      <h1>Dia Duit!</h1>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* {authToken !== null ? (
            <UserNavBar currentUser={currentUser} />
          ) : (
            <NarBar />
          )} */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
