import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, Button } from "@material-ui/core";
import Cryptos from "./Cryptos";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}))

export const WatchList = props => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.cryptoHandler(event.currentTarget.id);
  };

  const handleSelectedIndex = (index) => {
    
  }

  return (
    <div className={classes.root} >
      <List
      component="nav"
      dense={true}
      aria-label="crypto watch list"
      >
        {props.cryptoList.map((crypto, i) => Cryptos(crypto, i, handleListItemClick))}
        {/* <Button onClick={() => console.log(props.cryptoList)}>Log Cryptos</Button> */}
      </List>
    </div>
  );
}
