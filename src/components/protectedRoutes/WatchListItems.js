import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import ReactDOM from "react-dom"
import fetch from "node-fetch";
import url from "../../url-config";
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
      let data = await fetch(`${coinGecko}/${allCryptos}`);
      let json = await data.json();
      setWatchListItems(json);
      console.log(json);
    })();
  }, []);


  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            {/* <DraftsIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
    </div>
  )

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
