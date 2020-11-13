import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import jwtDecode from "jwt-decode";
import { TasksAssignedToMe } from './components';
import {
  Typography,
  Paper,
  List,
} from '@material-ui/core';

const COMITEESBYSTAFF_QUERY = gql`
  query comiteesByStaff($staff_id: String!){
    comiteesByStaff(staff_id:$staff_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;

const TASKS_ASSIGNED_TO_QUERY = gql`
query tasks_assigned_to_by_comitee($comitee_id:String!){
  tasks_assigned_to_by_comitee(comitee_id: $comitee_id){
      _id
      task_id
      comitee_id
  }
}
`;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AssignedToMe = (props) => {
  const [tasksAssignedTo, setTasksAssignedTo] = useState([]);

  const {
    data: tasksAssignedToData,
    loading: tasksAssignedToLoading,
    error: tasksAssignedToError,
    refetch: tasksAssignedToRefetch } =
    useQuery(
      TASKS_ASSIGNED_TO_QUERY, {
      variables: { comitee_id: props.comitee._id }
    }
    );

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (tasksAssignedToData) => {
      setTasksAssignedTo(
        tasksAssignedToData.tasks_assigned_to_by_comitee
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !tasksAssignedToLoading && !tasksAssignedToError) {
        onCompleted(tasksAssignedToData);
      } else if (onError && !tasksAssignedToLoading && tasksAssignedToError) {
        onError(tasksAssignedToError);
      }
    }
  }, [tasksAssignedToLoading, tasksAssignedToData, tasksAssignedToError]);

  const refresh = () => {
    tasksAssignedToRefetch();
  };

  const handleDeleteTaskAssignedTo = (e, comitee_id) => {
    if (comitee_id === props.comitee._id) {
      const temp = [...tasksAssignedTo];
      const index = temp.map(function (item) {
        // console.log(item._id)
        return (item._id)
      }).indexOf(e);
      temp.splice(index, 1);
      setTasksAssignedTo(temp);
    }
  }

  const handleDelete = (e) => {
    const temp = [...tasksAssignedTo];
    const index = temp.map(function (item) {
      return (item.task_id)
    }).indexOf(e);
    temp.splice(index, 1);
    setTasksAssignedTo(temp);
  }

  return (
    (tasksAssignedTo).map((taskAssignedTo, index) => {
      return (
        <List key={index} style={{ backgroundColor: "#d8dce3", padding: 0 }} component="nav" aria-label="main mailbox folders" >
          <TasksAssignedToMe
            taskAssignedTo={taskAssignedTo}
            comitee={props.comitee}
            handleDelete={handleDelete}
            handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
          />
        </List>
      )
    })
  );
}

export default function MyTasks(props) {
  const classes = useStyles();
  // const styles = AwsSliderStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const [comitees, setComitees] = useState([]);
  const { data: comiteesData, loading: comiteesLoading, error: comiteesError, refetch: comiteesRefetch } = useQuery(COMITEESBYSTAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id }
  }
  );

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (comiteesData) => {
      setComitees(
        comiteesData.comiteesByStaff
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !comiteesLoading && !comiteesError) {
        onCompleted(comiteesData);
      } else if (onError && !comiteesLoading && comiteesError) {
        onError(comiteesError);
      }
    }
  }, [comiteesLoading, comiteesData, comiteesError]);

  const refresh = () => {
    comiteesRefetch();
  };

  return (
    <div>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>My Tasks</Typography>
      </Paper>
      <div className={classes.root}>
        {
          (comitees).map((comitee, index) => {
            return (
              <AssignedToMe
                key={index}
                comitee={comitee}
              />
            )
          })
        }
      </div>
    </div>
  );
};

