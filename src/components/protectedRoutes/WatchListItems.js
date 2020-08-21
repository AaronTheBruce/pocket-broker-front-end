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
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="bitcoin-logo" src="/images/bitcoin-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Bitcoin" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="ethereum-logo" src="/images/ethereum-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Ethereum" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="litecoin-logo" src="/images/litecoin-logo.jpg" />
          </ListItemIcon>
          <ListItemText primary="LiteCoin" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="bitcoin-cash-logo" src="/images/bitcoin-cash-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Bitcoin Cash" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Avatar alt="ripple-logo" src="/images/ripple-logo.png" />
          </ListItemIcon>
          <ListItemText primary="Ripple" />
        </ListItem>
        <ListItem button>
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
