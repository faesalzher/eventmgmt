import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Divider,
  Typography,
  // Divider,
  // IconButton
} from '@material-ui/core';

import { useQuery } from '@apollo/react-hooks';

import AdjustIcon from '@material-ui/icons/Adjust';
import EventIcon from '@material-ui/icons/Event';
import { StatusBox, AvatarName } from 'components';
import { ORGANIZATION_QUERY, STAFF_QUERY, PERSON_IN_CHARGE_BY_PROJECT_AND_ORDER } from 'gql';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: '12px 12px'
  },
  content: {
    padding: "4px 0px"
  },
  image: {
    height: 48,
    width: 48
  },
  icon: {
    fontSize: 20,
    marginRight: 5
  },
  actions: {
    justifyContent: 'flex-end'
  },
  verticalAlign: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  }
}));

export default function DetailOverview(props) {
  const classes = useStyles();

  const [headOfProjectId, setHeadOfProjectId] = useState({ staff_id: "" });
  const [headOfProject, setHeadOfProject] = useState([]);
  const [organization, setOrganization] = useState("");


  const { loading: headOfProjectIdLoading, error: headOfProjectIdError, data: headOfProjectIdData, refetch: headOfProjectIdRefetch } = useQuery(PERSON_IN_CHARGE_BY_PROJECT_AND_ORDER,
    {
      variables: { project_id: props.project_id, order: '1' },
    });



  useEffect(() => {
    const onCompleted = (data) => {
      if (headOfProjectIdData && headOfProjectIdData.person_in_charges_by_project_and_order !== null) {
        setHeadOfProjectId(data.person_in_charges_by_project_and_order);
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !headOfProjectIdLoading && !headOfProjectIdError) {
        onCompleted(headOfProjectIdData);
      } else if (onError && !headOfProjectIdLoading && headOfProjectIdError) {
        onError(headOfProjectIdError);
      }
    }
  }, [headOfProjectIdLoading, headOfProjectIdData, headOfProjectIdError]);

  const { loading: headOfProjectLoading, error: headOfProjectError, data: headOfProjectData, refetch: headOfProjectRefetch } = useQuery(STAFF_QUERY,
    {
      variables: { staff_id: headOfProjectId.staff_id },
    });

    console.log(headOfProjectId)
  useEffect(() => {
    const onCompleted = (data) => {
      if (headOfProjectData && headOfProjectData.staff !== null) {
        setHeadOfProject(data.staff)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !headOfProjectLoading && !headOfProjectError) {
        onCompleted(headOfProjectData);
      } else if (onError && !headOfProjectLoading && headOfProjectError) {
        onError(headOfProjectError);
      }
    }
  }, [headOfProjectLoading, headOfProjectData, headOfProjectError]);


  const { data: organizationData } = useQuery(ORGANIZATION_QUERY,
    {
      variables: { _id: props.project.organization_id },
      onCompleted: () => {
        setOrganization(organizationData.organization)
      },
    }
  );

  useEffect(() => {
    refresh()
  });

  const refresh = () => {
    headOfProjectIdRefetch();
    headOfProjectRefetch();
  };

  return (
    <Paper className={(classes.root)}    >
      <div className={classes.content}>
        <Typography variant="h4">
          {props.project.project_name}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Description
          </Typography>
        <Typography variant="body1">
          {props.project.project_description}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Organization
          </Typography>
        <AvatarName
          name={organization.organization_name}
          picture={organization.picture}
        />
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Head of Project
          </Typography>
        <AvatarName
          name={
            headOfProject.staff_name
          }
          picture={
            headOfProject.picture
          }
        />
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Date
          </Typography>
        <div style={{ display: 'flex' }}>
          <EventIcon className={classes.icon} />
          <div className={classes.verticalAlign} >
            <Typography variant="body1">
              {props.project.project_start_date.toString().slice(0, 16)}
              {" - "}
              {props.project.project_end_date.toString().slice(0, 16)}
            </Typography>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Status
          </Typography>
        <div style={{ display: 'flex' }}>
          <AdjustIcon className={classes.icon} />
          <div className={classes.verticalAlign}>
            <StatusBox
              start_date={props.project.project_start_date}
              end_date={props.project.project_end_date}
            />
          </div>
        </div>
      </div>
    </Paper>
  );
}
