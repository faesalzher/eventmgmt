import React from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Box,
  // CardActions,
  Typography,
  // Divider,
  // IconButton
} from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';
import EventIcon from '@material-ui/icons/Event';

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

export default function ProjectOverview(props) {
  const classes = useStyles();
  const today = new Date();

  return (
    <Paper
      className={(classes.root)}
    >
      <div className={classes.content}>
        <Typography variant="h6">
          {props.project.project_name}
        </Typography>
        <Typography variant="body2">
          {props.project.project_description}
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
              {props.project.project_start_date.toString().slice(0, 16)}-
              {props.project.project_end_date.toString().slice(0, 16)}
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
              (props.project.cancel === "true") ? (
                <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center',  width: 110, color: 'black' }}>
                  <Typography variant="body2">Cancelled</Typography>
                </Box>
              ) : (
                  (today < new Date(props.project.project_start_date)) ? (
                    <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: 110, color: 'black' }}>
                      <Typography variant="body2">Planned</Typography>
                    </Box>
                  ) : (
                      (today < new Date(props.project.project_end_date)) ? (
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
  );
}
