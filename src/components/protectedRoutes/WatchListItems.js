import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";
import ReactDOM from "react-dom"
import fetch from "node-fetch";
import url from "../../url-config";
// import images from "../../assets/images"
import { PocketBrokerContext } from "../../context/PocketBrokerContext";
const allCryptos = "/coins/list";
const coinGecko = "https://api.coingecko.com/api/v3";
const createReactClass = require('create-react-class');
// api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export const WatchList = props => {
  const classes = useStyles();

  const { getUser, userId, authAxios } = useContext(PocketBrokerContext);
  const [watchListItems, setWatchListItems] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let cryptoName = props.cryptoName;

  console.log("onLoad:", cryptoName)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log("Event Target", event.currentTarget.id)
    // get element by class name "Mui-selected" and retrieve id
    props.cryptoHandler(event.currentTarget.id); // doesn't work ideally
    console.log('Prop state', props.cryptoName)
  };

  // const getCryptoByName = async (crypto) => {
  //   let data = await fetch(`${url}/cryptos/${crypto}`);
  //   let json = await data.json();
  //   cryptoName = crypto
  //   console.log("onClick", cryptoName)
  //   props.cryptoName = cryptoName
  //   console.log("The passed in props:", props.cryptoName)
  // }

  useEffect(() => {
    (async function () {
      let data = await fetch(`${url}/cryptos`);
      let json = await data.json();
      setWatchListItems(json.crypto);
      console.log(json.crypto);
    })();
  }, []);

  // watchListItems[0].name
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="crypto watch list">
        <ListItem
        button
        id="bitcoin"
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0) }
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="bitcoin-logo" src="/images/bitcoin-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Bitcoin" />
        </ListItem>
        <ListItem
        button
        id="ethereum"
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="ethereum-logo" src="/images/ethereum-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Ethereum" />
        </ListItem>
        <ListItem
        button
        id="litecoin"
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="litecoin-logo" src="/images/litecoin-logo.jpg" />
          </ListItemIcon>
          <ListItemText primary="LiteCoin" />
        </ListItem>
        <ListItem
        button
        id="bitcoin-cash"
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="bitcoin-cash-logo" src="/images/bitcoin-cash-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Bitcoin Cash" />
        </ListItem>
        <ListItem
        button
        id="ripple"
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="ripple-logo" src="/images/ripple-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Ripple" />
        </ListItem>
        <ListItem
        button
        id="basic-attention-token"
        selected={selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 6)}
        // onClick={props.action}
        >
          <ListItemIcon>
            <Avatar alt="basic-attention-token-logo" src="/images/basic-attention-token-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Basic Attention Token" />
        </ListItem>
      </List>
    </div>
  );

}

// const getSupportedCryptos = async () => {
//   await authAxios.get(`${url}/cryptos/`, {
//     name: name,
//     symbol: symbol,
//   }).then(result => {
//     console.log(result)
//   })
// }

// let watchItems = createReactClass({
//   render: function () {
//     let itemList = watchListItems.map(function(coin) {
//       return <li>{coin['id']}</li>
//     })
//     return <ul>{itemList}</ul>
//   }
// })
