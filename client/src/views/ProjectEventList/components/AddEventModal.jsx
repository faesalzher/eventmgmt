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

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

import uuid from 'uuid/v1';

const ADD_EVENT = gql`
  mutation addEvent(
    $_id: String!,
    $event_name: String!,
    $event_description: String!,
    $event_location: String!,
    $cancel: String!,
    $event_start_date: String!,
    $event_end_date: String!,
    $picture:String!,
    $project_id:String!
    ) {
    addEvent(
      _id: $_id,
      event_name: $event_name,
      event_description: $event_description,
      event_location: $event_location,
      cancel:$cancel,
      event_start_date:$event_start_date,
      event_end_date:$event_end_date,
      picture:$picture,
      project_id:$project_id
      ) {
      _id
      event_name
      event_description
      event_location
      cancel
      event_start_date
      event_end_date
      picture
      project_id
    }
  }
`;


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



export default function AddEventModal(props) {
  const classes = useStyles();
  const initialFormState =
  {
    _id: uuid(),
    event_name: "",
    event_description: "",
    event_location: "",
    cancel: "false",
    event_start_date: new Date().toString(),
    event_end_date: new Date().toString(),
    picture: "",
    project_id: props.project_id,
  };

  const [eventForm, setEventForm] = useState(initialFormState);

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
    eventForm.event_start_date = e.selection.startDate.toString();
    eventForm.event_end_date = e.selection.endDate.toString();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setEventForm({ ...eventForm, [id]: value });
  };

  const [addEvent] = useMutation(ADD_EVENT);
  const handleButton = e => {
    props.onCloseListener();
    props.addEvent(eventForm);
    addEvent(
      {
        variables:
        {
          _id: eventForm._id,
          event_name: eventForm.event_name,
          event_description: eventForm.event_description,
          event_location: eventForm.event_location,
          cancel: eventForm.cancel,
          event_start_date: eventForm.event_start_date,
          event_end_date: eventForm.event_end_date,
          picture: eventForm.picture,
          project_id: eventForm.project_id,
        }
      });
    setEventForm(initialFormState);
    console.log(eventForm)
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
                value={eventForm.event_name}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="event_description"
                multiline
                rowsMax={9}
                label="Description"
                type="text"
                variant="outlined"
                value={eventForm.event_description}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="event_location"
                label="Location"
                type="text"
                variant="outlined"
                value={eventForm.event_location}
                onChange={handleInputChange}
              />
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