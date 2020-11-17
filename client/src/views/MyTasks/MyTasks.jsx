import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import jwtDecode from "jwt-decode";
import { TasksAssignedToMe, TasksCreatedByMe } from './components';
import {
  Typography,
  Paper,
  List,
} from '@material-ui/core';
import {
  Box,
  Tabs,
  Tab,
  // Typography,
  // Paper,
  // Snackbar,
  CircularProgress
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
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


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
            decodedToken={props.decodedToken}
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>My Tasks</Typography>
      </Paper>
      <div className={classes.root}>
        <Paper elevation={0} className={classes.colorPrimary}>

          {decodedToken.user_type === "organization" ?
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              style={{ color: 'white' }}
              aria-label="project comitee tabs"
              className={classes.tabs}
            >
              <Tab label="Created By Me" {...a11yProps(decodedToken.user_type === "organization" ? 0 : 1)} />
            </Tabs>
            :
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              style={{ color: 'white' }}
              aria-label="project comitee tabs"
              className={classes.tabs}
            >
              <Tab label="Assigned To Me" {...a11yProps(0)} />
              <Tab label="Created By Me" {...a11yProps(1)} />
            </Tabs>
          }
        </Paper>
        <div style={{ backgroundColor: "#d8dce3", height: 10 }} />
        {
          decodedToken.user_type === "staff" ?
            <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
              {comiteesLoading ?
                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
                  <CircularProgress size={100} />
                </div>
                :
                (comitees).map((comitee, index) => {
                  return (
                    <AssignedToMe
                      key={index}
                      comitee={comitee}
                      decodedToken={decodedToken}
                    />
                  )
                })
              }
            </TabPanel>
            :
            <></>
        }
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={decodedToken.user_type === "organization" ? 0 : 1}>
          <TasksCreatedByMe decodedToken={decodedToken} />
        </TabPanel>
      </div>
    </div>
  );
};

