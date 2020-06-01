import React from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  // CardContent,
  // CardActions,
  // Typography,
  // Divider,
  // IconButton
} from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: "4px 0px"
  },
  image: {
    height: 48,
    width: 48
  },
  icon: {
    fontSize: 20,
    marginRight: 5
  },
  actions: {
    justifyContent: 'flex-end'
  },
  verticalAlign: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  }
}));

export default function Guests(props) {
  const classes = useStyles();

  return (
    <Paper
      className={(classes.root)}
    >
        guests
    </Paper>
  );
}
