import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, CssBaseline, Paper } from "@material-ui/core";
import { Graph } from "./Graph.js";
import { WatchList } from "./WatchListItems"
import { TimeSelectors } from "./Time";
import { NavBar } from "./NavBar";
import { Stats } from "./Stats";

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
  const [cryptoName, setCryptoName] = useState("bitcoin");
  const [timeFrame, setTimeFrame] = useState("day");
  const [averagePrice, setAveragePrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [percentChange, setPercentChange] = useState(0)


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
  const percentChangeHandler = (percent) => {
    setPercentChange(percent);
  }

  return (
    <React.Fragment >
      <CssBaseline />
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
              style={{ height: '500px', }}>
              <Graph
                cryptoName={cryptoName}
                timeFrame={timeFrame}
                averagePriceHandler={averagePriceHandler}
                maxPriceHandler={maxPriceHandler}
                minPriceHandler={minPriceHandler}
                percentChangeHandler={percentChangeHandler}
              />
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
                averagePrice={averagePrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                percentChange={percentChange}
              />
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
                percentChange={percentChange}
              />
            </Paper>
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid> */}
        </Grid>
        {/* <Button onClick={e => console.log(timeFrame)}>Test</Button> */}
      </Container>
    </React.Fragment>
  )
}
