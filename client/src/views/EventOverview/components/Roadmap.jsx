import React,{forwardRef} from "react";
import { NavLink as RouterLink } from 'react-router-dom';

// import "./styles.css";
import {
  Divider,
  LinearProgress,
  Typography,
  ListItem,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
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
    fontSize: 10,
    marginTop: 2,
    color: 'blue'
  },
  info: {
    color: 'blue',
    fontWeight: 440,
    fontSize: 10,
    letterSpacing: '0.0000em'
  },
  iconbutton: {
    padding: 0
  },
}));

export default function Roadmap(props) {

  const shadowStyles = useSoftRiseShadowStyles();
  const classes = useStyles();
  console.log(props.project_id,props.event_id)
  return (
      <div className={clsx(shadowStyles.root)}>
        <div style={{ display: 'flex' }}>
          <div style={{ backgroundColor: props.roadmap.color, width: '2%' }} />
          <ListItem button style={{ padding: 0, display: 'flex', backgroundColor: 'white' }}
            component={CustomRouterLink}
            to={`/project/${props.project_id}/${props.event_id}/${props.roadmap._id}`}
          >
            <div style={{ padding: "5px 13px", width: '100%' }}>
              <Typography variant="subtitle2">
                {props.roadmap.roadmap_name}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <DateRangeIcon className={classes.icon} />
                  <Typography className={classes.info}>
                    {new Date(props.roadmap.start_date).toString().slice(0, 16)}
                  </Typography>
                  <RemoveIcon className={classes.icon} />
                  <Typography className={classes.info}>
                    {new Date(props.roadmap.end_date).toString().slice(0, 16)}
                  </Typography>
                </div>
                <div>
                  <Typography className={classes.info} style={{ color: 'black' }}>
                    Completed 15 %
                  </Typography>
                </div>
              </div>
              <ColorLinearProgress col={props.roadmap.color} thickness={1} style={{ backgroundColor: lighten(props.roadmap.color, 0.5), marginTop: 2 }} variant="determinate" value={19} />
            </div>
          </ListItem>
        </div>
        <Divider />
      </div>
  );
}