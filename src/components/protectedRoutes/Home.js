import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container, CssBaseline, Paper, IconButton } from "@material-ui/core";
import Graph from './Graph';

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
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} style={{ height: '500px',  }}><Graph /></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} style={{ height: '500px' }}>Watch List</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <IconButton className="fa fa-plus-circle">Notification</IconButton>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Event Config</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Stats</Paper>
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
