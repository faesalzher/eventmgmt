

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
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

import { useMutation} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
const ADD_EVENT = gql`
  mutation addEvent($_id: String!,$event_name: String!,$event_start_date: String!,$event_end_date: String!) {
    addEvent(_id: $_id,event_name: $event_name,event_start_date:$event_start_date,event_end_date:$event_end_date) {
      _id
      event_name
      event_start_date
      event_end_date
    }
  }
`;

const mongoose = require('mongoose');

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    margin: theme.spacing(2),
    marginRight: theme.spacing(0),
  },
  formControl: {
    minWidth: 50
  },
  formDate: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(0),

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
    width: 700,
    // minWidth: 20
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export default function AddEventModal(props){
  const classes = useStyles();
  const initialFormState =
  {
    _id: mongoose.Types.ObjectId(),
    status: "No Status",
    event_name: "",
    description:"",
    event_start_date: new Date().toString(),
    event_end_date: new Date().toString(),
  };

  const [events, setEvents] = useState(initialFormState);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

 
  // console.log(data);
  const handleDate = e => {
    setDate([e.selection])
    events.event_start_date = e.selection.startDate.toString();
    events.event_end_date = e.selection.endDate.toString();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setEvents({ ...events, [id]: value });
  };
  // console.log(events);
  // const handleSelectStatus = e => {
  //   events.status = e.target.value;
  //   setEvents({ ...events, status: events.status });
  // }

  const [addEvent] = useMutation(ADD_EVENT);
  const handleButton = e => {
    console.log('aa');
    props.onCloseListener();
    e.preventDefault();
    props.addEvent(events);
    addEvent(
      {
        variables:
        {
          _id: events._id,
          event_name: events.event_name,
          // status: events.status,
          event_start_date: events.event_start_date,
          event_end_date: events.event_end_date,
        }
      });
    setEvents(initialFormState);
  };


  return (
    <Dialog
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
        Add New Event
        </DialogTitle>
      <DialogContent dividers>
        <form noValidate style={{ display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} >
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="event_name"
                label="Event Name"
                type="text"
                variant="outlined"
                value={events.event_name}
                onChange={handleInputChange}
              />
                  <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                value={events.description}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* <FormControl className={classes.formControl}>
              <TextField
                select
                margin="dense"
                label="Status"
                id="status"
                variant="outlined"
                value={events.status}
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
            </FormControl> */}
            {/* <FormControl className={classes.formControl}>
              <TextField
                select
                margin="dense"
                label="Organization"
                id="organization"
                variant="outlined"
                required
                value={events.organization}
                onChange={handleSelectOrganization}
              >
                {organizations.map((organization, index) => (
                  <MenuItem
                    margin="dense"
                    key={organization._id}
                    value={organization.organization_name}
                  >
                    {organization.organization_name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl> */}
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
        <Button autoFocus color="primary" onClick={handleButton}>
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEventModal.propTypes = {
  className: PropTypes.string
};



