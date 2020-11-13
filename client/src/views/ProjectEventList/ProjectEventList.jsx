import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  // Fade, 
  // Typography
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
import {
  EventCard,
  AddEventCard,
} from './components';

const PROJECT_QUERY = gql`
query project($project_id: String!){
  project(_id:$project_id) {
    _id
    project_start_date
    project_end_date
  }
}
`;

const EVENTSBYPROJECT_QUERY = gql`
query eventsByProject($project_id: String!){
  eventsByProject(project_id:$project_id) {
    _id
    event_name
    event_description
    event_location
    cancel
    event_start_date
    event_end_date
    picture
    project_id
  }
}
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  loading: {
    paddingTop: 100,
    textAlign: 'center',
  },
}));

const EventList = (props) => {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [project, setProject] = useState([]);

  const { loading, error, data, refetch } = useQuery(EVENTSBYPROJECT_QUERY,
    {
      variables: { project_id: props.project_id },
    });

  const { data: projectData } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: props.project_id },
      onCompleted: () => {
        setProject(projectData.project)
      }
    });

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (data) => { setEvents(data.eventsByProject) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);

  const refresh = () => {
    refetch();
  };

  const addEvent = useCallback(
    (e) => {
      setEvents([...events, e]);
    }, [events]
  );

  return (
    <div>
      {
        (loading) ? <div className={classes.loading}><CircularProgress /></div> :
          <Grid
            container
            spacing={2}
          >

            <AddEventCard addEvent={addEvent} project_id={props.project._id} project={project} />
            {
              events.slice().reverse().map((event, index) => {
                if (events.length === 0) {
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

export default React.memo(EventList);
