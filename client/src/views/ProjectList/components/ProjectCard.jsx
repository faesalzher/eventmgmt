import React, { useState, forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
// import SettingsIcon from '@material-ui/icons/Settings';
// import AddprojectsModal from '../AddProjectModal';
import DateRangeIcon from '@material-ui/icons/DateRange';
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
  iconDate: {
    fontSize: 12,
    margin: 4
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
  cancelled: {
    backgroundColor: theme.palette.error.main
  },
  planned: {
    backgroundColor: theme.palette.warning.main
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

const ProjectCard = (props) => {
  // const [elevate, setElevate] = useState(1);
  const { handleDelete, className, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();

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


  const refresh = () => {
    headOfProjectIdRefetch();
    headOfProjectNameRefetch();
  };

  const today = new Date();
  const start_date = new Date(props.project.project_start_date);
  const end_date = new Date(props.project.project_end_date);

  const plannedDays = Math.ceil((start_date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  const activeDays = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
  const completedDays = Math.ceil((today.getTime() - end_date.getTime()) / (1000 * 3600 * 24));
  const totalActiveDays = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24));

  const isToday = (someDate) => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

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
              image={props.project.picture === "null" ? image : props.project.picture}
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
                      " " + headOfProjectName.staff_name : " (Vacant}"
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
                  {
                    (props.project.cancel === "true") ? (
                      0
                    ) : ((today < new Date(props.project.project_start_date)) ? (
                      0
                    ) : (
                        (today < new Date(props.project.project_end_date)) ? (
                          Math.round(((activeDays) / (totalActiveDays+1)) * 100)
                        ) : (
                            (isToday(new Date(props.project.project_start_date)) && isToday(new Date(props.project.project_end_date))) ? (
                              0
                            ) : (
                                100
                              )
                          )
                      )
                      )
                  }% Completed
                </Typography>
                <Typography
                  className={classes.status}>
                  {
                    (props.project.cancel === "true") ? (
                      " "
                    ) : ((today < new Date(props.project.project_start_date)) ? (
                      (plannedDays) + " Days to go"
                    ) : (
                        (today < new Date(props.project.project_end_date)) ? (
                          "Days " + (activeDays) + " of " + (totalActiveDays + 1)
                        ) : (
                            (isToday(new Date(props.project.project_start_date)) && isToday(new Date(props.project.project_end_date))) ? (
                              "Days " + (activeDays) + " of " + (totalActiveDays + 1)
                            ) : (
                                (completedDays) + " Days ago"
                              )
                          )
                      )
                      )
                  }
                </Typography>
              </div>
              <div style={{ justifyContent: 'space-between' }}>
                <LinearProgress
                  className={classes.progress}
                  value={
                    (props.project.cancel === "true") ? (
                      0
                    ) : ((today < new Date(props.project.project_start_date)) ? (
                      0
                    ) : (
                        (today < new Date(props.project.project_end_date)) ? (
                          ((activeDays) / (totalActiveDays + 1)) * 100
                        ) : (
                            (isToday(new Date(props.project.project_start_date)) && isToday(new Date(props.project.project_end_date))) ? (
                              0
                            ) : (
                                100
                              )
                          )
                      )
                      )
                  }
                  variant="determinate"
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
          {
            (props.project.cancel === "true") ? (
              <Box borderRadius={4} className={[classes.cancelled, classes.boxStatus].join(" ")}>
                <Typography variant="subtitle2" className={classes.fontStatus}>Cancelled</Typography>
              </Box>
            ) : (
                (today < new Date(props.project.project_start_date)) ? (
                  <Box borderRadius={4} className={[classes.planned, classes.boxStatus].join(" ")}>
                    <Typography variant="subtitle2" className={[classes.fontStatus, classes.primaryColor].join(" ")}>Planned</Typography>
                  </Box>
                ) : (
                    (today < new Date(props.project.project_end_date) ||
                      isToday(new Date(props.project.project_start_date)) ||
                      isToday(new Date(props.project.project_end_date))) ? (
                        <Box borderRadius={4} className={[classes.active, classes.boxStatus].join(" ")}>
                          <Typography variant="subtitle2" className={classes.fontStatus}>Active</Typography>
                        </Box>
                      ) : (
                        <Box borderRadius={4} className={[classes.completed, classes.boxStatus].join(" ")}>
                          <Typography variant="subtitle2" className={classes.fontStatus}>Completed</Typography>
                        </Box>
                      )
                  )
              )
          }
          <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end' }}>
            <DateRangeIcon className={classes.iconDate} />
            <Typography className={classes.status}>
              {props.project.project_start_date.slice(4, 10)} - {props.project.project_end_date.slice(4, 15)}
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
