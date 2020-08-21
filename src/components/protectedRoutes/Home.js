import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, CssBaseline, Paper } from "@material-ui/core";
import { Graph } from "./Graph.js";
import { WatchList } from "./WatchListItems"
import {TimeSelectors} from "./Time";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  const cryptoHandler = (crypto) => {
    setCryptoName(crypto);
  }

  const timeHandler = (timeframe) => {
    setTimeFrame(timeframe);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>Dia Duit! Failte chun Pocket Broker!</h1>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper
              className={classes.paper}
              style={{ height: '500px', }}>
              <Graph cryptoName={cryptoName} timeFrame={timeFrame} />
              <TimeSelectors timeHandler={timeHandler} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} style={{ height: '500px' }}><WatchList cryptoHandler={cryptoHandler} cryptoName={cryptoName} /></Paper>
          </Grid>
          <Grid item xs={6} sm={1}>
            {/* <IconButton className="fa fa-plus-circle">Notif</IconButton> */}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper className={classes.paper}>Event Config</Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper className={classes.paper}>Stats</Paper>
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
