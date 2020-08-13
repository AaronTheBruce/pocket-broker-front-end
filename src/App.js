import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { PocketBrokerContext } from './context/PocketBrokerContext';

function App() {
  const { authToken, currentUser, userID } = useContext(PocketBrokerContext);
  return (
    <>
      <h1>Hello world!</h1>
      <ThemeProvider theme={theme}>
        <Router>
          {/* {authToken !== null ? (
          <UserNavBar currentUser={currentUser} />
        ) : (
          <NarBar />
        )} */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
