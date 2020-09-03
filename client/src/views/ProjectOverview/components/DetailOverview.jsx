import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Box,
  Divider,
  Avatar,
  Typography,
  // Divider,
  // IconButton
} from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import AdjustIcon from '@material-ui/icons/Adjust';
import EventIcon from '@material-ui/icons/Event';

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
  const today = new Date();

  const initialFormState =
  {
    _id: "",
    staff_name: "",
    phone_number: "",
    email: "",
  };

  const [headOfProjectId, setHeadOfProjectId] = useState([{ staff_id: '0' }]);
  const [headOfProjectName, setHeadOfProjectName] = useState(initialFormState);


  const { loading, error, data: headOfProjectIdData, refetch: headOfProjectIdRefetch } = useQuery(HEADOFPROJECT_QUERY,
    {
      variables: { project_id: props.project._id, position_id: '1' },
      // onCompleted: () => {
      //   if (headOfProjectIdData.comiteesByHeadProject.length === 0) {
      //     return setHeadOfProjectId([{ staff_id: '0' }])
      //   } else {
      //     return setHeadOfProjectId(headOfProjectIdData.comiteesByHeadProject)
      //   }
      // }
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

  return (
    <Paper className={(classes.root)}    >
      <div className={classes.content}>
        <Typography variant="h6">
          {props.project.project_name}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="body2">
          {props.project.project_description}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Head of Project
          </Typography>
        <div style={{ display: 'flex' }}>
          <Avatar style={{width:30, height:30}} src={
            (headOfProjectName !== null) ?
              headOfProjectName.picture
              :
              ""
          } />
          <Typography variant="body2"
            style={{
              display: 'flex', flexDirection: 'column', margin: "0px 10px", justifyContent: "center"
           }}>
            {(headOfProjectName !== null) ?
              headOfProjectName.staff_name
              :
              "-"
            }
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="subtitle2">
          Date
          </Typography>
        <div style={{ display: 'flex' }}>
          <EventIcon className={classes.icon} />
          <div className={classes.verticalAlign} >
            <Typography variant="body2">
              {props.project.project_start_date.toString().slice(0, 16)}-
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
            {
              (props.project.cancel === "true") ? (
                <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center', width: 110, color: 'black' }}>
                  <Typography variant="body2">Cancelled</Typography>
                </Box>
              ) : (
                  (today < new Date(props.project.project_start_date)) ? (
                    <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: 110, color: 'black' }}>
                      <Typography variant="body2">Planned</Typography>
                    </Box>
                  ) : (
                      (today < new Date(props.project.project_end_date)) ? (
                        <Box borderRadius={4} style={{ backgroundColor: 'green', textAlign: 'center', width: 110, color: 'white' }}>
                          <Typography variant="body2">Active</Typography>
                        </Box>
                      ) : (
                          <Box borderRadius={4} style={{ backgroundColor: 'blue', textAlign: 'center', width: 110, color: 'white' }}>
                            <Typography variant="body2">Completed</Typography>
                          </Box>
                        )
                    ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}
