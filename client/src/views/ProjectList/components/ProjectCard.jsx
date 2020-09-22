import React, { useState, forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
// import SettingsIcon from '@material-ui/icons/Settings';
// import AddprojectsModal from '../AddProjectModal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveIcon from '@material-ui/icons/Remove';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import image from 'assets/project.png'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  // Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  // IconButton,
  Tooltip,
  LinearProgress,
  // Popover,
  // MenuItem,
  // Paper,
  Box,
  // MenuList,
  // ClickAwayListener,
} from '@material-ui/core';
// import { findByLabelText } from '@testing-library/react';
// import LoadingOverlay from 'react-loading-overlay';
import { NavLink as RouterLink } from 'react-router-dom';

const HEADOFPROJECT_QUERY = gql`
  query comiteesByHeadProject($project_id: String!,$position_id: String!){
     comiteesByHeadProject(project_id:$project_id,position_id:$position_id) {
      staff_id
      }
  }
`;

const STAFFBYID_QUERY = gql`
query staffById($_id: String!){
    staffById(_id:$_id) {
      _id
      staff_name
      phone_number
      email
    }
  }
`;

const EVENTSBYPROJECT_QUERY = gql`
query eventsByProject($project_id: String!){
  eventsByProject(project_id:$project_id) {
    _id
    event_name
    event_description
    event_location
    cancel
    event_start_date
    event_end_date
    picture
    project_id
  }
}
`;

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: 80,
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

const ProjectCard = (props) => {
  // const [elevate, setElevate] = useState(1);
  const { handleDelete, className, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();
  const today = new Date();

  const [events, setEvents] = useState([]);
  const [headOfProjectId, setHeadOfProjectId] = useState([{ staff_id: '0' }]);
  const [headOfProjectName, setHeadOfProjectName] = useState([]);

  const { loading, error, data: headOfProjectIdData, refetch: headOfProjectIdRefetch } = useQuery(HEADOFPROJECT_QUERY,
    {
      variables: { project_id: props.project._id, position_id: '1' },
    });

  useEffect(() => {
    refresh()
  });

  useEffect(() => {
    const onCompleted = (data) => {
      if (headOfProjectIdData.comiteesByHeadProject.length === 0) {
        return setHeadOfProjectId([{ staff_id: '0' }])
      } else {
        return setHeadOfProjectId(data.comiteesByHeadProject)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(headOfProjectIdData);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, headOfProjectIdData, error]);

  const { data: headOfProjectNameData, refetch: headOfProjectNameRefetch } = useQuery(STAFFBYID_QUERY,
    {
      variables: { _id: headOfProjectId[0].staff_id },
      // onCompleted: () => { setHeadOfProjectName(headOfProjectNameData.staffById) }
    });

  useEffect(() => {
    const onCompleted = (data) => {
      if (data === undefined) {
        return
      } else {
        return setHeadOfProjectName(data.staffById)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(headOfProjectNameData);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, headOfProjectNameData, error]);

  const { loading: eventLoading, error: eventError, data: eventData, refetch: eventRefetch } = useQuery(EVENTSBYPROJECT_QUERY,
    {
      variables: { project_id: props.project._id },
    });

  useEffect(() => {
    const onCompleted = (data) => { setEvents(data.eventsByProject) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !eventLoading && !eventError) {
        onCompleted(eventData);
      } else if (onError && !eventLoading && eventError) {
        onError(eventError);
      }
    }
  }, [eventLoading, eventData, eventError]);

  const refresh = () => {
    headOfProjectIdRefetch();
    headOfProjectNameRefetch();
    eventRefetch();
  };
// console.log(events.length)
  // const timer = React.useRef();

  // React.useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

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
        <Tooltip title={"See Details of ".concat(props.project.project_name)}>
          <CardActionArea className={classes.root}
            component={CustomRouterLink}
            to={`/project/${props.project._id}`}
          >
            <CardMedia
              className={classes.media}
              image={props.project.picture==="null"?image:props.project.picture}
              title={props.project.project_name}
            />
            <CardContent className={classes.root} style={{ paddingTop: 5 }} >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                className={classes.root}
              >
                <div style={{ width: 'fit-content' }} >
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    // gutterBottom
                    variant="body2"
                  >
                    Head Of Project -
                          {(headOfProjectName !== null) ?
                      " " + headOfProjectName.staff_name : ""
                    }

                  </Typography>
                  <Typography variant="h6" className={classes.content}>
                    {props.project.project_name}
                  </Typography>
                </div>
              </div>
              <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                <Typography
                  className={classes.status}>
                  0% Events Completed
                </Typography>
                <Typography
                  className={classes.status}>
                  {events.length} Events Total
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
            (props.project.cancel === "true") ? (
              <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center', width: 110, color: 'black' }}>
                <Typography style={{ fontSize: 10 }}>Cancelled</Typography>
              </Box>
            ) : (
                (today < new Date(props.project.project_start_date)) ? (
                  <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: 110, height: 16, color: 'black' }}>
                    <Typography style={{ fontSize: 10 }}>Planned</Typography>
                  </Box>
                ) : (
                    (today < new Date(props.project.project_end_date)) ? (
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
              {props.project.project_start_date.slice(4, 10)}
            </Typography>
            <RemoveIcon className={classes.icon} />
            <Typography className={classes.status}>
              {props.project.project_end_date.slice(4, 15)}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Grid >
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string
};

export default ProjectCard;
