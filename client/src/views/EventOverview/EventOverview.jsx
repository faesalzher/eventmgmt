import React from "react";

// import { useTheme } from '@material-ui/core/styles';
import {
  Grid,
  // useMediaQuery,
} from '@material-ui/core';

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import {
  // RoadmapList,
  EventDetails,
} from './components';

export default function EventOverview(props) {

  // const theme = useTheme();
  // const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div >
      <Grid
        container
        style={{marginRight:1}}
        spacing={1}
      >
        <Grid item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
          // style={{minHeight:280}}
        >
          <EventDetails />
        </Grid>
        {/* <Grid item
          lg={6}
          sm={6}
          xl={12}
          xs={12}
          style={{maxHeight:190}}
        >   
          <Sponsors />
        </Grid>
        <Grid item
          lg={6}
          sm={6}
          xl={12}
          xs={12}
        >
          <Guests />
        </Grid> */}
      </Grid >
    </div>
  );
}