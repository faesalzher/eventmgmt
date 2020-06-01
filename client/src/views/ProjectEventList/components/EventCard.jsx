import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveIcon from '@material-ui/icons/Remove';
import image from 'assets/project.png'

import {
  // Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Box,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';

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
  const today = new Date();
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
        elevation={0}
      >
        <Tooltip title={"See Details of ".concat(props.event.event_name)}>
          <CardActionArea className={classes.root}
            component={CustomRouterLink}
            to={`/project/${props.project._id}/${props.event._id}`}
          >
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.root} style={{ paddingTop: 5 }} >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                className={classes.root}
              >
                <div style={{ width: 'fit-content' }} >
                  <Typography variant="h6" className={classes.content}>
                    {props.event.event_name}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    variant="body2"
                  >
                    <LocationOnIcon className={classes.icon} />
                    {" "+props.event.event_location}
                  </Typography>
                </div>
              </div>
              <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <Typography
                  className={classes.status}>
                  0% Completed
                       </Typography>
                <Typography
                  className={classes.status}>
                  0/0 Tasks
                       </Typography>
              </div>
              <div style={{ justifyContent: 'space-between' }}>
                <LinearProgress
                  className={classes.progress}
                  value={75.5}
                  variant="determinate"
                />
              </div>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardActions style={{
          paddingLeft: 16,
          paddingRight: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {
            (props.event.cancel === "true") ? (
              <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center', width: 110, color: 'black' }}>
                <Typography style={{ fontSize: 10 }}>Cancelled</Typography>
              </Box>
            ) : (
                (today < new Date(props.event.event_start_date)) ? (
                  <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: 110, height: 16, color: 'black' }}>
                    <Typography style={{ fontSize: 10 }}>Planned</Typography>
                  </Box>
                ) : (
                    (today < new Date(props.event.event_end_date)) ? (
                      <Box borderRadius={4} style={{ backgroundColor: 'green', textAlign: 'center', width: 110, height: 16, color: 'white' }}>
                        <Typography style={{ fontSize: 10 }}>Active</Typography>
                      </Box>
                    ) : (
                        <Box borderRadius={4} style={{ backgroundColor: 'blue', textAlign: 'center', width: 110, height: 16, color: 'white' }}>
                          <Typography style={{ fontSize: 10 }}>Completed</Typography>
                        </Box>
                      )
                  ))}
          <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', color: 'blue' }}>
            <DateRangeIcon className={classes.icon} />
            <Typography className={classes.status}>
              {props.event.event_start_date.slice(4, 10)}
            </Typography>
            <RemoveIcon className={classes.icon} />
            <Typography className={classes.status}>
              {props.event.event_end_date.slice(4, 15)}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Grid >
  );
};


export default React.memo(EventCard);
