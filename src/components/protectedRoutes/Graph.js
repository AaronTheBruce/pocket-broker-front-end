import React, { Component, useState, useEffect, useCallback } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { url } from "../../url-config";
import Axios from "axios";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const coinGecko = "api.coingecko.com/api/v3";


export const Graph = (props) => {

  // sample data for demonstrative purposes (Temporary)
  const memoizeGenerateRandomData = useCallback(
    (noOfDps) => {
      var xVal = 1, yVal = 100;
      var dps = [];
      for (var i = 0; i < noOfDps; i++) {
        yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
        dps.push({ x: xVal, y: yVal });
        xVal++;
      }
      return dps;
    },
    [],
  );

  // states
  const {getUser, userId, authAxios} = useContext(PocketBrokerContext);
  const [cryptoName, setCryptoName] = useState("bitcoin");
  const [timeFrame, setTimeframe] = useState("day");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Unix Epoch TimeFrames in seconds
  const one_day_unix = 86400;
  const one_week_unix = 604800;
  const one_month_unix = 2629743;
  const one_year_unix = 31556926;
  // const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfTheYear = ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const unixToDate = (unix) => {
    // convert to milliseconds
    let date = new Date(unix * 1000);
    let month = monthsOfTheYear[date.getMonth()];
    // let day = daysOfTheWeek[date.getDay()];
    let year = date.getFullYear();
    let dateNum = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let newDate = `${year} ${month} ${dateNum} ${hours}:${minutes}:${seconds}`;
    return new Date(newDate);
  }

  const dateToUnix = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return Date.UTC(year, month, day, hours, minutes, seconds);
  }

  const getDayStart = () => {
    let today = new Date();
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0);
    return today;
  }

  const getTimeAgo = (timeframe) => {
    let now = new Date();
    now = dateToUnix(now);
    let start;
    switch(timeframe){
      case timeframe.toLowerCase() === "day":
        start = dateToUnix(getDayStart());
        break;
      case timeframe.toLowerCase() === "week":
        start = now - one_week_unix;
        break;
      case timeframe.toLowerCase() === "month":
        start = now - one_month_unix;
        break;
      case timeframe.toLowerCase() === "year":
        start = now - one_year_unix;
        break;
      default:
        return "Invalid timeframe";
    }
    return unixToDate(start);
  }

  const getDataSet = (crypto, timeframe,) => {
    let start_time = getTimeAgo(timeframe);
    let end_time = Date.now();
    const data = `${coinGecko}/coins/${crypto}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}`;
    if(!data){
      return "Data is Bad, check getDataSet"
    }
    // data = fetch(``);
    return data;
  }

  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: false,
    title: {
      text: `${cryptoName}`
    },
    data: [{
      type: "line",
      dataPoints: memoizeGenerateRandomData(500)
    }]
  }

  return (
    <div>
      <CanvasJSChart options={options}
      /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
