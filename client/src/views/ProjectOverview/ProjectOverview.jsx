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
  NumberOfPersonInChargeCard,
  NumberOfCommitteeCard,
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
        lg={4}
        sm={4}
        xl={4}
        xs={12}
      >
        <NumberOfEventCard project={props.project} />
      </Grid>
      <Grid
        item
        lg={4}
        sm={4}
        xl={4}
        xs={12}
      >
        <NumberOfCommitteeCard personInCharges={props.personInCharges} />
      </Grid>
      <Grid
        item
        lg={4}
        sm={4}
        xl={4}
        xs={12}
      >
        <NumberOfPersonInChargeCard project={props.project} />
      </Grid>
    </Grid>

  );
}
