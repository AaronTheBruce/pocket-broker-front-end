import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import { Graph } from "./Graph.js";
import { WatchList } from "./WatchListItems" // swapped out old component for development
import { TimeSelectors } from "./Time";
import { NavBar } from "./NavBar";
import { Stats } from "./Stats";
import { Events } from "./Events.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  controlPanel: {
    height: "345px",
  },
}));

export const Home = () => {
  const classes = useStyles();
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
              <WatchList
                cryptoHandler={cryptoHandler}
                cryptoName={cryptoName}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper}>
              <Stats
                averagePrice={averagePrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceChange={priceChange}
                percentChange={percentChange}
              />
            </Paper>
            <br />  {/* Cheap way to create space */}
            <Paper className={classes.paper}>
              <Events />
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Paper className={classes.controlPanel}>
              Notif
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
