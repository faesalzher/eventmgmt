

import React, { useState, useEffect } from 'react';
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
  Box,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormControl from '@material-ui/core/FormControl';

import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
// import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AdjustIcon from '@material-ui/icons/Adjust';
import { Redirect } from 'react-router';

import {
  DeleteForm,
  CancelForm
} from 'components';

const EDIT_EVENT = gql`
  mutation editEvent(
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
    editEvent(
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

const DELETE_EVENT = gql`
mutation deleteEvent ($_id: String!) {
  deleteEvent(_id:$_id){
    _id
  }
}
`;

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

export default function EventEditModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const today = new Date()

  const [eventForm, setEventForm] = React.useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    setEventForm(props.event)
  }, [setEventForm, props.event])

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  useEffect(() => {
    if (eventForm.event_start_date !== undefined) {
      setDate([
        {
          startDate: new Date(eventForm.event_start_date),
          endDate: new Date(eventForm.event_end_date),
          key: 'selection'
        }
      ])
    }

  }, [setDate, eventForm.event_start_date, eventForm.event_end_date])


  const handleDate = e => {
    setDate([e.selection])
    // eventForm.event_start_date = e.selection.startDate.toString();
    // eventForm.event_end_date = e.selection.endDate.toString();
    setEventForm({
      ...eventForm,
      event_start_date: e.selection.startDate.toString(),
      event_end_date: e.selection.endDate.toString()
    })
  }

  const handleInputChange = e => {
    const { id, value } = e.target;
    setEventForm({ ...eventForm, [id]: value });
  };

  const [editEvent] = useMutation(EDIT_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);


  const handleButton = e => {
    props.handleSaveEditButton(eventForm);
    editEvent({
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
    props.close();
  };

  const handleCloseModal = () => {
    props.close();
    setEventForm(props.event)
  }

  const handleCancelModal = () => {
    setOpenCancelModal(true);
  }

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handleCancel = () => {
    if (eventForm.cancel === "true") {
      setEventForm({
        ...eventForm,
        cancel: "false"
      })
    } else {
      setEventForm({
        ...eventForm,
        cancel: "true"
      })
    }
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    deleteEvent({ variables: { _id: props.event._id, } });
    setNavigate(true)
  }

  if (navigate) {
    return <Redirect push to={"/project/" + props.project_id} />;
  }
  
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="event-edit-modal"
      open={props.open}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth={false}
    >
      <DialogTitle id="edit-event-title" onClose={() => handleCloseModal()}>
        Edit Event
          </DialogTitle>
      <DialogContent dividers style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} style={fullScreen ? {} : { width: '50%' }}>
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
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="event_description"
                label="Description"
                type="text"
                variant="outlined"
                multiline
                rowsMax={9}
                value={eventForm.event_description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="event_location"
                label="Location"
                type="text"
                variant="outlined"
                multiline
                rowsMax={9}
                value={eventForm.event_location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl} style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '100%', marginTop: 10 }}>
                <AdjustIcon className={classes.icon} />
                <div className={classes.verticalAlign} style={{ width: '100%' }}>
                  {
                    (eventForm.cancel === "true") ? (
                      <Box borderRadius={4} style={{ backgroundColor: 'grey', textAlign: 'center', width: '100%', color: 'black' }}>
                        <Typography variant="body2">Cancelled</Typography>
                      </Box>
                    ) : (
                        (today < new Date(eventForm.event_start_date)) ? (
                          <Box borderRadius={4} style={{ backgroundColor: 'yellow', textAlign: 'center', width: '100%', color: 'black' }}>
                            <Typography variant="body2">Planned</Typography>
                          </Box>
                        ) : (
                            (today < new Date(eventForm.event_end_date)) ? (
                              <Box borderRadius={4} style={{ backgroundColor: 'green', textAlign: 'center', width: '100%', color: 'white' }}>
                                <Typography variant="body2">Active</Typography>
                              </Box>
                            ) : (
                                <Box borderRadius={4} style={{ backgroundColor: 'blue', textAlign: 'center', width: '100%', color: 'white' }}>
                                  <Typography variant="body2">Completed</Typography>
                                </Box>
                              )
                          ))
                  }
                </div>
              </div>
              {eventForm.cancel === "true" ?
                <Button color="primary" variant="outlined" onClick={handleCancelModal}>
                  Uncancel Event
                  </Button>
                :
                <Button color="secondary" variant="outlined" onClick={handleCancelModal}>
                  Cancel Event
                  </Button>
              }
              <CancelForm
                title={eventForm.event_name}
                open={openCancelModal}
                handleCancel={handleCancel}
                close={handleCloseCancelModal}
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
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" size="small" color="secondary" onClick={handleDeleteModal}>
          Delete Event
          </Button>
        <DeleteForm
          open={openDeleteModal}
          handleDelete={handleDelete}
          close={handleCloseDeleteModal}
        />
        <Button autoFocus color="primary" onClick={handleButton}>
          Save
            </Button>
      </DialogActions>
    </Dialog>
  );
};





