import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Home } from "./components/protectedRoutes/Home";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter>
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
