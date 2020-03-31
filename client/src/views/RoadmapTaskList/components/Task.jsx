import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  // Button,
  // Card,
  // CardHeader,
  // CardActions,
  // CardActionArea,
  // CardContent,
  // Grid,
  Typography,
  // IconButton,
  // Paper,
  Checkbox,
  // FormControlLabel,
  Avatar,
  Tooltip,
  // Popover,
  // MenuItem,
  // Paper,
  // MenuList,
  // ClickAwayListener,
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import clsx from 'clsx';


import {
  TaskDetailModal
} from '.';

const useStyles = makeStyles({
  checkbox_root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  small: {
    width: 25,
    height: 25,
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.checkbox_root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
}


export default function Task(props) {
  const classes = useStyles();
  const shadowStyles = useSoftRiseShadowStyles();

  const [chatCount, setChatCount] = useState(0);
  const handleChangeChecked = id => e => {
    let newArr = { ...props.task };
    newArr.completed = e.target.checked;
    newArr.completed_date = new Date().toString();
    props.handleCompletedChange(newArr, props.index);
  };
  const handleChangeUnchecked = id => e => {
    let newArr = { ...props.task };
    newArr.completed = e.target.checked;
    newArr.completed_date = "";
    props.handleCompletedChange(newArr, props.index);
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
    props.handleCompletedChange(e, props.index)
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
        {props.task.completed === true ?
          <StyledCheckbox checked={true} onChange={handleChangeUnchecked('completed')} />
          :
          <div><StyledCheckbox onChange={handleChangeChecked('completed')} /></div>
        }
      </div>
      <ListItem button onClick={handleClickOpenDialogDetail}
        style={{ display: 'inline' }}      >
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <Typography style={{ fontSize: 13, }}>{props.task.name}</Typography>
          {props.task.due_date !== "" && !props.task.completed ?
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
                <Typography variant="body2" style={{ color: "blue", paddingLeft: 4, fontSize: 10, fontWeight: 500 }}>
                  {props.task.due_date}</Typography>
              </div>
            : <div >
            </div>
          }
          {props.task.completed ?
            <div style={{ display: 'flex' }}>
              <Typography variant="body2" color="textSecondary" style={{ fontSize: 10, fontWeight: 500 }}>
                Completed on </Typography>
              <Typography variant="body2" color="textSecondary" style={{ paddingLeft: 4, fontSize: 10, fontWeight: 600 }}>
                {props.task.completed_date.slice(0, 15)}</Typography>
            </div> : <div></div>
          }
        </div>
        <div style={{ display: 'flex', }}>
          {chatCount === 0 ? <></> :
            <div style={{ display: 'flex', paddingTop: 8, flexGrow: 1 }}>
              <ChatBubbleOutlineIcon style={{ fontSize: 15 }} />
              <Typography style={{ fontSize: 10, paddingLeft: 4 }}>{chatCount}</Typography>
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
        handleChangeChecked={handleChangeChecked}
        handleChangeUnchecked={handleChangeUnchecked}
        handleCompletedChange={handleCompletedChange}
        task={props.task}
        handleChatCount={handleChatCount}
      />
    </div>
  );
}