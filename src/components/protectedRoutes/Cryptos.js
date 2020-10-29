import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";

// This component should help dynamically render crypto currencies in the WatchList
//
const Cryptos = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ListItem
      button
      id={props.id}
      key={props.id}
      selected={selectedIndex === props.i}
      onClick={(event) => props.handleListItemClick(event, props.i)}
    >
      {/* <ListItemIcon>
        <Avatar alt="bitcoin-logo" src="/images/bitcoin-logo.png" />
      </ListItemIcon> */}
      <ListItemText primary={props.name} />
    </ListItem>
  )
}

export default Cryptos
