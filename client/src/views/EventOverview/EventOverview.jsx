import React from "react";

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Grid,
  Box,
  // CardActions,
  Typography,
  // Divider,
  // IconButton
} from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: '0px 12px'
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

export default function EventOverview(props) {
  const classes = useStyles();
const today = new Date();
  return (
    <div >
      <Grid
        container
        style={{ marginRight: 1 }}
        spacing={1}
      >
        <Grid item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <Paper
            className={(classes.root)}
          >
            <div className={classes.content}>
              <Typography variant="h6">
                {props.event.event_name}
              </Typography>
              <Typography variant="body2">
                {props.event.event_description}
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography variant="subtitle2">
                Date
          </Typography>
              <div style={{ display: 'flex' }}>
                <EventIcon className={classes.icon} />
                <div className={classes.verticalAlign} >
                  <Typography variant="body2">
                    {props.event.event_start_date.slice(0, 16)} - {props.event.event_end_date.slice(0, 16)}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.content}>
              <Typography variant="subtitle2">
                Location
              </Typography>
              <div style={{ display: 'flex' }}>
                <LocationOnIcon className={classes.icon} />
                <div className={classes.verticalAlign}>
                  <Typography variant="body2">
                    {props.event.event_location}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.content}>
              <Typography variant="subtitle2">
                Status
             </Typography>
              <div style={{ display: 'flex' }}>
                <AdjustIcon className={classes.icon} />
                <div className={classes.verticalAlign}>
                  {
                    (props.event.cancel === "true") ? (
                      <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center', width: 110, color: 'black' }}>
                        <Typography variant="body2">Cancelled</Typography>
                      </Box>
                    ) : (
                        (today < new Date(props.event.event_start_date)) ? (
                          <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: 110, color: 'black' }}>
                            <Typography variant="body2">Planned</Typography>
                          </Box>
                        ) : (
                            (today < new Date(props.event.event_end_date)) ? (
                              <Box borderRadius={4} style={{ backgroundColor: 'green', textAlign: 'center', width: 110, color: 'white' }}>
                                <Typography variant="body2">Active</Typography>
                              </Box>
                            ) : (
                                <Box borderRadius={4} style={{ backgroundColor: 'blue', textAlign: 'center', width: 110, color: 'white' }}>
                                  <Typography variant="body2">Completed</Typography>
                                </Box>
                              )
                          ))}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid >
    </div>
  );
}