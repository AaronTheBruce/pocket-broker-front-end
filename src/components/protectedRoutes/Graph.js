import React, { useState, useEffect, useCallback } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
// import { PocketBrokerContext } from "../../context/PocketBrokerContext";
import fetch from "node-fetch";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const coinGecko = "https://api.coingecko.com/api/v3";
// const fetch = require("node-fetch");
// api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}/

export const Graph = (props) => {
  // states
  // const { getUser, userId, authAxios } = useContext(PocketBrokerContext);
  // const [cryptoName, setCryptoName] = useState(props.cryptoName);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  // Unix Epoch TimeFrames in seconds
  const one_hour_unix = 3600;
  const one_week_unix = 604800;
  const one_month_unix = 2629743;
  const one_year_unix = 31556926;
  // const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfTheYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Returns date from unix in seconds
  const unixToDate = (unix) => {
    // converts to eastern standard time for
    unix += (one_hour_unix * 4);
    // converts to milliseconds
    return new Date(unix * 1000);
  }

  // returns unix as seconds
  const dateToUnix = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // converts unix to seconds
    return Date.UTC(year, month, day, hours, minutes, seconds) / 1000;
  }

  // returns today's date with the hours, minutes, seconds, and millisec zeroed out
  const getDayStartDateTime = () => {
    let today = new Date();
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0);
    return today;
  }


  // returns in local time
  const getUnixTimeAgo = () => {
    let end = new Date();
    end = dateToUnix(end);
    let start;
    switch (props.timeFrame.toLowerCase().trim()) {
      case "day":
        start = dateToUnix(getDayStartDateTime());
        break;
      case "week":
        start = end - one_week_unix;
        break;
      case "month":
        start = end - one_month_unix;
        break;
      case "year":
        start = end - one_year_unix;
        break;
      default:
        return "Invalid timeframe"
    }
    let modifiedStart = unixToDate(start)
    // convert back to unix
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
      let start_time = getUnixTimeAgo(); // 1597867200
      let end_time = dateToUnix(new Date()); // 1597928927
      const api = `${coinGecko}/coins/${props.cryptoName}/market_chart/range?vs_currency=usd&from=${start_time}&to=${end_time}/`;
      let data = await fetch(api);
      let json = await data.json();
      setCurrentData(json.prices);

      // establish local min/max values to control the graph scale
      let min = json.prices[0][1];
      let max = json.prices[1][1];
      console.log(Math.floor(json.prices[0][0] / 1000));
      json.prices.forEach(price => {
        if (price[1] < min) {
          min = price[1];
        }
        if (price[1] > max) {
          max = price[1];
        }
      });
      setMinValue(min);
      setMaxValue(max);
    })();
  }, [props.cryptoName, props.timeFrame]);

  // get the percent change between 2 numbers
  // const getPercentChange = (val1, val2) => {
  //   if (val1 === null || val2 === null) return 0;

  // }

  const memoizeCryptoData = useCallback(
    () => {
      var dps = [];
      currentData.forEach(item => {
        let date = unixToDate(Math.floor(item[0] / 1000));
        let dataDate = `${monthsOfTheYear[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        let price = item[1].toFixed(2);
        dps.push({ x: date, y: Number(price), label: dataDate });
      });

      return dps;
    },
    [currentData],
  );

  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: `${props.cryptoName}`
    },
    axisX: {
      title: "TimeFrame"
    },
    axisY: {
      title: "Value(USD)",
      viewportMaximum: maxValue,
      viewportMinimum: minValue,
    },
    data: [{
      type: "line",
      // dataPoints: memoizeGenerateRandomData(500)
      dataPoints: memoizeCryptoData()
    }]
  }

  if (currentData.length === 0) {
    return null;
  }
  else {
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
