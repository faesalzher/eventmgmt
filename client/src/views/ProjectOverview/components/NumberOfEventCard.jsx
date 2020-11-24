import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';

import { useQuery } from '@apollo/react-hooks';
import { EVENTS_QUERY } from 'gql';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const NumberOfEventCard = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [events, setEvents] = useState([]);

  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY,
    {
      variables: { project_id: props.project._id },
      // onCompleted: () => {
      //   setEvents(eventsData.events)
      // }
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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Number of Events
            </Typography>
            <Typography variant="h3">{events.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EventNoteIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

NumberOfEventCard.propTypes = {
  className: PropTypes.string
};

export default NumberOfEventCard;
