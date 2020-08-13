import React from "react";
import { useHistory } from "react-router-dom";
import { ListItemText, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({

// }))

export const AuthConfig = () => {
  // const classes = useStyles();
  const history = useHistory();

  const signUp = () => {
    history.push("/sign-up");
  };
  const login = () => {
    history.push("/login");
  };

  return (
    <List>
      <ListItem button onClick={login}>
        <ListItemText className={classes.listItem} primary="Login" />
      </ListItem>

      <ListItem button onClick={signUp}>
        <ListItemText className={classes.listItem} primary="Sign Up" />
      </ListItem>
    </List>
  );
};
