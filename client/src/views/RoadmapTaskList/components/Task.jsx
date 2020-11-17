import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ListItem from '@material-ui/core/ListItem';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import clsx from 'clsx';
import { CustomizedCheckbox } from 'components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  TaskDetailModal, AssigneeAvatar
} from '.';



const TASKS_ASSIGNED_TO_QUERY = gql`
query tasks_assigned_to($task_id:String!){
  tasks_assigned_to(task_id: $task_id){
      _id
      task_id
      comitee_id
  }
}
`;

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  small: {
    width: 25,
    height: 25
  }
}));



export default function Task(props) {
  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const dueDate = new Date(props.task.due_date);
  const todayDate = new Date();
  const msec = (todayDate - dueDate);
  const mins = Math.floor(msec / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const minutes = mins % 60;
  const hours = hrs % 24;

  const [openDialogDetail, setOpenDialogDetail] = React.useState(false);
  const [task, setTask] = useState(props.task)


  const [tasksAssignedTo, setTasksAssignedTo] = useState([])


  React.useEffect(() => {
    setTask(props.task)
  }, [setTask, props.task])

  const {
    loading: tasksAssignedToLoading,
    error: tasksAssignedToError,
    data: tasksAssignedToData,
    refetch: tasksAssignedToRefetch
  } = useQuery(TASKS_ASSIGNED_TO_QUERY,
    {
      variables: { task_id: task._id },
    });

  useEffect(() => {
    const onCompleted = (tasksAssignedToData) => { setTasksAssignedTo(tasksAssignedToData.tasks_assigned_to) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !tasksAssignedToLoading && !tasksAssignedToError) {
        onCompleted(tasksAssignedToData);
      } else if (onError && !tasksAssignedToLoading && tasksAssignedToError) {
        onError(tasksAssignedToError);
      }
    }
  }, [tasksAssignedToLoading, tasksAssignedToData, tasksAssignedToError]);

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    tasksAssignedToRefetch();
  };

  const handleChangeChecked = () => {
    let newArr = { ...task };
    if (task.completed === false) {
      setTask({ ...task, completed: true, completed_date: new Date().toString() });
      newArr.completed = true;
      newArr.completed_date = new Date().toString();
      props.handleCompletedChange(newArr);
    } else {
      setTask({ ...task, completed: false, completed_date: "" });
      newArr.completed = false;
      newArr.completed_date = "";
      props.handleCompletedChange(newArr);
    }
  };

  const handleClickOpenDialogDetail = () => {
    setOpenDialogDetail(true);
  };
  const handleClose = () => {
    setOpenDialogDetail(false);
  };

  const handleCompletedChange = (e) => {
    props.handleCompletedChange(e)
  }



  const handleAddTaskAssignedTo = (e) => {
    // setTasksAssignedTo([...tasksAssignedTo, e]);
    setTasksAssignedTo([...tasksAssignedTo, e]);
  }

  const handleDeleteTaskAssignedTo = (e, id) => {
    const temp = [...tasksAssignedTo];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setTasksAssignedTo(temp);
    props.handleDeleteTaskAssignedTo(e, id);
  }

  let isAssignedToMe = false;
  tasksAssignedTo.forEach((taskAssignedTo, index) => {
    if ((taskAssignedTo.comitee_id === props.project_comitee._id) ||
      (props.project_comitee.position_id === '1' ||
        props.project_comitee.position_id === '2' ||
        props.project_comitee.position_id === '3' ||
        props.project_comitee.position_id === '5' ||
        props.project_comitee.position_id === '6' ||
        props.decodedToken.user_type === "organization")
    )
      isAssignedToMe = true
  })

  return (
    <div
      style={task.completed === true ?
        { backgroundColor: '#e2e2e2', display: 'flex' } :
        { backgroundColor: 'white', display: 'flex' }}
      className={clsx(shadowStyles.root)}
    >
      <div style={
        (task.priority === "low") ?
          { backgroundColor: "#ffc916" } : (task.priority === "medium") ?
            { backgroundColor: "#a3cd3b" } : (task.priority === "high") ?
              { backgroundColor: "#ff4943" } : { backgroundColor: "#e2e2e2" }
      } >
        <CustomizedCheckbox
          checked={task.completed}
          onChange={handleChangeChecked}
          disabled={
            !isAssignedToMe
          }
        // inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      <ListItem button onClick={handleClickOpenDialogDetail} className={classes.list}>
        <div>
          <Typography variant="h6" style={task.completed ? { textDecoration: 'line-through' } : {}}>{task.task_name}</Typography>
          {task.due_date !== "" && task.completed === false ?
            (days >= 0 && hrs >= 0 && mins >= 0) ?
              <div style={{ display: 'flex' }}>
                <Typography variant="body2" color="textSecondary" style={{ fontSize: 10, fontWeight: 600 }}>
                  Overdue By </Typography>
                <Typography variant="body2" style={{ color: "Red", paddingLeft: 4, fontSize: 10, fontWeight: 500 }}>
                  {days} Days {hours} Hours {minutes} mins </Typography>
              </div>
              :
              <div style={{ display: 'flex' }}>
                <Typography variant="body2" color="textSecondary" style={{ fontSize: 10, fontWeight: 600 }}>
                  Due On </Typography>
                <Typography variant="body2" color="secondary" style={{ paddingLeft: 4, fontSize: 10, fontWeight: 500 }}>
                  {props.task.due_date}</Typography>
              </div>
            : <div >
            </div>
          }
          {props.task.completed === true ?
            <div style={{ display: 'flex' }}>
              <Typography variant="body2" color="textSecondary" style={{ fontSize: 10, fontWeight: 500 }}>
                Completed on </Typography>
              <Typography variant="body2" color="textSecondary" style={{ paddingLeft: 4, fontSize: 10, fontWeight: 600 }}>
                {props.task.completed_date.slice(0, 15)}</Typography>
            </div> : <div></div>
          }

        </div>
        <div style={{ display: 'flex' }}>
          <AvatarGroup spacing={8} style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            {
              tasksAssignedTo.map((taskAssignedTo, index) => {
                return <AssigneeAvatar key={index} taskAssignedTo={taskAssignedTo} type="avatar" />
              })
            }
          </AvatarGroup>
        </div>
      </ListItem>
      <TaskDetailModal
        project_id={props.project_id}
        openDialogDetail={openDialogDetail}
        handleAddTaskAssignedTo={handleAddTaskAssignedTo}
        closeDialogDetail={handleClose}
        handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
        handleDelete={props.handleDelete}
        // closeAfterTransition
        roadmap={props.roadmap}
        tasksAssignedTo={tasksAssignedTo}
        handleChangeChecked={handleChangeChecked}
        handleCompletedChange={handleCompletedChange}
        task={props.task}
        project_comitee={props.project_comitee}
        decodedToken={props.decodedToken}
      />
    </div >
  );
}