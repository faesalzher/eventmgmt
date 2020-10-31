import React, { forwardRef } from "react";
import { NavLink as RouterLink } from 'react-router-dom';

// import "./styles.css";
import {
  Divider,
  LinearProgress,
  Typography,
  ListItem,
  Grid,
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    height: 3,
  },
  barColorPrimary: {
    borderRadius: 20,
    backgroundColor: props => props.col,
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 14,
    margin: 2,
  },
  info: {
    fontWeight: 450,
    fontSize: 11,
    letterSpacing: '0.0000em'
  },
  iconbutton: {
    padding: 0
  },
}));

export default function Roadmap(props) {

  const shadowStyles = useSoftRiseShadowStyles();
  const classes = useStyles();
  return (
    <div className={clsx(shadowStyles.root)} style={{padding:'2px 0px'}}>
      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: props.roadmap.color, width: '1%' }} />
        <ListItem button style={{ padding: 0, display: 'flex', backgroundColor: 'white' }}
          component={CustomRouterLink}
          to={`/project/${props.project_id}/${props.event_id}/${props.roadmap._id}`}
        >
          <div style={{ padding: "10px 13px", width: '100%', display: 'flex' }}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                sm={8}
                xs={12}
              >
                <Typography variant="h5">
                  {props.roadmap.roadmap_name}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    <DateRangeIcon className={classes.icon} color="secondary"/>
                    <Typography className={classes.info} color="secondary">
                      {new Date(props.roadmap.start_date).toString().slice(0, 16)}
                      {" - "}
                      {new Date(props.roadmap.end_date).toString().slice(0, 16)}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid
              item
              sm={4}
              xs={12}
              style={{ justifyContent: 'center', width: 90, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{display:'flex', justifyContent:"space-between"}}>
                <Typography className={classes.info}>
                  15% Completed 
                  </Typography>
                  <Typography className={classes.info}>
                  0/0 Tasks
                  </Typography>
              </div>
              <ColorLinearProgress col={props.roadmap.color} 
              thickness={1} 
              style={{ backgroundColor: lighten(props.roadmap.color, 0.5), marginTop: 2 }} 
              variant="determinate" value={19} />
              {/* </div> */}
            </Grid>
            </Grid>
          </div>
        </ListItem>
      </div>
      <Divider />
    </div >
  );
}