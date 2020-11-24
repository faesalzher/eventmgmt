import React, { useState, useEffect } from 'react';
import {
  Grid,
  // CardMedia,
  // CardActions,
  // Divider,
  // IconButton
} from '@material-ui/core';

import { useQuery } from '@apollo/react-hooks';

import {
  PictureCard,
  ExternalCard,
  DetailOverview
} from './components';

import { EXTERNALS_QUERY } from 'gql';

export default function EventOverview(props) {
  const [externals, setExternals] = useState([]);
  const { loading: externalsLoading, error: externalsError, data: externalsData, refetch: externalsRefetch } = useQuery(EXTERNALS_QUERY,
    {
      variables: { event_id: props.event._id },
    }
  );

  useEffect(() => {
    const onCompleted = (data) => {
      if (data !== undefined)
        setExternals(data.externals)
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !externalsLoading && !externalsError) {
        onCompleted(externalsData);
      } else if (onError && !externalsLoading && externalsError) {
        onError(externalsError);
      }
    }
  }, [externalsLoading, externalsData, externalsError]);


  useEffect(() => {
    refresh()
  });

  const refresh = () => {
    externalsRefetch();
  };

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        lg={6}
        md={6}
        xl={12}
        xs={12}
      >
        <DetailOverview event={props.event} />
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={12}
        xs={12}
      >
        <PictureCard event={props.event} />
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            lg={3}
            sm={3}
            xl={6}
            xs={12}
          >
            <ExternalCard type="Sponsor" externals={externals} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={3}
            xl={6}
            xs={12}
          >
            <ExternalCard type="Volunteer" externals={externals} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={3}
            xl={6}
            xs={12}
          >
            <ExternalCard type="Guest" externals={externals} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={3}
            xl={6}
            xs={12}
          >
            <ExternalCard type="Media Partner" externals={externals} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}
