import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  InputBase,
  Tooltip,
  LinearProgress,
  List,
  CircularProgress,
} from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
// import CustomScroll from 'react-custom-scroll';
import { Scrollbars } from 'react-custom-scrollbars';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import jwtDecode from "jwt-decode";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  Task
} from '.';

import uuid from 'uuid/v1';

import { TASKS_QUERY, ADD_TASK, EDIT_TASK } from 'gql';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 500,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  taskHeaderFooter: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: 10,
    paddingLeft: 13,
    paddingRight: 10,
  },
  [theme.breakpoints.down('xs')]: {
    scroll: {
      marginRight: 0,
      marginBottom: 0,
    }
  },
  loading: {
    padding: 20,
    textAlign: 'center',
  },
}));

export default function TaskList(props) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const classes = useStyles();
  const initialFormState =
  {
    _id: uuid(),
    task_name: "",
    priority: "",
    roadmap_id: props.roadmap_id,
    completed: false,
    task_description: "",
    due_date: "",
    completed_date: "",
    created_at: new Date().toString(),
    created_by: decodedToken.staff_id,
    event_id: props.event_id,
    project_id: props.project_id,
  };

  const [countUncompleted, setCountUncompleted] = React.useState(0);
  const [countCompleted, setCountCompleted] = React.useState(0);
  const [addTaskForm, setAddTaskForm] = React.useState(false)
  const [tasks, setTasks] = React.useState([]);
  const [taskForm, setTaskForm] = useState(initialFormState);
  const [sortTask, setSortTask] = useState(false);
  const [addTask] = useMutation(ADD_TASK);
  const [editTask] = useMutation(EDIT_TASK);

  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(TASKS_QUERY,
    {
      variables: { roadmap_id: props.roadmap_id },
    });

  useEffect(() => {
    const onCompleted = (tasksData) => { setTasks(tasksData.tasks) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !tasksLoading && !tasksError) {
        onCompleted(tasksData);
      } else if (onError && !tasksLoading && tasksError) {
        onError(tasksError);
      }
    }
  }, [tasksLoading, tasksData, tasksError]);

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    tasksRefetch();
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setTaskForm({ ...taskForm, [id]: value });
  };

  const handleCompletedChange = (e) => {
    const temp = [...tasks];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setTasks(temp)
    editTask({
      variables:
      {
        _id: e._id,
        task_name: e.task_name,
        priority: e.priority,
        completed: e.completed,
        task_description: e.task_description,
        due_date: e.due_date,
        completed_date: e.completed_date,
        created_at: e.created_at,
        created_by: e.created_by,
        roadmap_id: e.roadmap_id,
        event_id: e.event_id,
        project_id: e.project_id,
      }
    });
  };

  const handleSaveButton = () => {
    setTasks([...tasks, taskForm]);
    setTaskForm(initialFormState);
    addTask({
      variables:
      {
        _id: taskForm._id,
        task_name: taskForm.task_name,
        priority: taskForm.priority,
        completed: taskForm.completed,
        task_description: taskForm.task_description,
        due_date: taskForm.due_date,
        completed_date: taskForm.completed_date,
        created_at: taskForm.created_at,
        created_by: taskForm.created_by,
        roadmap_id: taskForm.roadmap_id,
        project_id: taskForm.project_id,
        event_id: taskForm.event_id,
      }
    });
  }

  const handleDelete = (e) => {
    const temp = [...tasks];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setTasks(temp);
    // setTimeout(() => {
    //   handleOpenSnackbar();
    // }, 700);
  }

  const handleSortTask = () => {
    setSortTask(!sortTask)
  }

  const handleDeleteTaskAssignedTo = (e) => {

  }

  let completedTasks = (tasks.filter(function (task) {
    if (task.completed === true) {
      return task
    }
    return null;
  }));

  let uncompletedTasks = (tasks.filter(function (task) {
    if (task.completed === false) {
      return task
    }
    return null;
  }));

  let sortedCompletedTasks = (
    completedTasks.slice().sort((a, b) =>
      new Date(b.completed_date) - new Date(a.completed_date)
    )
  );

  React.useEffect(() => {
    const countUncompleted = tasks.filter((e) => e.completed === false).length;
    setCountUncompleted(countUncompleted);
    const countCompleted = tasks.filter((e) => e.completed === true).length;
    setCountCompleted(countCompleted);
  }, [tasks])


  const user_access = (props.roadmap.committee_id === props.project_personInCharge.committee_id) ?
    (
      props.project_personInCharge.order === '6' ||
      props.project_personInCharge.order === '7' ||
      decodedToken.user_type === "organization" ||
      props.project_personInCharge.order === '1' ||
      props.project_personInCharge.order === '2' ||
      props.project_personInCharge.order === '3'
    ) ?
      true
      :
      false
    :
    decodedToken.user_type === "organization" ||
      props.project_personInCharge.order === '1' ||
      props.project_personInCharge.order === '2' ||
      props.project_personInCharge.order === '3' ? true : false

  console.log(props.roadmap.committee_id === props.project_personInCharge.committee_id)
  console.log(user_access)
  return (
    <Card className={classes.root} elevation={0} >
      <div>
        <div className={classes.taskHeaderFooter}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <AssignmentIcon />
            <Typography variant="h6" style={{ color: 'white' }}>TASK TO DO</Typography>
            <div style={{ display: "flex" }}>
              <Tooltip title="Filter task" arrow >
                <IconButton style={{ padding: 0, margin: '0px 6px' }} onClick={handleSortTask}>
                  <FilterListIcon style={{ fontSize: 20, }} />
                </IconButton>
              </Tooltip>
              {
                //isRoadmapCommitteeSameAsPICCommittee
                user_access ?
                  < Tooltip title="Add New Task" arrow>
                    <IconButton style={{ padding: 0, }} onClick={() => { setAddTaskForm(true) }}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  : <></>
              }
            </div>
          </div>
          {addTaskForm ? (
            <>
              <Paper variant="outlined" square style={{ marginTop: 10, padding: "0px 5px" }}>
                <InputBase
                  id="task_name"
                  // variant="outlined"
                  placeholder="new tasks"
                  size="small"
                  fullWidth
                  multiline
                  rowsMin="3"
                  value={taskForm.task_name}
                  onChange={handleInputChange}
                  style={{ fontSize: 15 }}
                />
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small" style={{ color: 'grey' }} onClick={() => { setAddTaskForm(false); setTaskForm(initialFormState) }}>Cancel</Button>
                  {(taskForm.task_name === "") ?
                    <Button size="small" disabled >Create</Button>
                    :
                    <Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveButton()}>Create</Button>
                  }
                </div>
              </Paper>
            </>)
            : null
          }
        </div>

        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          thumbMinSize={30}
          autoHeight
          autoHeightMax={400}
          className={classes.scroll}
        >
          <CardContent style={{ padding: 0, backgroundColor: "#d8dce3" }} >
            {
              (tasksLoading) ? <div className={classes.loading}><CircularProgress /></div> :
                <div>
                  {
                    tasks.length === 0 ?
                      <Paper style={{ height: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
                          there is no task yet
                     </Typography>
                      </Paper>
                      :
                      <List style={{ backgroundColor: "#d8dce3", padding: 0 }} component="nav" aria-label="main mailbox folders" >
                        {
                          sortTask ?
                            tasks.slice().reverse().map((task, index) => {
                              return <div key={index}>
                                <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                                <Task
                                  task={task}
                                  handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
                                  project_id={props.project_id}
                                  event_id={props.event_id}
                                  roadmap_id={props.roadmap_id}
                                  roadmap={props.roadmap}
                                  handleCompletedChange={handleCompletedChange}
                                  handleDelete={handleDelete}
                                  project_personInCharge={props.project_personInCharge}
                                  user_access={user_access}
                                  decodedToken={props.decodedToken}
                                />
                              </div>
                            })
                            :
                            <div>
                              {
                                uncompletedTasks.slice().reverse().map((task, index) => {
                                  return <div key={index}>
                                    <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                                    <Task
                                      project_id={props.project_id}
                                      event_id={props.event_id}
                                      roadmap_id={props.roadmap_id}
                                      handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
                                      task={task}
                                      roadmap={props.roadmap}
                                      handleCompletedChange={handleCompletedChange}
                                      handleDelete={handleDelete}
                                      project_personInCharge={props.project_personInCharge}
                                      user_access={user_access}
                                      decodedToken={props.decodedToken}
                                    />
                                  </div>
                                })
                              }
                              <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                              {countCompleted === 0 ? <></> :
                                <div style={{ backgroundColor: "#e2e2e2" }}>
                                  <Typography variant="h6"
                                    style={{ fontSize: 13, fontWeight: 410, padding: '4px 10px' }}>
                                    Completed tasks</Typography>
                                </div>
                              }
                              {sortedCompletedTasks.slice().map((task, index) => {
                                return <div key={index}>
                                  <Task
                                    project_id={props.project_id}
                                    event_id={props.event_id}
                                    roadmap_id={props.roadmap_id}
                                    handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
                                    task={task}
                                    roadmap={props.roadmap}
                                    handleCompletedChange={handleCompletedChange}
                                    handleDelete={handleDelete}
                                    project_personInCharge={props.project_personInCharge}
                                    user_access={user_access}
                                    decodedToken={props.decodedToken}
                                  />
                                  <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                                </div>
                              })}
                            </div>
                        }
                      </List>
                  }
                </div>
            }
          </CardContent>
        </Scrollbars>
      </div>

      {
        tasksLoading || tasks.length === 0 ?
          <div></div>
          :
          <div className={classes.taskHeaderFooter}>
            {tasks.length === 0 ?
              <LinearProgress color="secondary" variant="determinate" value={0} />
              :
              <LinearProgress color="secondary" variant="determinate" value={(countCompleted / tasks.length) * 100} />
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: 10, fontWeight: 300, color: 'white', alignItems: 'right' }}>
                {countUncompleted} active task
        </Typography>
              <Typography style={{ fontSize: 10, fontWeight: 300, color: 'white', alignItems: 'right' }}>
                {countCompleted}/{tasks.length} task completed
        </Typography>
            </div>
          </div>
      }
    </Card >
  );
}