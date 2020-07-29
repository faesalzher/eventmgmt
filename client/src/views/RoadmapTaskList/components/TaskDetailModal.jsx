import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Divider, TextField, TextareaAutosize, Grid, Checkbox } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';


import EscapeOutside from "react-escape-outside";
import { Scrollbars } from 'react-custom-scrollbars';

import { TaskProperties, TaskChatBubble } from '.';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    padding: 0,
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
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
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && <Box style={{ height: '100%' }}>{children}</Box>}
    </Typography>
  );
}
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
const chatData = [
  { chat_id: '2', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '3', user_id: 1, task_id: 1, content: "Ini Percobaan chat", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '4', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '5', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '6', user_id: 3, task_id: 1, content: "aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '7', user_id: 3, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
  { chat_id: '8', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: new Date().toString() },
]
export default function TaskDetailModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = React.useState(0);
  const [taskNameForm, setTaskNameForm] = React.useState(false);
  const [task, setTask] = useState(props.task);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [chat, setChat] = useState(chatData);
  React.useEffect(() => {
    const elem = document.getElementById(`item_${chat.length}`);
    elem && elem.scrollIntoView({ behavior: "smooth" });
  });
  const initialChatFormState =
  {
    chat_id: Math.random(),
    user_id: 3,
    task_id: task._id,
    content: "",
    chat_date: new Date().toString(),
  };
  const [chatForm, setChatForm] = useState(initialChatFormState);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTaskName = e => {
    const { id, value } = e.target;
    setTask({ ...task, [id]: value });
  };

  const handleOpenTaskNameForm = () => {
    setTaskNameForm(true);
  };
  const handleCloseTaskNameForm = () => {
    setTaskNameForm(false);
  };

  const handleAddChat = e => {
    const { id, value } = e.target;
    setChatForm({ ...chatForm, [id]: value });
  };

  const handleSubmiAddChat = () => {
    if (chatForm.content === "") {
    } else {
      setChat([...chat, chatForm]);
      setChatForm(initialChatFormState);
    }
  }

  // console.log(chat)
  const handleCompletedChange = () => {
    if (!task.completed) {
      task.completed_date = new Date().toString();
      task.completed = !task.completed;
      props.handleCompletedChange(task);
    } else {
      task.completed_date = "";
      task.completed = !task.completed;
      props.handleCompletedChange(task);
    }
  };

  const handleSaveChange = () => {
    props.handleCompletedChange(task);
    setShowEditIcon(false)
  }
  const onEscapeOutside = (e) => {
    handleCloseTaskNameForm();
    handleSaveChange();
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSaveChange();
      handleCloseTaskNameForm();
    }
  }

  React.useEffect(() => {
    const countChat = () => {
      const count = chat.filter((e) => e.task_id === task._id).length;
      props.handleChatCount(count)
    }
    return () => {
      countChat();
    }
  })


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        onClose={props.closeDialogDetail}
        aria-labelledby="customized-dialog-title"
        open={props.openDialogDetail}
        maxWidth={'sm'}
      >
        {/* <div style={{width:700,height:700}}> */}
        <DialogTitle id="customized-dialog-title" onClose={props.closeDialogDetail} style={{ paddingBottom: 0 }}>
          {taskNameForm ?
            <EscapeOutside onEscapeOutside={onEscapeOutside}>
              <TextareaAutosize autoFocus aria-label="empty textarea"
                onKeyDown={onPressEnter}
                value={task.task_name}
                id="task_name"
                onChange={handleChangeTaskName}
                placeholder="Add Task Name"
                style={{ textAlign: 'center', width: "80%", minHeight: 27, fontSize: 18, fontWeight: 600 }} />
            </EscapeOutside>
            :
            <div style={{ display: "flex" }}>
              <div style={{ width: "10%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {task.completed === true ?
                  <StyledCheckbox checked={true} onChange={handleCompletedChange} />
                  :
                  <div><StyledCheckbox onChange={handleCompletedChange} /></div>
                }
              </div>
              <Button
                elevation={0}
                size="small"
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
                onClick={handleOpenTaskNameForm}
                style={{ textAlign: 'center', textTransform: 'none', flexGrow: 3, width: "80%" }} >
                <Typography variant="h6" style={{ textAlign: 'center' }}>
                  {task.task_name}
                </Typography>
              </Button>
              {showEditIcon ? <div style={{ width: "10%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><EditIcon /></div> : <div style={{ width: "10%" }}></div>}
            </div>
          }
          <div style={{ display: 'flex', marginLeft: 6, justifyContent: 'center' }}>
            <Typography color='textSecondary' style={{ fontSize: 10, }}>
              Created by
            </Typography>
            <Typography color='textSecondary' style={{ fontSize: 10, fontWeight: 500, paddingLeft: 4, }}>
              Faesal
            </Typography>
            <Typography color='textSecondary' style={{ fontSize: 10, paddingLeft: 4, }}>
              on Sun 15 May 2020 18:00
            </Typography>
          </div>
        </DialogTitle>
        <AntTabs variant="fullWidth" value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Properties" style={{ marginRight: 0 }} {...a11yProps(0)} />
          <AntTab label="Chats" style={{ marginRight: 0 }} {...a11yProps(1)} />
          {/* <AntTab label="Files" /> */}
        </AntTabs>
        <TabPanel value={value} index={0} style={
          fullScreen ?
            { minWidth: 10, height: '100%', backgroundColor: 'rgb(230, 232, 235)' } :
            { width: 580, height: 440, backgroundColor: 'rgb(230, 232, 235)' }
        } >
          <DialogContent dividers style={
            fullScreen ?
              { height: '90%' } :
              { height: '88%' }
          } >
            <TaskProperties task={props.task} handleCompletedChange={props.handleCompletedChange} />
          </DialogContent  >
          <DialogActions style={{ background: "white" }}>
            {task.completed ?
              <Button autoFocus color="primary" onClick={handleCompletedChange} >
                Mark as Uncomplete
            </Button>
              :
              <Button color="primary" onClick={handleCompletedChange}>
                Mark as Complete
              </Button>
            }
          </DialogActions>
        </TabPanel>
        <TabPanel value={value} index={1} style={
          fullScreen ?
            { minWidth: 10, height: '100%', backgroundColor: 'rgb(230, 232, 235)' } :
            { width: 580, height: 440, backgroundColor: 'rgb(230, 232, 235)' }
        } >
          <Divider />
          {!fullScreen ?
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              thumbMinSize={30}
              autoHeight
              autoHeightMax={360}
              autoHeightMin={360}
            >
              <DialogContent style={{ height: '83%' }} >
                {chat.map((chat, index) => {
                  if (chat.task_id === props.task._id) return (
                    <Grid id={`item_${index + 1}`} key={index} item style={{ margin: '5px 0px' }}>
                      <TaskChatBubble chat={chat} />
                    </Grid>
                  )
                  return null;
                })}
              </DialogContent>
            </Scrollbars>
            :
            <DialogContent style={{ height: '83%' }} >
              {chat.map((chat, index) => {
                if (chat.task_id === props.task._id) return (
                  <Grid id={`item_${index + 1}`} key={index} item style={{ margin: '5px 0px' }}>
                    <TaskChatBubble chat={chat} />
                  </Grid>
                )
                return null;
              })}
            </DialogContent>
          }
          <Divider />
          <DialogActions style={{ height: '16%' }}>
            <TextField
              id="content"
              multiline
              size="small"
              rows='1'
              // autoFocus
              value={chatForm.content}
              onChange={handleAddChat}
              placeholder="write a chat"
              style={{ width: '88%', backgroundColor: 'white' }}
              variant="outlined"
            />
            <IconButton onClick={handleSubmiAddChat}>
              <SendIcon />
            </IconButton>
          </DialogActions>
        </TabPanel>
        <Typography className={classes.padding} />
        {/* </div>      */}
      </Dialog>
    </div >
  );
}