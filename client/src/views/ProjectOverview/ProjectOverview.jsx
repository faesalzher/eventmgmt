import React from 'react';
import {
  Grid,
  // CardMedia,
  // CardActions,
  // Divider,
  // IconButton
} from '@material-ui/core';

import {
  PictureCard,
  NumberOfEventCard,
  NumberOfComiteeCard,
  NumberOfDivisionCard,
  DetailOverview
} from './components';


export default function ProjectOverview(props) {

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
        <DetailOverview project={props.project} project_id={props.project_id} />
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={12}
        xs={12}
      >
        <PictureCard project={props.project} />
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
            lg={4}
            sm={6}
            xl={6}
            xs={12}
          >
            <NumberOfEventCard project={props.project} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={6}
            xs={12}
          >
            <NumberOfDivisionCard divisions={props.divisions} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={6}
            xs={12}
          >
            <NumberOfComiteeCard project={props.project} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}
