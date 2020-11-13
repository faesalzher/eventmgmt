import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, CircularProgress, List } from '@material-ui/core';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Assignee } from '.';
const COMITEESBYPROJECT_QUERY = gql`
  query comiteesByProject($project_id: String!){
     comiteesByProject(project_id:$project_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  list: {
    paddingTop: 2,
    paddingBottom: 2
  }
}));
export default function Assignees(props) {
  const classes = useStyles();
  const [comitees, setComitees] = useState([]);


  const { data: comiteesData, loading: comiteesLoading, refetch: comiteesRefetch } = useQuery(COMITEESBYPROJECT_QUERY, {
    variables: { project_id: props.project_id },
    onCompleted: () => {
      setComitees(
        comiteesData.comiteesByProject
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    comiteesRefetch();
  };

  const comiteesByDivision = comitees.filter(function (comitee) {
    return comitee.division_id === props.division._id
  });

  if (comiteesLoading) {
    return <div style={{ textAlign: 'center' }}>
      <CircularProgress />
    </div>
  }

  if (comiteesByDivision.length === 0) {
    return <Paper style={{ height: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
        there is no comitees yet
</Typography>
    </Paper>
  }

  return (
    <div>
      <List component="nav" className={classes.root} aria-label="contacts">
        {comiteesByDivision.map((comitee, index) => {
          return (
            <Assignee
              task={props.task}
              handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
              handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
              tasksAssignedTo={props.tasksAssignedTo}
              key={index}
              comitee={comitee}
            />
          )
        })}
      </List>
    </div>
  );
}