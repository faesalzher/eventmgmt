import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Divider,
  TextField,
  ButtonGroup,
  Chip,
  Avatar,
  Popover
} from '@material-ui/core';
import EscapeOutside from "react-escape-outside"
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleIcon from '@material-ui/icons/People';
import { DatetimePicker } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AvatarName } from 'components';

const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      email
      organization_name
      picture
    }
  }
`;

const STAFF_QUERY = gql`
  query staffById($staff_id: String!) {
    staffById(_id: $staff_id) {
      _id
      staff_name
      email
      position_name
      picture
    }
  }
`;

const useStyles = makeStyles(theme => ({
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
  },
  assigned: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

export default function TaskProperties(props) {
  const classes = useStyles();


  const [taskForm, setTaskForm] = useState(props.task);

  useEffect(() => {
    setTaskForm(props.task)
  }, [setTaskForm, props.task]);


  const [createdBy, setCreatedBy] = useState([]);

  const [staff, { data: dataStaff }] = useLazyQuery(STAFF_QUERY, {
    variables: { staff_id: taskForm.created_by },
  });

  const { data: dataOrganization, refetch: refetchOrganization } = useQuery(
    ORGANIZATION_QUERY,
    {
      variables: { _id: taskForm.created_by },
      onCompleted: () => {
        if (dataOrganization.organization !== null) {
          setCreatedBy(dataOrganization.organization);
        } else {
          staff();
        }
      },
    }
  );



  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    refetchOrganization();
  }

  useEffect(() => {
    if (dataStaff) {
      setCreatedBy(dataStaff.staffById);
    }
  }, [dataStaff])

  console.log(taskForm.created_by)
  console.log(dataOrganization)
  console.log(createdBy)
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
          <TextField
            id="task_description"
            label="Description"
            autoFocus
            onKeyDown={onPressEnter}
            multiline
            rowsMax={4}
            value={taskForm.task_description}
            onChange={handleChangeTask}
            variant="outlined"
            size="small"
            style={{ width: "-webkit-fill-available", fontSize: 17, }}
          />
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
            <Typography variant="body1" color="secondary">
              Add a Description
            </Typography>
            :
            <Typography variant="body1" style={{ textAlign: 'left' }}>
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
            <AddCircleOutlineIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Created by
          </Typography>
        </div>
        <div className={classes.field}>
          {createdBy.__typename === "Staff" ?
            <AvatarName
              name={createdBy.staff_name}
              picture={createdBy.picture}
            />
            :
            <AvatarName
              name={createdBy.organization_name}
              picture={createdBy.picture}
            />
          }
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.label}>
          <div className={classes.verticalAlign} >
            <CalendarTodayIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            {taskForm.completed === true ? "Completed On" : "Due Date"}
          </Typography>
        </div>
        <div className={classes.field}>
          {
            taskForm.completed === true ?
              <Typography className={classes.verticalAlign} style={{ fontWeight: 500 }} variant="body1">
                {taskForm.completed_date.slice(0, 21)}
              </Typography>
              :
              taskForm.due_date === "" ?
                <Button onClick={handleOpenCalendar} variant="outlined" disableElevation size="small" color="secondary">
                  <AddIcon />
                </Button>
                :
                <ButtonGroup variant="contained" size="small" color="secondary">
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
        <div className={[classes.field, classes.assigned].join(" ")}>
          <Chip
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Skinnyfabs"
            size="small"
            color="primary"
            variant="outlined"
            onDelete={() => console.log('succes')}
          />
          <Chip
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Danarjon"
            color="primary"
            size="small"
            variant="outlined"
            onDelete={() => console.log('succes')}
          />
          <Chip
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
            label="Ahmad Sobari"
            color="primary"
            variant="outlined"
            size="small"
            onDelete={() => console.log('succes')}
          />
          {/* <Chip
            size="small"
            clickable
            onClick={()=>console.log('do ')}
            label={<AddIcon />}
          /> */}
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