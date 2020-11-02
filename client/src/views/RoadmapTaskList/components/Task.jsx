import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Avatar,
  Tooltip,

} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ListItem from '@material-ui/core/ListItem';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import clsx from 'clsx';
import { CustomizedCheckbox } from 'components';


import {
  TaskDetailModal
} from '.';

const useStyles = makeStyles({
  small: {
    width: 25,
    height: 25,
  },
});



export default function Task(props) {
  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();

  const [task, setTask] = useState(props.task)
  React.useEffect(() => {
    setTask(props.task)
  }, [setTask, props.task])

  const [chatCount, setChatCount] = useState(0);
  // const handleChangeChecked = id => e => {
  //   let newArr = { ...task };
  //   newArr.completed = true;
  //   newArr.completed_date = new Date().toString();
  //   setTask({ ...task, completed: true, completed_date: new Date().toString() })
  // };

  // const handleChangeUnchecked = id => e => {
  //   let newArr = { ...task };

  // };

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


  const dueDate = new Date(props.task.due_date);
  const todayDate = new Date();
  const msec = (todayDate - dueDate);
  const mins = Math.floor(msec / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const minutes = mins % 60;
  const hours = hrs % 24;

  const [openDialogDetail, setOpenDialogDetail] = React.useState(false);

  const handleClickOpenDialogDetail = () => {
    setOpenDialogDetail(true);
  };
  const handleClose = () => {
    setOpenDialogDetail(false);
  };

  const handleCompletedChange = (e) => {
    props.handleCompletedChange(e)
  }

  const handleChatCount = e => {
    setChatCount(e);
  }

  return (
    <div
      style={props.task.completed === true ?
        { backgroundColor: '#e2e2e2', display: 'flex' } :
        { backgroundColor: 'white', display: 'flex' }}
      className={clsx(shadowStyles.root)}
    >
      <div style={
        (props.task.priority === "low") ?
          { backgroundColor: "#ffc916" } : (props.task.priority === "medium") ?
            { backgroundColor: "#a3cd3b" } : (props.task.priority === "high") ?
              { backgroundColor: "#ff4943" } : { backgroundColor: "#e2e2e2" }
      } >
          <CustomizedCheckbox
            checked={task.completed}
            onChange={handleChangeChecked}
            // inputProps={{ 'aria-label': 'primary checkbox' }}
          />
      </div>
      <ListItem button onClick={handleClickOpenDialogDetail}
        style={{ display: 'flex', justifyContent: 'space-between' }}      >
        <div>
          <Typography variant="h6" style={task.completed ? { textDecoration: 'line-through' } : {}}>{props.task.task_name}</Typography>
          {props.task.due_date !== "" && props.task.completed === false ?
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
          {chatCount === 0 ? <div></div> :
            <div style={{ display: 'flex', padding: '0px 15px' }}>
              <ChatBubbleOutlineIcon style={{ fontSize: 15, margin: '4px 0px' }} />
              <Typography style={{ fontSize: 13, paddingLeft: 4 }}>{chatCount}</Typography>
            </div>}
          <AvatarGroup spacing={8} style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <Avatar src="/static/images/avatar/1.jpg" className={classes.small} />
            <Avatar src="/static/images/avatar/2.jpg" className={classes.small} />
            <Avatar src="/static/images/avatar/3.jpg" className={classes.small} />
            <Avatar src="/static/images/avatar/3.jpg" className={classes.small} />
            <Tooltip title="Foo • Bar • Baz">
              <Avatar className={classes.small}><Typography style={{ fontSize: 10 }}>+4</Typography></Avatar>
            </Tooltip>
          </AvatarGroup>
        </div>
      </ListItem>
      <TaskDetailModal
        openDialogDetail={openDialogDetail}
        closeDialogDetail={handleClose}
        // closeAfterTransition
        handleDelete={props.handleDelete}
        handleChangeChecked={handleChangeChecked}
        handleCompletedChange={handleCompletedChange}
        task={props.task}
        handleChatCount={handleChatCount}
      />
    </div >
  );
}