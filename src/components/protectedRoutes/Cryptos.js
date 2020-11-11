import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";

// This component should help dynamically render crypto currencies in the WatchList
//
const Cryptos = (props) => {

  const handleListItemClick = (event, index) => {
    console.log("event id", event.currentTarget.id);
    props.handleSelectedIndex(index);
    props.cryptoHandler(event.currentTarget.id);
  };

  return (
    <ListItem
      button
      id={props.id}
      key={props.id}
      selected={props.selectedIndex === props.i}
      onClick={(event) => handleListItemClick(event, props.i)}
    >
      <ListItemIcon>
        <Avatar alt="bitcoin-logo" src={`/images/${props.crypto.name}-logo.png`} />
      </ListItemIcon>
      <ListItemText primary={props.crypto.name} />
    </ListItem>
  )
}

export default Cryptos
