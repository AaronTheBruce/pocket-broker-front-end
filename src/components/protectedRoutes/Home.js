import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import { Graph } from "./Graph.js";
import { WatchList } from "./NewWatchListItems"
import { TimeSelectors } from "./Time";
import { NavBar } from "./NavBar";
import { Stats } from "./Stats";
import fetch from "node-fetch";
const coinGecko = "https://api.coingecko.com/api/v3";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export const Home = () => {
  const classes = useStyles();
  let [cryptoList, setCryptoList] = useState(null);
  let [cryptoName, setCryptoName] = useState("bitcoin");
  let [timeFrame, setTimeFrame] = useState("day");
  let [averagePrice, setAveragePrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(0);
  let [minPrice, setMinPrice] = useState(0);
  let [priceChange, setPriceChange] = useState(0);
  let [percentChange, setPercentChange] = useState(0);


  const cryptoHandler = (crypto) => {
    setCryptoName(crypto);
  }
  const timeHandler = (timeframe) => {
    setTimeFrame(timeframe);
  }
  const averagePriceHandler = (average) => {
    setAveragePrice(average);
  }
  const maxPriceHandler = (max) => {
    setMaxPrice(max);
  }
  const minPriceHandler = (min) => {
    setMinPrice(min);
  }
  const priceChangeHandler = (priceChange) => {
    setPriceChange(priceChange);
  }
  const percentChangeHandler = (percent) => {
    setPercentChange(percent);
  }

  const getCryptos = async () => {
    const data = await fetch(`${coinGecko}/coins/list`)
    const res = await data.json();
    setCryptoList(res);
  }

  useEffect(() => {
    if(!cryptoList){
      (() => getCryptos())()  // We get the data in an array cryptos[i].id/symbol/name
    }
  }, [cryptoList])

  return (
    <React.Fragment >
      <CssBaseline />
      <div style={{ margin: '30px' }} />
      <Container fixed component="div" className={classes.root} style={{ height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid container >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NavBar />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper
              className={classes.paper}
              style={{ height: '500px' }}>
              <Graph
                cryptoName={cryptoName}
                timeFrame={timeFrame}
                cryptoHandler={cryptoHandler}
                averagePriceHandler={averagePriceHandler}
                maxPriceHandler={maxPriceHandler}
                minPriceHandler={minPriceHandler}
                priceChangeHandler={priceChangeHandler}
                percentChangeHandler={percentChangeHandler}
              />
              <Typography variant="caption" align="right" display="block" gutterBottom>
                Powered by CoinGecko API
              </Typography>
              <TimeSelectors
                timeHandler={timeHandler}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} style={{ height: '500px' }}>
              {
                cryptoList?
                <WatchList
                cryptoList={cryptoList}
                cryptoHandler={cryptoHandler}
                cryptoName={cryptoName}
                />
                :
                <div>...Loading</div>
              }
            </Paper>
          </Grid>
          {/* <Grid item xs={6} sm={1}>
            <IconButton className="fa fa-plus-circle">Notif</IconButton>
          </Grid> */}
          {/* <Grid item xs={6} sm={4}>
            <Paper className={classes.paper}>Event Config</Paper>
          </Grid> */}
          <Grid item xs={12} sm={9}>
            <Paper
              className={classes.paper}
            >
              <Stats
                averagePrice={averagePrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceChange={priceChange}
                percentChange={percentChange}
              />
            </Paper>
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <Paper
              className={classes.paper}
              style={{height: '142px'}}
            >xs=6 sm=3
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
