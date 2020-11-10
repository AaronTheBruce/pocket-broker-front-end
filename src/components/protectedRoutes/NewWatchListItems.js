import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, Button, ListItem } from "@material-ui/core";
import Cryptos from "./Cryptos";
import url from '../../url-config';

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
  const [supportedCryptos, setSupportedCryptos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getSupportedCryptos = async () => {
    // retrieve the list of supported cryptos from the database
    const result = await fetch(`${url}/cryptos`);
    const data = await result.json();
    console.log(data.crypto)
    // store in state and render List
    setSupportedCryptos(data.crypto);
  }

  const handleSelectedIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  }

  useEffect(() => {
    (() => getSupportedCryptos())()
  }, [])

  return (
    <div className={classes.root} >
      <List
      component="nav"
      dense={true}
      aria-label="crypto watch list"
      >
        {supportedCryptos ?
         supportedCryptos.map((crypto, i) => <Cryptos key={i} crypto={crypto} i={i} handleSelectedIndex={handleSelectedIndex} cryptoHandler={props.cryptoHandler} />):
         <div>...Loading</div>
        }
        {/* <Button onClick={() => console.log(props.cryptoList)}>Log Cryptos</Button> */}
      </List>
    </div>
  );
}
