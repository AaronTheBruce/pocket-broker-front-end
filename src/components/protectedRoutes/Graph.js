import React, { useState, useEffect, useCallback, useContext } from "react";
import { Button } from "@material-ui/core";

import CanvasJSReact from "../../assets/canvasjs.react";
import { url } from "../../url-config";
import { PocketBrokerContext } from "../../context/PocketBrokerContext";
import fetch from "node-fetch";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const coinGecko = "https://api.coingecko.com/api/v3";
// const fetch = require("node-fetch");
// api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}/

export const Graph = (props) => {
  // states
  const { getUser, userId, authAxios } = useContext(PocketBrokerContext);
  const [cryptoName, setCryptoName] = useState(props.cryptoName);
  const [timeFrame, setTimeFrame] = useState(props.timeFrame);
  const [currentData, setCurrentData] = useState([]);

  // Unix Epoch TimeFrames in seconds
  const one_day_unix = 86400;
  const one_week_unix = 604800;
  const one_month_unix = 2629743;
  const one_year_unix = 31556926;
  // const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfTheYear = ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Returns date as UTC
  const unixToDate = (unix) => {
    // convert to milliseconds
    let date = new Date(unix);
    let month = monthsOfTheYear[date.getMonth()];
    let year = date.getFullYear();
    let dateNum = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let newDate = `${year} ${month} ${dateNum} ${hours}:${minutes}:${seconds}`;
    // toISOString returns date as UTC
    // console.log(newDate)
    newDate = new Date(newDate).toISOString()
    newDate.split('-').join(' ')
    return new Date(newDate);
    // return Date.UTC(year, month, dateNum, hours, minutes, seconds) / 1000;
  }

  // returns unix as UTC
  const dateToUnix = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // convert to seconds
    return Date.UTC(year, month, day, hours, minutes, seconds);
  }

  const getDayStart = () => {
    let today = new Date();
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0);
    // setStartDatetime(today); // sets the start time for the beginning of today.
    return today;
  }

  // returns in local time, needs to convert to UTC
  const getTimeAgo = () => {
    setTimeFrame(timeFrame.toLowerCase().trim());
    // setTimeFrame(timeFrame);
    let now = new Date();
    now = dateToUnix(now);
    let start;
    switch (timeFrame) {
      case "day":
        start = dateToUnix(getDayStart());
        break;
      case "week":
        start = now - one_week_unix;
        break;
      case "month":
        start = now - one_month_unix;
        break;
      case "year":
        start = now - one_year_unix;
        break;
      default:
        return "Invalid timeframe"
    }
    let modifiedStart = unixToDate(start)
    // setStartDatetime(modifiedStart);  // should convert unix to UTC date and set as state
    let year = modifiedStart.getFullYear();
    let month = modifiedStart.getMonth();
    let day = modifiedStart.getDate();
    let hours = modifiedStart.getHours();
    let minutes = modifiedStart.getMinutes();
    let seconds = modifiedStart.getSeconds();
    return Date.UTC(year, month, day, hours, minutes, seconds) / 1000
  }

  useEffect(() => {
    (async function () {
      // setCryptoName(cryptoName); // set the state to be the crypto name
      let start_time = getTimeAgo(timeFrame);
      let end_time = Math.floor(Date.now() / 1000);
      const api = `${coinGecko}/coins/${cryptoName}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}/`;
      let data = await fetch(api);
      let json = await data.json();
      // console.log("we're in the useEffect", json);
      setCurrentData(json.prices);
      console.log("we're in the useEffect", currentData);
    })();
  }, []);

  // sample data for demonstrative purposes (Temporary)
  // const memoizeGenerateRandomData = useCallback(
  //   (noOfDps) => {
  //     var xVal = 1, yVal = 100;
  //     var dps = [];
  //     for (var i = 0; i < noOfDps; i++) {
  //       yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
  //       dps.push({ x: xVal, y: yVal });
  //       xVal++;
  //     }
  //     console.log(dps)
  //     return dps;
  //   },
  //   [],
  // );

  const memoizeCryptoData = useCallback(
    () => {
      var dps = [];
      currentData.forEach(item => {
        let date = unixToDate(item[0]);
        let price = item[1].toFixed(2);
        dps.push({ x: date, y: Number(price) });
      });
      console.log("Datapoints", dps)
      return dps;
    },
    [currentData],
  );

  console.log('Setting up options')

  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: false,
    title: {
      text: `${cryptoName}`
    },
    axisX: {
      title: "TimeFrame"
    },
    axisY: {
      title: "Value(USD)"
    },
    data: [{
      type: "line",
      // dataPoints: memoizeGenerateRandomData(500)
      dataPoints: memoizeCryptoData()
    }]
  }

  if (currentData.length === 0) {
    // console.log(currentData, "in the null condi")
    return null;
  }
  else {
    // console.log(currentData, "in the not null condi")
    return (
      <div>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
        {/* <Button onClick={e => console.log("current Data rendered onClick of component button", currentData)}>Test</Button> */}
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
