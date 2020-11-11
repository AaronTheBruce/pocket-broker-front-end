import React from "react";
import { ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";

const Cryptos = (props) => {
  const clickHandler = (eventTargetId, index) => {
    props.selectedHandler(index);
    props.cryptoHandler(eventTargetId);
  }
  return (
    <ListItem
      button
      id={props.id}
      key={props.id}
      selected={props.selectedIndex === props.index}
      onClick={event => clickHandler(event.currentTarget.id, props.index)}
    >
      <ListItemIcon>
        <Avatar alt="bitcoin-logo" src={`/images/${props.id}-logo.png`} />
      </ListItemIcon>
      <ListItemText primary={props.id} />
    </ListItem>
  )
}

export default Cryptos
