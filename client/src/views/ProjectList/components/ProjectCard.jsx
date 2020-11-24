import React, { useState, forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import { StatusBox, StatusProgressBar, Percentage, StatusProgressDays } from 'components';
// import SettingsIcon from '@material-ui/icons/Settings';
// import AddprojectsModal from '../AddProjectModal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useQuery } from '@apollo/react-hooks';
import image from "assets/default-placeholder.png";

// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  // Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from '@material-ui/core';
// import { findByLabelText } from '@testing-library/react';
// import LoadingOverlay from 'react-loading-overlay';
import { NavLink as RouterLink } from 'react-router-dom';
import { STAFF_QUERY, PERSON_IN_CHARGE_BY_PROJECT_AND_POSITION } from 'gql';

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
  const { className,handleDelete, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();

  const [headOfProjectId, setHeadOfProjectId] = useState([{ staff_id: '0' }]);
  const [headOfProjectName, setHeadOfProjectName] = useState([]);

  const { loading, error, data: headOfProjectIdData, refetch: headOfProjectIdRefetch } = useQuery(PERSON_IN_CHARGE_BY_PROJECT_AND_POSITION,
    {
      variables: { project_id: props.project._id, position_id: '1' },
    });

  useEffect(() => {
    refresh()
  });

  useEffect(() => {
    const onCompleted = (data) => {
      if (headOfProjectIdData.person_in_charges_by_project_and_position.length === 0) {
        return setHeadOfProjectId([{ staff_id: '0' }])
      } else {
        return setHeadOfProjectId(data.person_in_charges_by_project_and_position)
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

  const { data: headOfProjectNameData, refetch: headOfProjectNameRefetch } = useQuery(STAFF_QUERY,
    {
      variables: { staff_id: headOfProjectId[0].staff_id },
      // onCompleted: () => { setHeadOfProjectName(headOfProjectNameData.staff) }
    });

  useEffect(() => {
    const onCompleted = (data) => {
      if (data === undefined) {
        return
      } else {
        return setHeadOfProjectName(data.staff)
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

  const start_date = new Date(props.project.project_start_date);
  const end_date = new Date(props.project.project_end_date);
  const sameDays = (start_date.getDate() === end_date.getDate() &&
    start_date.getMonth() === end_date.getMonth() &&
    start_date.getFullYear() === end_date.getFullYear()
  )

  return (
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
            image={props.project.picture === " " ? image : props.project.picture}
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
                <Typography variant="h5" >
                  {props.project.project_name}
                </Typography>
              </div>
            </div>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <Percentage
                  start_date={props.project.project_start_date}
                  end_date={props.project.project_end_date}
                />
                <Typography
                  className={classes.status} style={{ display: 'flex' }}>
                  % Completed
                </Typography>
              </div>
              <StatusProgressDays
                start_date={props.project.project_start_date}
                end_date={props.project.project_end_date}
              />
            </div>
            <div style={{ justifyContent: 'space-between' }}>
              <StatusProgressBar
                start_date={props.project.project_start_date}
                end_date={props.project.project_end_date}
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
          start_date={props.project.project_start_date}
          end_date={props.project.project_end_date}
        />
        <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end' }}>
          <DateRangeIcon className={classes.iconDate} />
          {
            (sameDays) ?
              <Typography className={classes.status}>{props.project.project_start_date.slice(4, 15)}</Typography>
              :
              <Typography className={classes.status}>
                {props.project.project_start_date.slice(4, 10)} - {props.project.project_end_date.slice(4, 15)}
              </Typography>
          }
        </div>
      </CardActions>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string
};

export default ProjectCard;
