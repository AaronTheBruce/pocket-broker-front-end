import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { PocketBrokerContext } from '../../context/PocketBrokerContext';

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     color: "#22577A",
//   },
// }));

export const Logout = () => {
  const { logOut } = useContext(PocketBrokerContext);
  const history = useHistory();
  // const classes = useStyles();
  const handleLogOut = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div>
      <ListItem button justify="center" onClick={handleLogOut}>
        <ListItemText >Logout</ListItemText>
      </ListItem>
    </div>
  );
};
