import React from "react";

import { useTheme } from '@material-ui/core/styles';
import {
  Grid,
  useMediaQuery,
} from '@material-ui/core';

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import {
  RoadmapList,
  EventDetails,
} from './components';

export default function EventOverview(props) {

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));


  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item
        lg={8}
        sm={8}
        xl={12}
        xs={12}
        >
        <EventDetails/>
      </Grid>
      <Grid
        item
        lg={4}
        sm={4}
        xl={12}
        xs={12}>
        <RoadmapList
          project_id={props.project_id}
          event_id={props.event_id}
          xs={xs}
          handleSaveButton={props.handleSaveButton}
          roadmaps={props.roadmaps} />
      </Grid>
    </Grid >
  );
}