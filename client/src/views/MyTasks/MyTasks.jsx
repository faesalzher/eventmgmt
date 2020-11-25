import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
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
import {
  TASK_ASSIGNED_TOS_QUERY_BY_PERSON_IN_CHARGE,
  PERSON_IN_CHARGES_BY_STAFF_QUERY
} from 'gql';


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
      TASK_ASSIGNED_TOS_QUERY_BY_PERSON_IN_CHARGE, {
      variables: { person_in_charge_id: props.personInCharge._id }
    }
    );

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (tasksAssignedToData) => {
      setTasksAssignedTo(
        tasksAssignedToData.task_assigned_tos
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

  const handleDeleteTaskAssignedTo = (e, person_in_charge_id) => {
    if (person_in_charge_id === props.personInCharge._id) {
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

  React.useEffect(() => {
    props.handleTasksAssignedToLength(tasksAssignedTo.length)
  })
  console.log(tasksAssignedTo.length)

  return (
    (tasksAssignedTo).map((taskAssignedTo, index) => {
      return (
        <List key={index} style={{ backgroundColor: "#d8dce3", padding: 0 }} component="nav" aria-label="main mailbox folders" >
          <TasksAssignedToMe
            taskAssignedTo={taskAssignedTo}
            personInCharge={props.personInCharge}
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
  const [personInCharges, setPersonInCharges] = useState([]);
  const { data: personInChargesData, loading: personInChargesLoading, error: personInChargesError, refetch: personInChargesRefetch } = useQuery(PERSON_IN_CHARGES_BY_STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id }
  }
  );

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (personInChargesData) => {
      setPersonInCharges(
        personInChargesData.person_in_charges
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargesLoading && !personInChargesError) {
        onCompleted(personInChargesData);
      } else if (onError && !personInChargesLoading && personInChargesError) {
        onError(personInChargesError);
      }
    }
  }, [personInChargesLoading, personInChargesData, personInChargesError]);

  const refresh = () => {
    personInChargesRefetch();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tasksAssignedToLength, setTasksAssignedToLength] = useState(0)
  const handleTasksAssignedToLength = (e) => {
    setTasksAssignedToLength(e)
  }

  const [tasksLength, setTasksLength] = useState(0)
  const handleTasksLength = (e) => {
    setTasksLength(e)
  }

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
              aria-label="project personInCharge tabs"
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
              aria-label="project personInCharge tabs"
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
              {personInChargesLoading ?
                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
                  <CircularProgress size={100} />
                </div>
                :
                // tasksAssignedToLength === 0 ?
                //   <Paper style={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                //     <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
                //       there is no task yet
                //     </Typography>
                //   </Paper>
                //   :
                  (personInCharges).map((personInCharge, index) => {
                    return (
                      <AssignedToMe
                        key={index}
                        personInCharge={personInCharge}
                        decodedToken={decodedToken}
                        handleTasksAssignedToLength={handleTasksAssignedToLength}
                      />
                    )
                  })
              }
            </TabPanel>
            :
            <></>
        }
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={decodedToken.user_type === "organization" ? 0 : 1}>
          {
            // tasksLength === 0 ?
            //   <Paper style={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            //     <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
            //       there is no task yet
            //     </Typography>
            //   </Paper>
            //   :
            <TasksCreatedByMe decodedToken={decodedToken} handleTasksLength={handleTasksLength} />
          }
        </TabPanel>
      </div>
    </div>
  );
};

