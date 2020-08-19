import React, { useState, useEffect, useContext } from "react";
import { url } from "../../url-config";
import { PocketBrokerContext } from "../../context/PocketBrokerContext";


export const WatchList = props => {

  const { getUser, userId, authAxios } = useContext(PocketBrokerContext);
  const [watchListItems, setWatchListItems] = useState(undefined);


  
  return(
    <div>

    </div>
  )

}
