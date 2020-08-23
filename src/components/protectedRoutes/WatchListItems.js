import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";

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

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.cryptoHandler(event.currentTarget.id);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="crypto watch list">
        <ListItem
        button
        id="bitcoin"
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0) }
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
