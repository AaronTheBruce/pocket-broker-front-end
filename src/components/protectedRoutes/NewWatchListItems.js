import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Button } from "@material-ui/core";
import Cryptos from "./Cryptos";
import fetch from "node-fetch";
const coinGecko = "https://api.coingecko.com/api/v3";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export const WatchList = props => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cryptos, setCryptos] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.cryptoHandler(event.currentTarget.id);
  };

  // useEffect(() => {
  //   (() => getCryptos())()  // We get the data in an array cryptos[i].id/symbol/name
  // }, [cryptos])

  return (
    <div className={classes.root}>
      <List
      component="nav"
      overflow="auto"
      aria-label="crypto watch list"
      >
        {
          props.cryptoList.map((crypto, i) => Cryptos(crypto, i))
        }
        <Button onClick={() => console.log(props.cryptoList)}>Log Cryptos</Button>
      </List>
    </div>
  );
}
