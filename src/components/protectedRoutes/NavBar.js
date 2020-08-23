import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Logout } from '../auth/Logout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Pocket Broker
          </Typography>
          <Logout />
      </Toolbar>
    </div>
  );
}
