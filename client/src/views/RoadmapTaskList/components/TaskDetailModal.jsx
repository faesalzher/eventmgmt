import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Divider, TextField,
  // Grid,
  Checkbox, Tooltip, IconButton
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditIcon from '@material-ui/icons/Edit';
// import SendIcon from '@material-ui/icons/Send';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import EscapeOutside from "react-escape-outside";
// import { Scrollbars } from 'react-custom-scrollbars';

import {
  TaskProperties,
  // TaskChatBubble
} from '.';
import {
  ConfirmationDialog
} from 'components';

const DELETE_TASK = gql`
mutation deleteTask ($_id: String!) {
  deleteTask(_id:$_id){
    _id
  }
}
`;

const DELETE_TASK_ASSIGNED_TO = gql`
mutation deleteTaskAssignedTo ($_id: String!) {
  delete_task_assigned_to(_id:$_id){
    _id
  }
}
`;

const AntTabs = withStyles(theme => (({
  root: {
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: theme.palette.primary.main
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
})))(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    padding: 0,
    textTransform: 'none',
    color: 'white',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.secondary.main,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    // color: "#2EFF22",
    backgroundColor: 'white'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleButton: {
    textAlign: 'center',
    textTransform: 'none',
    flexGrow: 3
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
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
      <Typography variant="h6" style={{ textAlign: 'center', color: 'white' }}>{children}</Typography>
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

// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: '10px 16px',
//   },
// }))(MuiDialogActions);

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

// const chatData = [
//   { chat_id: '2', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '3', user_id: 1, task_id: 1, content: "Ini Percobaan chat", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '4', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '5', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '6', user_id: 3, task_id: 1, content: "aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '7', user_id: 3, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: "Mon Mar 16 2020 19:33" },
//   { chat_id: '8', user_id: 1, task_id: 1, content: "asdasdasdasdm aaaaa", chat_date: new Date().toString() },
// ]


export default function TaskDetailModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = React.useState(0);
  const [taskNameForm, setTaskNameForm] = React.useState(false);
  const [task, setTask] = useState(props.task);
  const [showEditIcon, setShowEditIcon] = useState(false);
  // const [chat, setChat] = useState(chatData);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [deleteTaskAssignedTo] = useMutation(DELETE_TASK_ASSIGNED_TO);

  React.useEffect(() => {
    setTask(props.task)
  }, [setTask, props.task]);

  // React.useEffect(() => {
  //   const elem = document.getElementById(`item_${chat.length}`);
  //   elem && elem.scrollIntoView({ behavior: "smooth" });
  // });

  // const initialChatFormState =
  // {
  //   chat_id: Math.random(),
  //   user_id: 3,
  //   task_id: task._id,
  //   content: "",
  //   chat_date: new Date().toString(),
  // };
  // const [chatForm, setChatForm] = useState(initialChatFormState);
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

  // const handleAddChat = e => {
  //   const { id, value } = e.target;
  //   setChatForm({ ...chatForm, [id]: value });
  // };

  // const handleSubmiAddChat = () => {
  //   if (chatForm.content === "") {
  //   } else {
  //     setChat([...chat, chatForm]);
  //     setChatForm(initialChatFormState);
  //   }
  // }

  const handleCompletedChange = () => {
    if (!task.completed) {
      setTask({ ...task, completed: !task.completed, completed_date: new Date().toString() });
    } else {
      setTask({ ...task, completed: !task.completed, completed_date: "" });
    }
  };

  const handleSaveChange = () => {
    props.handleCompletedChange(task);
  }

  const onEscapeOutside = (e) => {
    handleCloseTaskNameForm();
    handleSaveChange();
    setShowEditIcon(false)
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleCloseTaskNameForm();
      handleSaveChange();
      setShowEditIcon(false)
    }
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    props.handleDelete(task._id);
    props.closeDialogDetail();
    deleteTask({ variables: { _id: task._id } });
    props.tasksAssignedTo.map((taskAssignedTo) => {
      deleteTaskAssignedTo({ variables: { _id: taskAssignedTo._id } })
      return null
    })
  }

  const handleCloseModal = () => {
    props.handleCompletedChange(task);
    props.closeDialogDetail();
  }

  const handleDeleteTaskAssignedTo = (e, id) => {
    props.handleDeleteTaskAssignedTo(e, id)
  }
  // React.useEffect(() => {
  //   const countChat = () => {
  //     const count = chat.filter((e) => e.task_id === task._id).length;
  //     props.handleChatCount(count)
  //   }
  //   return () => {
  //     countChat();
  //   }
  // })

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={props.openDialogDetail}
        maxWidth={'sm'}
      >
        <ConfirmationDialog
          type="delete"
          name={task.task_name}
          content="Task"
          open={openDeleteModal}
          handleConfirm={handleDelete}
          close={handleCloseDeleteModal}
        />
        {/* <div style={{width:700,height:700}}> */}
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal} style={{ paddingBottom: 0 }}>
          {taskNameForm ?
            <EscapeOutside onEscapeOutside={onEscapeOutside}>
              <TextField
                id="task_name"
                autoFocus
                onKeyDown={onPressEnter}
                value={task.task_name}
                onChange={handleChangeTaskName}
                variant="outlined"
                size="small"
                InputProps={{
                  className: classes.input
                }}
                inputProps={{ min: 0, style: { textAlign: 'center', fontSize: 15, height: 'auto', fontWeight: 500 } }}
                style={fullScreen ? { width: "60%" } : { width: "72%" }} />
            </EscapeOutside>
            :
            <div style={{ display: "flex" }}>
              <div style={
                fullScreen ?
                  { width: '20%', display: 'flex', justifyContent: 'space-between' } :
                  { width: "12%", display: 'flex', justifyContent: 'space-between' }
              }>
                <Tooltip title={task.completed ? "Mark as uncomplete" : "Mark as complete"}>
                  <Checkbox
                    checked={task.completed}
                    onChange={handleCompletedChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    style={{ padding: 5 }}
                  />
                </Tooltip>
                <Tooltip title="Delete this task">
                  <IconButton aria-label="delete"
                    style={{ padding: 5 }}
                    onClick={handleDeleteModal}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
                onClick={handleOpenTaskNameForm}
                style={
                  fullScreen ? { width: "60%" } : { width: "72%" }
                }
                className={classes.titleButton}
              >
                <Typography variant="h6" style={{ textAlign: 'center', color: 'white' }}>
                  {task.task_name}
                </Typography>
              </Button>
              {showEditIcon ?
                <div style={fullScreen ? { width: '20%' } : { width: "12%" }} className={classes.center}>
                  <EditIcon />
                </div>
                : <div style={fullScreen ? { width: '20%' } : { width: "12%" }}></div>}
            </div>
          }
          <div style={{ display: 'flex', marginLeft: 6, justifyContent: 'center' }}>
            <Typography style={{ fontSize: 10, color: 'white' }}>
              Created on Sun 15 May 2020 18:00
            </Typography>
          </div>
        </DialogTitle>
        <AntTabs variant="fullWidth" value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Properties" style={{ marginRight: 0 }} {...a11yProps(0)} />
          <AntTab label="Comments" style={{ marginRight: 0 }} {...a11yProps(1)} />
          {/* <AntTab label="Files" /> */}
        </AntTabs>
        <TabPanel value={value} index={0} style={
          fullScreen ?
            { minWidth: 10, height: '100%' } :
            { width: 580, height: 440 }
        } >
          <DialogContent dividers style={
            fullScreen ?
              { height: '100%' } :
              { height: '100%' }
          } >
            <TaskProperties
              project_id={props.project_id}
              task={task}
              roadmap={props.roadmap}
              handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
              handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
              handleCompletedChange={props.handleCompletedChange}
              tasksAssignedTo={props.tasksAssignedTo}
            />
          </DialogContent  >
        </TabPanel>
        <TabPanel value={value} index={1} style={
          fullScreen ?
            { minWidth: 10, height: '100%', } :
            { width: 580, height: 440, }
        } >
          <Divider />
          {/* {!fullScreen ?
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
             : */}
          <DialogContent style={{ height: '83%' }} >
            {/* {chat.map((chat, index) => {
                if (chat.task_id === props.task._id) return (
                  <Grid id={`item_${index + 1}`} key={index} item style={{ margin: '5px 0px' }}>
                    <TaskChatBubble chat={chat} />
                  </Grid>
                )
                return null;
              })} */}
          </DialogContent>
          {/* // } */}
          <Divider />
          {/* <DialogActions style={{ height: '12%' }}>
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
          </DialogActions> */}
        </TabPanel>
        <Typography className={classes.padding} />
        {/* </div>      */}
      </Dialog>
    </div >
  );
}