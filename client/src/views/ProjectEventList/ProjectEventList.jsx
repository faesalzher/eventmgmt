import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
   Grid, 
  // Fade, 
  // Typography
 } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
import {
  EventCard,
  AddEventCard,
} from './components';


const EVENTS_QUERY = gql`
{
  events{
    _id
    event_name
    status
    event_start_date
    event_end_date
  }
}
`;

const DELETE_EVENT = gql`
mutation deleteEvent ($_id: String!) {
  deleteEvent(_id:$_id){
    _id
  }
}
`;

// const mongoose = require('mongoose');

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

  const statusColor = [
    { id: '6', status: 'No Status', color: "white" },
    { id: '1', status: 'Planned', color: 'Yellow' },
    { id: '2', status: 'Active', color: '#6cba47' },
    { id: '3', status: 'Completed', color: '#3dc5d1' },
    { id: '4', status: 'On Hold', color: "#d8dce3" },
    { id: '5', status: 'Cancelled', color: "#d8dce3" },
  ]

  // const dt = [
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},
  //   {_id: mongoose.Types.ObjectId(),event_name:"aaaaaaaaaaaaaaaa", status: "Active", project_start_date:"11111aaaaaaaaaaaaaaa1111111111111", project_end_date:"11111aaaaaaaaaaaaaaa1111111111111",organization:"aaaa"},

  // ]

  const [events, setEvents] = useState([]);

  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY, {
    // onCompleted: () => { setEvents(data.events) }
  });

  useEffect(() => {
    refresh();
  });
  useEffect(() => {
    const onCompleted = (data) => { setEvents(data.events) };
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
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = e => {
    deleteEvent({ variables: { _id: e, } });
  }

  if (error) return <p>Error :(</p>;
  // console.log(props.project_id);
 
  return (
    <div>
      {
        (loading) ? <div className={classes.loading}><CircularProgress /></div> :
          <Grid
            container
            spacing={2}
          >

            <AddEventCard addEvent={addEvent} sc={statusColor} />
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
                      sc={statusColor}
                      handleDelete={handleDelete}
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
