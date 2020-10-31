import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Divider,
  Typography,
} from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { StatusBox } from 'components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: '12px 12px'
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

export default function DetailOverview(props) {
  const classes = useStyles();

  return (
    <Paper className={(classes.root)}    >
      <div className={classes.content}>
        <Typography variant="h4">
          {props.event.event_name}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
      <Typography variant="subtitle2">
          Description
          </Typography>
        <Typography variant="body1">
          {props.event.event_description}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Location
          </Typography>
        <div style={{ display: 'flex' }}>
          <LocationOnIcon className={classes.icon} />
          <div className={classes.verticalAlign} >
            <Typography variant="body1">
            {props.event.event_location}
            </Typography>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Date
          </Typography>
        <div style={{ display: 'flex' }}>
          <EventIcon className={classes.icon} />
          <div className={classes.verticalAlign} >
            <Typography variant="body1">
              {props.event.event_start_date.toString().slice(0, 16)}
              {" - "}
              {props.event.event_end_date.toString().slice(0, 16)}
            </Typography>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Status
          </Typography>
        <div style={{ display: 'flex' }}>
          <AdjustIcon className={classes.icon} />
          <div className={classes.verticalAlign}>
            <StatusBox
              start_date={props.event.event_start_date}
              end_date={props.event.event_end_date}
              cancel={props.event.cancel}
            />
          </div>
        </div>
      </div>
    </Paper>
  );
}
