import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  InputBase,
  Chip,
  Tooltip,
  LinearProgress,
  Popover,
  List,
} from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
// import CustomScroll from 'react-custom-scroll';
import { Scrollbars } from 'react-custom-scrollbars';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DatetimePicker } from 'rc-datetime-picker';
import moment from 'moment';
import 'rc-datetime-picker/dist/picker.css';


import {
  Task
} from '.';

const useStyles = makeStyles({
  root: {
    width: 275,
    marginRight: 20,
    // marginBottom: 150,
    // height:200,
    minHeight: 70,
    // height: 400,
    // maxHeight: 500,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconbutton: {
    padding: 0
  }
});
const mongoose = require('mongoose');
const data = [
  { _id: 0, name: 'Beli Makana', id_division: 0, priority: "low", due_date: "Mon Mar 16 2020 19:33", description: "Ini Deskripsi", completed: false, completed_date: "" },
  { _id: 1, name: 'Beli 4', id_division: 1, priority: "high", completed: true, description: "", due_date: "", completed_date: "Sun Mar 15 2020 11:44:34 GMT+0700 (Western Indonesia Time)" },]
export default function TaskList(props) {
  const [countUncompleted, setCountUncompleted] = React.useState(0);
  const [countCompleted, setCountCompleted] = React.useState(0);
  const [countTaskDivision, setCountTaskDivision] = React.useState(0);

  const classes = useStyles();

  // const date = moment();
  const [moments, setMoments] = React.useState(moment);
  const [taskData, setTaskData] = React.useState(data);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [addTaskForm, setAddTaskForm] = React.useState(false)
  const [dueDateIsNull, setDueDateIsNull] = React.useState(true)

  const initialFormState =
  {
    key: mongoose.Types.ObjectId(),
    name: "",
    id_division: props.division._id,
    due_date: "",
    description: "",
    completed: false,
    completed_date: "",
    priority: "",
  };
  const [taskForm, setTaskForm] = useState(initialFormState);

  const handleInputChange = e => {
    const { id, value } = e.target;
    setTaskForm({ ...taskForm, [id]: value });
  };

  const handleCompletedChange = (e, index) => {
    const newArr = [...taskData];
    newArr[index] = e;
    setTaskData(newArr)
  };

  const handleSaveButton = () => {
    setTaskData([...taskData, taskForm]);
    setTaskForm(initialFormState);
    setDueDateIsNull(true);
  }

  const handleOpenCalendar = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectDate = e => {
    setMoments(e);
    // console.log(moments_d);
  };
  const handleSetDueDate = e => {
    taskForm.due_date = moments._d.toString().slice(0, 21);
    setMoments(moments)
    // console.log(e._d);
    handleClose();
    setDueDateIsNull(false);
  };


  const handleDeleteDueDate = () => {
    taskForm.due_date = "";
    setDueDateIsNull(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const openCalendar = Boolean(anchorEl);
  const id = openCalendar ? 'simple-popover' : undefined;


  React.useEffect(() => {
    const countUncompleted = taskData.filter((e) => e.completed === false && props.division._id === e.id_division).length;
    setCountUncompleted(countUncompleted);
    const countCompleted = taskData.filter((e) => e.completed === true && props.division._id === e.id_division).length;
    setCountCompleted(countCompleted);
    const countTaskDivision = taskData.filter((e) => props.division._id === e.id_division).length;
    setCountTaskDivision(countTaskDivision);
  }, [taskData, props.division._id])

  return (
    <Card className={classes.root} elevation={0} >
      <div>
        <div
          style={{
            backgroundColor: 'orange',
            color: 'white',
            padding: 10,
            paddingLeft: 13,
            paddingRight: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" style={{ fontSize: 15, fontWeight: 400, }}>{props.division.name}</Typography>
            <div style={{ display: "flex" }}>
              <Tooltip title="Add New Task" arrow>
                <IconButton style={{ padding: 0 }} onClick={() => { setAddTaskForm(true) }}>
                  <AddIcon style={{ fontSize: 20, }} />
                </IconButton>
              </Tooltip>
              <div style={{ paddingLeft: 10 }}>
                <IconButton style={{ padding: 0 }}>
                  <MoreVertIcon style={{ fontSize: 20 }} />
                </IconButton>
              </div>
            </div>
          </div>
          {addTaskForm ? (
            <>
              <Paper variant="outlined" square style={{ marginTop: 10, padding: "0px 5px" }}>
                <InputBase
                  id="name"
                  // variant="outlined"
                  placeholder="new tasks"
                  size="small"
                  fullWidth
                  multiline
                  rowsMin="3"
                  value={taskForm.name}
                  onChange={handleInputChange}
                  style={{ fontSize: 15 }}
                />
                <Divider />
                <div style={
                  dueDateIsNull ?
                    { display: 'flex', justifyContent: 'space-between' }
                    :
                    {}
                }>
                  {dueDateIsNull ?
                    <div>
                      <IconButton className={classes.iconbutton} onClick={handleOpenCalendar}>
                        <CalendarTodayIcon style={{ fontSize: 14 }} />
                      </IconButton>
                      <IconButton className={classes.iconbutton} style={{ paddingLeft: 4 }} onClick={handleOpenCalendar}>
                        <PersonAddIcon style={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                    :
                    <Chip
                      variant="outlined"
                      size="small"
                      color="primary"
                      icon={<CalendarTodayIcon style={{ fontSize: 9 }} />}
                      label={taskForm.due_date}
                      onClick={handleOpenCalendar}
                      onDelete={() => handleDeleteDueDate()}
                    />
                  }

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" style={{ color: 'grey' }} onClick={() => { setAddTaskForm(false); setTaskForm(initialFormState) }}>Cancel</Button>
                    {(taskForm.name === "") ?
                      <Button size="small" disabled >Create</Button>
                      :
                      <Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveButton()}>Create</Button>
                    }
                  </div>
                </div>

              </Paper>
            </>)
            : null
          }
          <Popover
            id={id}
            open={openCalendar}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <DatetimePicker
              moment={moments}
              showCalendarPicker={true}
              onChange={handleSelectDate}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSetDueDate}>Set Due Date</Button>
            </div>
          </Popover>
        </div>
        <Scrollbars style={{ width: 275 }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          thumbMinSize={30}
          autoHeight
          autoHeightMax={350}
        >
          <CardContent style={{ padding: 0, backgroundColor: "#d8dce3" }} >
            <List style={{ backgroundColor: "#d8dce3",padding:0}} component="nav" aria-label="main mailbox folders" >
              {taskData.map((task, index) => {
                if (props.division._id === task.id_division && !task.completed)
                  return <div>
                  <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                  <Task
                    task={task}
                    key={index}
                    index={index}
                    handleCompletedChange={handleCompletedChange}
                  />
                </div>
                return null;
              })}
              <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
              {countCompleted === 0 ? <></> :
                <div style={{ backgroundColor: "#e2e2e2" }}>
                  <Typography variant="h6"
                    style={{ fontSize: 13, fontWeight: 410,padding: '4px 10px' }}>
                    Completed tasks</Typography>
                </div>
              }
              {taskData.map((task, index) => {
                if (props.division._id === task.id_division && task.completed)
                  return <div>
                  <Task
                    task={task}
                    key={index}
                    index={index}
                    handleCompletedChange={handleCompletedChange}
                  />
                  <div style={{ backgroundColor: "#d8dce3", height: 4 }} />
                </div>
                return null;
              })}
            </List>
          </CardContent>
        </Scrollbars>
      </div>
      <div
        style={{
          backgroundColor: 'orange',
          color: 'white',
          padding: 6,
          paddingLeft: 13,
          paddingRight: 10,
        }}
      >
        {countTaskDivision === 0 ?
          <LinearProgress style={{ marginTop: 4 }} variant="determinate" value={0} />
          :
          <LinearProgress style={{ marginTop: 4 }} variant="determinate" value={(countCompleted / countTaskDivision) * 100} />
        }
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ marginBottom: 4, fontSize: 10, fontWeight: 300, alignItems: 'right' }}>
            {countUncompleted} active task
        </Typography>
          <Typography style={{ marginBottom: 4, fontSize: 10, fontWeight: 300, alignItems: 'right' }}>
            {countCompleted}/{countTaskDivision} task completed
        </Typography>
        </div>
      </div>
    </Card >
  );
}