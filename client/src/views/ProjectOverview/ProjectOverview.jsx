import React from 'react';
import {
  Grid,
  // CardActions,
  // Divider,
  // IconButton
} from '@material-ui/core';

import {
  NumberOfEventCard,
  NumberOfComiteeCard,
  NumberOfDivisionCard,
  DetailOverview
} from './components';


export default function ProjectOverview(props) {

  return (
    <Grid
      container
      spacing={4}
    >
      <Grid
        item
        lg={6}
        md={6}
        xl={4}
        xs={12}
      >
        <DetailOverview project={props.project}/>
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={4}
        xs={12}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={4}
            xs={12}
          >
            <NumberOfEventCard project={props.project} />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={4}
            xs={12}
          >
            <NumberOfDivisionCard divisions={props.divisions} />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={4}
            xs={12}
          >
            <NumberOfComiteeCard project={props.project} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}
