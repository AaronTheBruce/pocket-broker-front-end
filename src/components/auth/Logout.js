import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { PocketBrokerContext } from '../../context/PocketBrokerContext';

export const Logout = () => {
  const { logOut } = useContext(PocketBrokerContext);
  const history = useHistory();
  const handleLogOut = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div>
      <Button onClick={handleLogOut}>
        Logout
      </Button>
    </div>
  );
};
