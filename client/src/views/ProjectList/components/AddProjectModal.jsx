

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
  Typography,
  IconButton,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ADD_PROJECT = gql`
  mutation addProject($_id: String!,$project_name: String!,$status: String!,$project_start_date: String!,$project_end_date: String!,$head_of_project_id:String!) {
    addProject(_id: $_id,project_name: $project_name,status:$status,project_start_date:$project_start_date,project_end_date:$project_end_date,head_of_project_id:$head_of_project_id) {
      _id
      project_name
      status
      project_start_date
      project_end_date
      head_of_project_id
    }
  }
`;
const STAFFS_QUERY = gql`
{
  staffs{
    _id
    staff_name
  }
}
`;
const mongoose = require('mongoose');

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // width: '50%',
    margin: theme.spacing(2),
    marginTop: 0,
    // marginRight: theme.spacing(0),
  },
  formControl: {
    // minWidth: 50
    width: "100%"
  },
  formDate: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(0),
    width: "100%"
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
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
      <Typography variant="h6" style={{ textAlign: "center" }}>{children}</Typography>
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
    // width: 700,
    // minWidth: 20
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export default function AddProjectModal (props){
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const initialFormState =
  {
    _id: mongoose.Types.ObjectId(),
    status: "No Status",
    project_name: "",
    description:"",
    project_start_date: new Date().toString(),
    project_end_date: new Date().toString(),
    head_of_project_id: ""
  };

  const [projects, setProjects] = useState(initialFormState);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [save, setSave] = useState(false)
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    refresh();
  });
  const { loading, error, data, refetch } = useQuery(STAFFS_QUERY);
  useEffect(() => {
    const onCompleted = (data) => { setStaffs(data.staffs) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);
  const refresh = () => {
    refetch();
  };
  // console.log(data);
  const handleDate = e => {
    setDate([e.selection])
    projects.project_start_date = e.selection.startDate.toString();
    projects.project_end_date = e.selection.endDate.toString();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setProjects({ ...projects, [id]: value });
  };

  const handleSelectStatus = e => {
    projects.status = e.target.value;
    setProjects({ ...projects, status: projects.status });
  }

  const handleSelectStaff = e => {
    projects.head_of_project_id = e.target.value;
    setProjects({ ...projects, head_of_project_id: projects.head_of_project_id });
  }
  const timer = React.useRef();
  console.log(projects)
  React.useEffect(() => {
    const clear = () => {
      clearTimeout(timer.current);
    }
    return clear();
  }, []);

  const [addProject] = useMutation(ADD_PROJECT);
  const handleButton = e => {
    setSave(true)
    setTimeout(() => {
      props.addProject(projects);

      props.onCloseListener();
      // e.preventDefault();
      addProject(
        {
          variables:
          {
            _id: projects._id,
            project_name: projects.project_name,
            status: projects.status,
            project_start_date: projects.project_start_date,
            project_end_date: projects.project_end_date,
            head_of_project_id: projects.head_of_project_id
          }
        });
      setProjects(initialFormState);
    }, 400);
    setTimeout(() => {
      setSave(false)
    }, 400);

  };


  return (
    <Dialog
      fullScreen={fullScreen}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.openListener}
      onClose={props.onCloseListener}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth={false}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.onCloseListener}>
        Add New Project
        </DialogTitle>
      <DialogContent dividers style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} style={fullScreen ? {} : { width: '50%' }}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="project_name"
                label="Project Name"
                type="text"
                variant="outlined"
                value={projects.project_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                value={projects.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                select
                margin="dense"
                label="Status"
                id="status"
                variant="outlined"
                value={projects.status}
                onChange={handleSelectStatus}
              >
                {props.sc.map((color, index) => (
                  <MenuItem
                    key={color.id}
                    value={color.status}
                  >
                    {color.status}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                select
                margin="dense"
                label="Head of the project"
                id="head_of_project_id"
                variant="outlined"
                required
                value={projects.head_of_project_id}
                onChange={handleSelectStaff}
              >
                {staffs.map((staff, index) => (
                  <MenuItem
                    margin="dense"
                    key={staff._id}
                    value={staff._id}
                  >
                    {staff.staff_name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formDate}>
              <DateRange
                onChange={handleDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        {save ? <CircularProgress size={20} /> : <div></div>}
        <Button autoFocus color="primary" onClick={handleButton}>
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
};

AddProjectModal.propTypes = {
  className: PropTypes.string
};



