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

import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  Task
} from '.';

import uuid from 'uuid/v1';



const TASKS_QUERY = gql`
query tasks($roadmap_id:String!){
  tasks(roadmap_id: $roadmap_id){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
  }
}
`;

const ADD_TASK = gql`
  mutation addTask(
    $_id: String!,
    $task_name: String!,
    $priority: String!,
    $completed: Boolean!,
    $task_description: String!,
    $due_date: String!,
    $completed_date: String!,
    $created_at: String!,
    $created_by: String!,
    $roadmap_id: String!,
    ){
    addTask(
      _id: $_id,
      task_name: $task_name,
      priority: $priority,
      completed:$completed,
      task_description:$task_description,
      due_date:$due_date,
      completed_date:$completed_date,
      created_at:$created_at,
      created_by:$created_by,
       roadmap_id:$roadmap_id,
    ){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
	roadmap_id
    }
  }
`;


const EDIT_TASK = gql`
  mutation editTask(
    $_id: String!,
    $task_name: String!,
    $priority: String!,
    $completed: Boolean!,
    $task_description: String!,
    $due_date: String!,
    $completed_date: String!,
    $created_at: String!,
    $created_by: String!,
    $roadmap_id: String!,
    ){
    editTask(
      _id: $_id,
      task_name: $task_name,
      priority: $priority,
      completed:$completed,
      task_description:$task_description,
      due_date:$due_date,
      completed_date:$completed_date,
      created_at:$created_at,
      created_by:$created_by,
      roadmap_id:$roadmap_id,
    ){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
    }
  }
`;

// const COMITEESBYPROJECT_QUERY = gql`
//   query comiteesByProject($project_id: String!){
//      comiteesByProject(project_id:$project_id) {
//       _id
//       staff_id
//       position_id
//       division_id
//       project_id
//     }
//   }
// `;

// const STAFFS_QUERY = gql`
// {
//   staffs{
//       _id
//       staff_name
//       position_name
//       email
//       phone_number
//       password
//       picture
//       departement_id
//   }
// }
// `;

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
    created_at: new Date(),
    created_by: (decodedToken.user_type === "organization") ? decodedToken.organization_id : decodedToken.staff_id
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

  let tasksByRoadmap = (tasks.filter(function (task) {
    if (task.roadmap_id === props.roadmap_id) {
      return task
    }
    return null;
  }));

  let completedTasks = (tasksByRoadmap.filter(function (task) {
    if (task.completed === true) {
      return task
    }
    return null;
  }));

  let uncompletedTasks = (tasksByRoadmap.filter(function (task) {
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
    const countUncompleted = tasksByRoadmap.filter((e) => e.completed === false).length;
    setCountUncompleted(countUncompleted);
    const countCompleted = tasksByRoadmap.filter((e) => e.completed === true).length;
    setCountCompleted(countCompleted);
  }, [tasksByRoadmap])


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
            <Typography variant="h6" style={{ color: 'white' }}>TASK TO DO</Typography>
            <div style={{ display: "flex" }}>
              <Tooltip title="Filter task" arrow >
                <IconButton style={{ padding: 0, margin: '0px 6px' }} onClick={handleSortTask}>
                  <FilterListIcon style={{ fontSize: 20, }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add New Task" arrow>
                <IconButton style={{ padding: 0, margin: '0px 6px' }} onClick={() => { setAddTaskForm(true) }}>
                  <AddIcon style={{ fontSize: 20, }} />
                </IconButton>
              </Tooltip>
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
                            tasksByRoadmap.slice().reverse().map((task, index) => {
                              return <div key={index}>
                                <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                                <Task
                                  task={task}
                                  handleCompletedChange={handleCompletedChange}
                                  handleDelete={handleDelete}
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
                                      task={task}
                                      handleCompletedChange={handleCompletedChange}
                                      handleDelete={handleDelete}
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
                                    task={task}
                                    handleCompletedChange={handleCompletedChange}
                                    handleDelete={handleDelete}
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

      {tasksLoading || tasks.length === 0 ?
        <div></div>
        :
        <div className={classes.taskHeaderFooter}>
          {tasksByRoadmap.length === 0 ?
            <LinearProgress color="secondary" variant="determinate" value={0} />
            :
            <LinearProgress color="secondary" variant="determinate" value={(countCompleted / tasksByRoadmap.length) * 100} />
          }
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: 10, fontWeight: 300, color: 'white', alignItems: 'right' }}>
              {countUncompleted} active task
        </Typography>
            <Typography style={{ fontSize: 10, fontWeight: 300, color: 'white', alignItems: 'right' }}>
              {countCompleted}/{tasksByRoadmap.length} task completed
        </Typography>
          </div>
        </div>
      }
    </Card >
  );
}