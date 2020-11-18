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

import {
  TextField,
  // Grid,
  Checkbox, Tooltip, IconButton
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
// import SendIcon from '@material-ui/icons/Send';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import EscapeOutside from "react-escape-outside";
// import { Scrollbars } from 'react-custom-scrollbars';

import {
  TaskProperties,
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

export default function TaskDetailModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [taskNameForm, setTaskNameForm] = React.useState(false);
  const [task, setTask] = useState(props.task);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [deleteTaskAssignedTo] = useMutation(DELETE_TASK_ASSIGNED_TO);

  React.useEffect(() => {
    setTask(props.task)
  }, [setTask, props.task]);

 

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
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
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
                {
                  (props.project_comitee.position_id === '1' ||
                    props.project_comitee.position_id === '2' ||
                    props.project_comitee.position_id === '3' ||
                    props.project_comitee.position_id === '5' ||
                    props.project_comitee.position_id === '6' ||
                    props.decodedToken.user_type === "organization") ?
                    <Tooltip title="Delete this task">
                      <IconButton aria-label="delete"
                        style={{ padding: 5 }}
                        onClick={handleDeleteModal}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    :
                    <></>
                }

              </div>
              {
                (props.project_comitee.position_id === '1' ||
                  props.project_comitee.position_id === '2' ||
                  props.project_comitee.position_id === '3' ||
                  props.project_comitee.position_id === '5' ||
                  props.project_comitee.position_id === '6' ||
                  props.decodedToken.user_type === "organization") ?
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
                  :
                  <div className={classes.center} style={
                    fullScreen ? { width: "60%" } : { width: "76%" }
                  }>
                    <Typography variant="h6"
                      style={{ textAlign: 'center', color: 'white' }}>
                      {task.task_name}
                    </Typography>
                  </div>
              }
              {showEditIcon ?
                <div style={fullScreen ? { width: '20%' } : { width: "12%" }} className={classes.center}>
                  <EditIcon />
                </div>
                : <div style={fullScreen ? { width: '20%' } : { width: "12%" }}></div>}
            </div>
          }
          <div style={{ display: 'flex', marginLeft: 6, justifyContent: 'center' }}>
            <Typography style={{ fontSize: 10, color: 'white' }}>
              Created on {task.created_at.slice(0, 21)}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers style={
          fullScreen ?
            { height: '100%', minWidth: 10, } :
            { height: '100%', width: 580 }
        } >
          <TaskProperties
            project_id={props.project_id}
            task={task}
            roadmap={props.roadmap}
            handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
            handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
            handleCompletedChange={props.handleCompletedChange}
            tasksAssignedTo={props.tasksAssignedTo}
            project_comitee={props.project_comitee}
            decodedToken={props.decodedToken}
          />
        </DialogContent  >
        <Typography className={classes.padding} />
      </Dialog>
    </div >
  );
}