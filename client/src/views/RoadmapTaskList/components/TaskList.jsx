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
  Chip,
  Tooltip,
  LinearProgress,
  Popover,
  List,
  Menu,
  MenuItem,
  Avatar,
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

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  {
    _id: 0,
    task_name: 'Beli Makana',
    division_id: "4c321960-9cca-11ea-b4b7-7959c72c83ff",
    priority: "low",
    due_date: "Mon Mar 16 2020 19:33",
    task_description: "Ini Deskripsi",
    roadmap_id: '0',
    completed: false,
    completed_date: ""
  },
  {
    _id: 1,
    task_name: 'Beli 4',
    division_id: "aa6f98a0-a3e5-11ea-b1ac-37db3ef8a8bb",
    priority: "high",
    roadmap_id: '0',
    completed: true,
    task_description: "",
    due_date: "",
    completed_date: "Sun Mar 15 2020 11:44:34 GMT+0700 (Western Indonesia Time)"
  },]


const ITEM_HEIGHT = 48;

const COMITEESBYPROJECT_QUERY = gql`
  query comiteesByProject($project_id: String!){
     comiteesByProject(project_id:$project_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;

const STAFFS_QUERY = gql`
{
  staffs{
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
  }
}
`;

export default function TaskList(props) {
  const [countUncompleted, setCountUncompleted] = React.useState(0);
  const [countCompleted, setCountCompleted] = React.useState(0);
  const [countTaskDivision, setCountTaskDivision] = React.useState(0);

  const classes = useStyles();

  // const date = moment();
  const [moments, setMoments] = React.useState(moment);
  const [tasks, setTasks] = React.useState(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElAssigned, setAnchorElAssigned] = React.useState(null);

  const [comitees, setComitees] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const openAssigned = Boolean(anchorElAssigned);
  const tasksByRoadmap = (tasks.filter(function (task) {
    if (task.roadmap_id === props.roadmap_id) {
      return task
    }
    return null;
  }));


  const [addTaskForm, setAddTaskForm] = React.useState(false)
  const [assignedForm, setAssignedForm] = React.useState([])
  const [dueDateIsNull, setDueDateIsNull] = React.useState(true)

  const { data: comiteesData, refetch: comiteesRefetch } = useQuery(COMITEESBYPROJECT_QUERY, {
    variables: { project_id: props.project_id },
    onCompleted: () => {
      setComitees(
        comiteesData.comiteesByProject
      )
    }
  }
  );

  const { data: staffsData, refetch: staffsRefetch } = useQuery(STAFFS_QUERY, {
    onCompleted: () => {
      setStaffs(
        staffsData.staffs
      )
    }
  }
  );

  // const staffsByComitee = (comitees.filter(function (comitee) {
  //   staffs.map((staff) => {
  //     if (comitee.staff_id === staff._id) {
  //       return staff
  //     }
  //   })
  // }));

  console.log(comitees)
  // console.log(staffsByComitee)

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    staffsRefetch();
    comiteesRefetch();
  };

  const initialFormState =
  {
    _id: mongoose.Types.ObjectId(),
    task_name: "",
    division_id: props.division._id,
    priority: "",
    roadmap_id: props.roadmap_id,
    completed: false,
    task_description: "",
    due_date: "",
    completed_date: ""
  };

  const [taskForm, setTaskForm] = useState(initialFormState);

  const handleInputChange = e => {
    const { id, value } = e.target;
    setTaskForm({ ...taskForm, [id]: value });
  };

  const handleCompletedChange = (e, index) => {
    const newArr = [...tasks];
    newArr[index] = e;
    setTasks(newArr)
  };

  const handleSaveButton = () => {
    setTasks([...tasks, taskForm]);
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

  const handleSelectAssigned = (comitee_id, staff_name) => {
    setAssignedForm([...assignedForm, { comitee_id: comitee_id, staff_name: staff_name }]);
    // console.log(moments_d);
    handleCloseAssigned();
  };

  const handleDeleteDueDate = () => {
    taskForm.due_date = "";
    setDueDateIsNull(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleCloseAssigned = () => {
    setAnchorElAssigned(null);
  };

  const handleOpenAssigned = (event) => {
    setAnchorElAssigned(event.currentTarget);
  };

  const openCalendar = Boolean(anchorEl);
  const id = openCalendar ? 'simple-popover' : undefined;


  React.useEffect(() => {
    const countUncompleted = tasksByRoadmap.filter((e) => e.completed === false && props.division._id === e.division_id).length;
    setCountUncompleted(countUncompleted);
    const countCompleted = tasksByRoadmap.filter((e) => e.completed === true && props.division._id === e.division_id).length;
    setCountCompleted(countCompleted);
    const countTaskDivision = tasksByRoadmap.filter((e) => props.division._id === e.division_id).length;
    setCountTaskDivision(countTaskDivision);
  }, [tasksByRoadmap, props.division._id])

  console.log(assignedForm.length)
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
            <Typography variant="h6" style={{ fontSize: 15, fontWeight: 400, }}>{props.division.division_name}</Typography>
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
                <div style={dueDateIsNull && assignedForm.length === 0 ? { display: 'flex', justifyContent: 'space-between' } : {}}>
                  <div style={dueDateIsNull && assignedForm.length === 0 ? { display: 'flex', justifyContent: 'space-between' } : {}}>
                    {dueDateIsNull ?
                      <div>
                        <IconButton className={classes.iconbutton} style={{ margin: '0px 4px' }} onClick={handleOpenCalendar}>
                          <CalendarTodayIcon style={{ fontSize: 14 }} />
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
                    <div stle={{ display: 'flex' }} >
                      <IconButton
                        className={classes.iconbutton}
                        style={{ margin: '0px 4px' }}
                        onClick={handleOpenAssigned}
                        aria-controls="long-menu"
                        aria-haspopup="true"
                      >
                        <PersonAddIcon style={{ fontSize: 14 }} />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorElAssigned}
                        keepMounted
                        open={openAssigned}
                        onClose={handleCloseAssigned}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        {comitees.map((comitee) => (
                          staffs.map((staff) => {
                            if (staff._id === comitee.staff_id) {
                              if (assignedForm.length === 0) {
                                return <MenuItem key={comitee._id} onClick={() => handleSelectAssigned(comitee._id, staff.staff_name)}>
                                  {staff.staff_name}
                                </MenuItem>
                              }
                            } else {
                              assignedForm.map((assigned) => {
                                return <div>{assigned.comitee_id}</div>
                              })
                            }
                            return null;
                          })))}
                      </Menu>
                      {assignedForm.map((assigned, index) => {
                        return <Chip
                          size="small"
                          avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                          label={assigned.staff_name}
                          clickable
                          variant='outlined'
                          color="primary"
                          onClick={() => console.log('succes')}
                          onDelete={() => console.log('succes')}
                        />
                      })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" style={{ color: 'grey' }} onClick={() => { setAddTaskForm(false); setTaskForm(initialFormState) }}>Cancel</Button>
                    {(taskForm.task_name === "") ?
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
            <List style={{ backgroundColor: "#d8dce3", padding: 0 }} component="nav" aria-label="main mailbox folders" >
              {tasksByRoadmap.map((task, index) => {
                if (props.division._id === task.division_id && !task.completed)
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
                    style={{ fontSize: 13, fontWeight: 410, padding: '4px 10px' }}>
                    Completed tasks</Typography>
                </div>
              }
              {tasksByRoadmap.map((task, index) => {
                if (props.division._id === task.division_id && task.completed)
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