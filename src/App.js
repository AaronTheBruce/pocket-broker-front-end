import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Home } from "./components/protectedRoutes/Home";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "@material-ui/core/styles";
// import { CssBaseline } from "@material-ui/core";
// import { PocketBrokerContext } from './context/PocketBrokerContext';
// import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme"

function App() {
  // const { authToken, currentUser, userID } = useContext(PocketBrokerContext);
  // super important comment
  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        {/* {authToken !== null ? (
            <UserNavBar currentUser={currentUser} />
          ) : (
            <NarBar />
          )} */}
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
