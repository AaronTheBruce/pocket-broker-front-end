import React, { Component, useState, useCallback } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const coinGecko = "api.coingecko.com/api/v3";


export const Graph = (props) => {

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
  const [cryptoName, setCryptoName] = useState("bitcoin");
  const [timeFrame, setTimeframe] = useState("Day");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [currentDate, setCurrentDate] = useState("");



  const unixToDate = () => { }

  const dateToUnix = () => { }

  const generateGraph = (timeframe, crypto_name) => {

    setCurrentDate = new Date();

    if (timeframe.toLowerCase() === "day") {
      setStartDatetime()
    }
    // const data = `${coinGecko}/coins/${crypto_name}/market_chart/range?vs_currency=usd&from=${}&to=${}`

  }

  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Try Zooming and Panning"
    },
    data: [{
      type: "area",
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
