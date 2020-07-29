import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Divider,
  TextareaAutosize,
  ButtonGroup,
  Chip,
  Avatar,
  Popover
} from '@material-ui/core';
import EscapeOutside from "react-escape-outside"
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import { DatetimePicker } from 'rc-datetime-picker';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  row: {
    display: "flex",
    padding: 20
  },
  label: {
    width: '30%',
    display: 'flex'
  },
  field: {
    width: '70%',
  },
  verticalAlign: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 7,
  }
});

export default function TaskProperties(props) {
  const classes = useStyles();


  const [taskForm, setTaskForm] = useState(props.task);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showEditIcon, setShowEditIcon] = React.useState(false);
  const [descriptionForm, setDescriptionForm] = React.useState(false);
  const dueDate = new Date(taskForm.due_date);
  const todayDate = new Date();
  const msec = (todayDate - dueDate);
  const mins = Math.floor(msec / 60000);
  const due_date = () => {
    if (taskForm.due_date === "") {
      return moment()
    } else {
      return moment(new Date(taskForm.due_date))
    }
  }
  const [moments, setMoments] = React.useState(due_date);
  const handleOpenDescriptionForm = () => {
    setDescriptionForm(true);
  };
  const handleCloseDescriptionForm = () => {
    setDescriptionForm(false);
  };
  const handleChangeTask = e => {
    const { id, value } = e.target;
    setTaskForm({ ...taskForm, [id]: value });
  };
  const handleCompletedChange = () => {
    props.handleCompletedChange(taskForm);
  }
  const onEscapeOutside = (e) => {
    handleCloseDescriptionForm();
    handleCompletedChange();
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleCompletedChange();
      handleCloseDescriptionForm();
    }
  }
  const handleSelectDate = e => {
    setMoments(e);
    // console.log(moments_d);
  };
  const handleSetDueDate = e => {
    taskForm.due_date = moments._d.toString().slice(0, 21);
    setMoments(moments)
    handleCloseCalendar();
    props.handleCompletedChange(taskForm);
  };
  const handleDeleteDueDate = () => {
    taskForm.due_date = "";
    setTaskForm({ ...taskForm, due_date: "" });
    setMoments(moments)
    console.log(taskForm)
  }

  const handleOpenCalendar = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };
  const openCalendar = Boolean(anchorEl);
  const id = openCalendar ? 'simple-popover' : undefined;


  const handleChangePriority = e => {
    taskForm.priority = e;
    setTaskForm({ ...taskForm, priority: e });
    props.handleCompletedChange(taskForm);
  };

  return (
    <div>
      {descriptionForm ?
        <EscapeOutside onEscapeOutside={onEscapeOutside}>
          <TextareaAutosize autoFocus aria-label="empty textarea"
            onKeyDown={onPressEnter}
            value={taskForm.task_description}
            id="task_description"
            onChange={handleChangeTask}
            placeholder="Add A Description"
            style={{ width: "-webkit-fill-available", minHeight: 27, fontSize: 15, }} />
        </EscapeOutside>
        :
        <Button
          elevation={0}
          size="small"
          onClick={handleOpenDescriptionForm}
          onMouseEnter={() => setShowEditIcon(true)}
          onMouseLeave={() => setShowEditIcon(false)}
          style={{ justifyContent: "space-between", display: 'flex', textTransform: "none", marginBottom: 10, width: "-webkit-fill-available" }}>
          {taskForm.task_description === "" ?
            <Typography variant="body2" style={{ color: 'blue' }}>
              Add a Description
            </Typography>
            :
            <Typography variant="body2" style={{ textAlign: 'left' }}>
              {taskForm.task_description}
            </Typography>
          }
          {showEditIcon ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <EditIcon style={{ fontSize: 19 }} /></div> : <div style={{ width: "10%" }}></div>}
        </Button>
      }
      <Divider />
      <div className={classes.row}>
        <div className={classes.label}>
          <div className={classes.verticalAlign} >
            <CalendarTodayIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Due Date
          </Typography>
        </div>
        <div className={classes.field}>
          {taskForm.due_date === "" ?
            <Button onClick={handleOpenCalendar} variant="contained" size="small" color="primary">
              <AddIcon />
            </Button>
            :
            <ButtonGroup variant="contained" size="small" color="primary">
              <Button onClick={handleOpenCalendar} style={mins >= 0 ? { backgroundColor: 'red', textTransform: "none" } : { textTransform: "none" }}>{taskForm.due_date}</Button>
              <Button onClick={handleDeleteDueDate} style={mins >= 0 ? { backgroundColor: 'red' } : {}}><CloseIcon /></Button>
            </ButtonGroup>
          }

        </div>
        <Popover
          id={id}
          open={openCalendar}
          anchorEl={anchorEl}
          onClose={handleCloseCalendar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <DatetimePicker
            moment={moments}
            onChange={handleSelectDate}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSetDueDate}>Set Due Date</Button>
          </div>
        </Popover>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>
          <div className={classes.verticalAlign} >
            <PeopleIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Assigned To
          </Typography>
        </div>
        {/* <Button variant="contained" size="small" ><AddIcon/></Button> */}
        <div className={classes.field}>
          <Chip
            size="small"
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Skinnyfabs"
            clickable
            variant='outlined'
            color="primary"
            onClick={() => console.log('succes')}
            onDelete={() => console.log('succes')}
          />
          <Chip
            size="small"
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Danarjon"
            clickable
            variant='outlined'
            color="primary"
            onClick={() => console.log('succes')}
            onDelete={() => console.log('succes')}
          />
          <Chip
            size="small"
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Ahmad Sobari"
            clickable
            variant='outlined'
            color="primary"
            onClick={() => console.log('succes')}
            onDelete={() => console.log('succes')}
          />
          <Chip
            size="small"
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Bambang"
            clickable
            variant='outlined'
            color="primary"
            onClick={() => console.log('succes')}
            onDelete={() => console.log('succes')}
          />
          <Chip
            size="small"
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Dimas"
            clickable
            variant='outlined'
            color="primary"
            onClick={() => console.log('succes')}
            onDelete={() => console.log('succes')}
          />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.label}>
          <div className={classes.verticalAlign} >
            <PeopleIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Priority
          </Typography>
        </div>
        {/* <Button variant="contained" size="small" ><AddIcon/></Button> */}
        <div className={classes.field}>
          <ButtonGroup variant="contained" style={{ width: '70%' }} size="small" aria-label="outlined primary button group">
            {taskForm.priority === "low" ?
              <Button onClick={() => handleChangePriority('')} style={{ backgroundColor: "#ffc916", textTransform: 'none', width: '33%', }}>Low</Button>
              :
              <Button onClick={() => handleChangePriority('low')} style={{ width: '33%', textTransform: 'none' }}>Low</Button>
            }
            {taskForm.priority === "medium" ?
              <Button onClick={() => handleChangePriority('')} style={{ backgroundColor: "#a3cd3b", width: '33%', textTransform: 'none' }}>Medium</Button>
              :
              <Button onClick={() => handleChangePriority('medium')} style={{ width: '33%', textTransform: 'none' }}>Medium</Button>
            }
            {taskForm.priority === "high" ?
              <Button onClick={() => handleChangePriority('')} style={{ backgroundColor: "#ff4943", width: '33%', color: "white", textTransform: 'none' }} >High</Button>
              :
              <Button onClick={() => handleChangePriority('high')} style={{ width: '33%', textTransform: 'none' }}>High</Button>
            }
          </ButtonGroup>
        </div>
      </div>
    </div >
  );
}