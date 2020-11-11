import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List } from "@material-ui/core";
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
  const [selectedIndex, setSelectedIndex] = useState(0);  // selectedIndex state held in watchListItems Component

  const getSupportedCryptos = async () => {
    // retrieve the list of supported cryptos from the database
    const result = await fetch(`${url}/cryptos`);
    const data = await result.json();
    // store in state and render List
    setSupportedCryptos(data.crypto);
  }

  const selectedHandler = (index) => {  // handler for updated the selected index
    setSelectedIndex(index)
  }

  useEffect(() => {
    (() => getSupportedCryptos())() // pull in the supported cryptos from the pg cryptos table on render
  }, [])

  return (
    <div className={classes.root} >
      <List
        component="nav"
        dense={true}  // make the WatchList a bit more compact and sleek looking
        aria-label="crypto watch list"
      >
        {supportedCryptos
          ?
          supportedCryptos.map((crypto, i) => <Cryptos
            key={i} // key for helping map the supportedCryptos
            index={i} // index is for keeping track of each crypto for the selectedIndex feature
            id={crypto.name}  // id is stored as a crypto name
            selectedIndex={selectedIndex}  // pass the current selected index as a prop
            selectedHandler={selectedHandler}  // pass the selectedHandler function as a prop
            cryptoHandler={props.cryptoHandler} // pass the cryptoHandler function as a prop
          />)
          :
          <div>...Loading</div> // while the component is loading in, display a loading message
        }
      </List>
    </div>
  );
}
