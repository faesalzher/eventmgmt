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
  Popover,
  Box
} from '@material-ui/core';
import EscapeOutside from "react-escape-outside"
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import { DatetimePicker } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { AvatarName } from 'components';
import { Assignees, AssigneeAvatar } from '.';
import {
  DELETE_TASK_ASSIGNED_TO,
  ORGANIZATION_QUERY,
  STAFF_QUERY
} from 'gql';

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
    paddingRight: 7,
  },
  assigned: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  colorSecondary: {
    color: theme.palette.secondary.main
  },
  colorRed: {
    color: 'red'
  },
  priorityBtn: {
    textTransform: 'none', width: '33%'
  },
  low: {
    backgroundColor: "#ffc916",
  },
  medium: {
    backgroundColor: "#a3cd3b",
  },
  high: {
    backgroundColor: "#ff4943",
    color: "#white"
  },
  not_defined: {
    backgroundColor: "#e4e4e4"
  },
  box: {
    width: 'fit-content',
    padding: '0px 16px',
  }
}
));


export default function TaskProperties(props) {
  const classes = useStyles();


  const [taskForm, setTaskForm] = useState(props.task);

  useEffect(() => {
    setTaskForm(props.task)
  }, [setTaskForm, props.task]);


  const [createdBy, setCreatedBy] = useState({ staff_name: "", organization_name: "" });

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
      setCreatedBy(dataStaff.staff);
    }
  }, [dataStaff])
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

  const [openPersonInCharges, setOpenPersonInCharges] = React.useState(false);

  const handleOpenPersonInCharges = () => {
    setOpenPersonInCharges(true);
  };

  const handleClosePersonInCharges = () => {
    setOpenPersonInCharges(false);
  };


  const [deleteTaskAssignedTo] = useMutation(DELETE_TASK_ASSIGNED_TO);

  const handleDeleteTaskAssignedTo = (e, id) => {
    props.handleDeleteTaskAssignedTo(e, id);
    deleteTaskAssignedTo({ variables: { _id: e, } });
  }
  console.log(props.user_access)

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
        (props.user_access) ?
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
          :
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            {taskForm.task_description}
          </Typography>
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
          {dataStaff ?
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
              (props.user_access) ?
                taskForm.due_date === "" ?
                  <Button onClick={handleOpenCalendar} variant="outlined" disableElevation size="small" color="secondary">
                    <AddIcon />
                  </Button>
                  :
                  <ButtonGroup variant="contained" size="small" color="secondary">
                    <Button onClick={handleOpenCalendar} style={mins >= 0 ? { backgroundColor: 'red', textTransform: "none" } : { textTransform: "none" }}>{taskForm.due_date}</Button>
                    <Button onClick={handleDeleteDueDate} style={mins >= 0 ? { backgroundColor: 'red' } : {}}><CloseIcon /></Button>
                  </ButtonGroup>
                :
                taskForm.due_date === "" ?
                  <Typography className={classes.verticalAlign} color="textSecondary" variant="body1">
                    not defined
                  </Typography>
                  :
                  <Typography style={{ fontWeight: 500 }}
                    className={[classes.verticalAlign, (mins >= 0 ? classes.colorRed : classes.colorSecondary)].join("")}
                    variant="body1">
                    {taskForm.due_date.slice(0, 21)}
                  </Typography>
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
            maxDate={moment(new Date(props.roadmap.end_date))}
            minDate={moment(new Date(props.roadmap.start_date))}
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
            <AssignmentIndIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Assigned To
          </Typography>
        </div>
        <div className={[classes.field, classes.assigned].join(" ")}>
          {
            props.tasksAssignedTo.map((taskAssignedTo, index) => {
              return <AssigneeAvatar
                type="chip"
                deleteButton={
                  (props.user_access) ?
                    true : false
                }
                key={index}
                handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
                taskAssignedTo={taskAssignedTo} />
            })
          }
          {
            (props.user_access) ?
              <Chip
                size="small"
                color="secondary"
                variant="outlined"
                clickable
                onClick={handleOpenPersonInCharges}
                icon={<AddIcon />}
                label="More"
              /> : <div>
                {props.tasksAssignedTo.length === 0 ?
                  <Typography className={classes.verticalAlign} color="textSecondary" variant="body1">
                    not defined
                </Typography>
                  :
                  <></>
                }
              </div>
          }
          <Assignees
            project_id={props.project_id}
            event_id={props.event_id}
            roadmap_id={props.roadmap_id}
            roadmap={props.roadmap}
            task={props.task}
            handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
            handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
            handleClosePersonInCharges={handleClosePersonInCharges}
            openPersonInCharges={openPersonInCharges}
            tasksAssignedTo={props.tasksAssignedTo}
          />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.label}>
          <div className={classes.verticalAlign} >
            <AssignmentLateIcon />
          </div>
          <Typography className={classes.verticalAlign} variant="body2">
            Priority
          </Typography>
        </div>
        <div className={classes.field}>
          {
            (props.user_access) ?
              <ButtonGroup variant="contained" style={{ width: '70%' }} size="small" aria-label="outlined primary button group">
                {taskForm.priority === "low" ?
                  <Button onClick={() => handleChangePriority('')} className={[classes.priorityBtn, classes.low].join(" ")}>Low</Button>
                  :
                  <Button onClick={() => handleChangePriority('low')} className={classes.priorityBtn}>Low</Button>
                }
                {taskForm.priority === "medium" ?
                  <Button onClick={() => handleChangePriority('')} className={[classes.priorityBtn, classes.medium].join(" ")}>Medium</Button>
                  :
                  <Button onClick={() => handleChangePriority('medium')} className={classes.priorityBtn}>Medium</Button>
                }
                {taskForm.priority === "high" ?
                  <Button onClick={() => handleChangePriority('')} className={[classes.priorityBtn, classes.high].join(" ")} style={{color:'white'}}>High</Button>
                  :
                  <Button onClick={() => handleChangePriority('high')} className={classes.priorityBtn}>High</Button>
                }
              </ButtonGroup>
              :
              taskForm.priority === "low" ?
                <Box borderRadius={4} className={[classes.low, classes.box].join(" ")}>
                  < Typography variant="h6">
                    Low
                 </Typography>
                </Box>
                :
                taskForm.priority === "medium" ?
                  <Box borderRadius={4} className={[classes.medium, classes.box].join(" ")}>
                    < Typography variant="h6">
                      Medium
               </Typography>
                  </Box>
                  :
                  taskForm.priority === "high" ?
                    <Box borderRadius={4} className={[classes.medium, classes.box].join(" ")}>
                      < Typography variant="h6" style={{ color: 'white' }}>
                        High
                      </Typography>
                    </Box>
                    :
                    <Box borderRadius={4} className={[classes.not_defined, classes.box].join(" ")}>
                      < Typography variant="h6">
                        not defined
                      </Typography>
                    </Box>
          }
        </div>
      </div>
    </div >
  );
}