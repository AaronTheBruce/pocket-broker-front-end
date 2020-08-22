import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tabs, Paper, Tab } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export const TimeSelectors = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.timeHandler(event.currentTarget.id);
  };
  return (
    <Typography component={'span'} variant={'body2'} className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="timeframe selectors"
          centered
        >
          <Tab id="day" label="Day" />
          <Tab id="week" label="Week" />
          <Tab id="month" label="Month" />
          <Tab id="year" label="Year" />
        </Tabs>
      </Paper>
    </Typography>
  )

}
