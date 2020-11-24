import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  // Fade, 
  // Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
import {
  EventCard,
  AddEventCard,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  loading: {
    paddingTop: 100,
    textAlign: 'center',
  },
}));

export default function ProjectEventList(props) {
  const classes = useStyles();

  return (
    <div>
      {
        (props.loading) ? <div className={classes.loading}><CircularProgress /></div> :
          <Grid
            container
            spacing={2}
          >

            {
              props.project_personInCharge.position_id === "1" ||
                props.project_personInCharge.position_id === "2" ||
                props.project_personInCharge.position_id === "3" ||
                props.decodedToken.user_type === "organization" ?
                <AddEventCard
                  handleSaveEventButton={props.handleSaveEventButton}
                  project={props.project} />
                :
                <></>
            }
            {
              props.events.slice().reverse().map((event, index) => {
                if (props.events.length === 0) {
                  return (
                    <div className={classes.loading}><CircularProgress /></div>
                  )
                } else {
                  return (
                    <EventCard
                      project={props.project}
                      key={event._id}
                      event={event}
                    />
                  )
                }
              })
            }
          </Grid>
      }
    </div>
  );
};

