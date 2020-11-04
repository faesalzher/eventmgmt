import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import DateRangeIcon from '@material-ui/icons/DateRange';
import image from "assets/default-placeholder.png";

import {
  Avatar,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Tooltip,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import { StatusBox, StatusProgressBar, Percentage, StatusProgressDays } from 'components';

import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: 30,
    paddingBottom: 1
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 15
  },
  title: {
    fontWeight: 600,
    fontSize: 11
  },
  icon: {
    fontSize: 12,
  },
  iconDate: {
    fontSize: 12,
    margin: 4,
  },
  status: {
    fontWeight: 450,
    fontSize: 11,
    letterSpacing: '0.0000em'
  },
  button: {
    borderRadius: 0,
    border: '1px solid rgba(143, 143, 143, 0.23)',
    color: 'black',
    padding: 0,
  },
  media: {
    height: 110,
  },
  avatar: {
    marginRight: 10,
    height: 70,
    width: 70,
  },
  verticalCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  cancelled: {
    backgroundColor: theme.palette.error.main
  },
  planned: {
    backgroundColor: theme.palette.warning.main,
  },
  completed: {
    backgroundColor: theme.palette.success.main,
    color: 'white'
  },
  active: {
    backgroundColor: theme.palette.info.main
  },
  boxStatus: {
    textAlign: 'center',
    width: 110,
    height: 17,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  fontStatus: {
    fontSize: 11,
    color: 'white'
  },
  primaryColor: {
    color: theme.palette.primary.main
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const EventCard = (props) => {
  // const [elevate, setElevate] = useState(1);
  const { handleDelete, className, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();
  const start_date = new Date(props.event.event_start_date);
  const end_date = new Date(props.event.event_end_date);

  // To calculate the time difference of two dates 
  const timeDifference = end_date.getTime() - start_date.getTime();

  // To calculate the no. of days between two dates 
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  const sameDays = (start_date.getDate() === end_date.getDate() &&
    start_date.getMonth() === end_date.getMonth() &&
    start_date.getFullYear() === end_date.getFullYear()
  )

  console.log(sameDays)
  return (
    <Grid
      item
      lg={3}
      sm={6}
      xl={3}
      xs={12}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className, shadowStyles.root)}
        elevation={1}
      >
        <Tooltip title={"See Details of ".concat(props.event.event_name)}>
          <CardActionArea className={classes.root}
            component={CustomRouterLink}
            to={`/project/${props.project._id}/${props.event._id}`}
          >
            <CardContent className={classes.root} >
              <div style={{ display: 'flex' }}>
                <Avatar
                  className={classes.avatar}
                  src={props.event.picture === " " ? image : props.event.picture}
                />
                <div className={[classes.root, classes.verticalCenter].join(" ")} style={{ justifyContent: 'end' }}>
                  <div style={{ width: 'fit-content' }} >
                    <Typography variant="h6" className={classes.content}>
                      {props.event.event_name}
                    </Typography>
                    <div style={{ display: 'flex' }}>
                      <LocationOnIcon className={classes.icon} style={{ marginTop: 2, marginRight: 2 }} />
                      <div className={classes.verticalCenter}>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          variant="body2"
                        >
                          {" " + props.event.event_location}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Typography style={{ fontWeight: 700, fontSize: 11, margin: '0px 3px' }}>
                      {daysDifference + 1}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" className={[classes.title, classes.verticalCenter].join(" ")}>
                      Days Event
                        </Typography>
                  </div>
                </div>
              </div>
              <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <Percentage
                    cancel={props.event.cancel}
                    start_date={props.event.event_start_date}
                    end_date={props.event.event_end_date}
                  />
                  <Typography
                    className={classes.status} style={{ display: 'flex' }}>
                    % Completed
                </Typography>
                </div>
                <StatusProgressDays
                  cancel={props.event.cancel}
                  start_date={props.event.event_start_date}
                  end_date={props.event.event_end_date}
                />
              </div>
              <div style={{ justifyContent: 'space-between' }}>
                <StatusProgressBar
                  cancel={props.event.cancel}
                  start_date={props.event.event_start_date}
                  end_date={props.event.event_end_date}
                />
              </div>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardActions style={{
          paddingLeft: 16,
          paddingRight: 12,
          paddingTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <StatusBox
            start_date={props.event.event_start_date}
            end_date={props.event.event_end_date}
            cancel={props.event.cancel}
          />
          <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end' }}>
            <DateRangeIcon className={classes.iconDate} />
            {
              (sameDays) ?
                <Typography className={classes.status}>{props.event.event_start_date.slice(4, 15)}</Typography>
                :
                <Typography className={classes.status}>
                  {props.event.event_start_date.slice(4, 10)} - {props.event.event_end_date.slice(4, 15)}
                </Typography>
            }
          </div>
        </CardActions>
      </Card>
    </Grid >
  );
};


export default React.memo(EventCard);
