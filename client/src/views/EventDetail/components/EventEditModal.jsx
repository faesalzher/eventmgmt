

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
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
import { Redirect } from 'react-router';

import {
  ConfirmationDialog,
  StatusBox,
  EditImageForm,
} from 'components';

const EDIT_EVENT = gql`
  mutation editEvent(
    $_id: String!,
    $event_name: String!,
    $event_description: String!,
    $event_location: String!,
    $cancel: Boolean!,
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

export default function EventEditModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [eventForm, setEventForm] = React.useState([]);
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


  const handleSaveEditButton = e => {
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
    if (eventForm.cancel === true) {
      setEventForm({
        ...eventForm,
        cancel: false
      })
    } else {
      setEventForm({
        ...eventForm,
        cancel: true
      })
    }
  }

  const handleDelete = () => {
    deleteEvent({ variables: { _id: props.event._id, } });
    setNavigate(true)
  }

  const uploadImage = (e) => {
    setEventForm({
      ...eventForm,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setEventForm({
      ...eventForm,
      picture: " ",
    });
  };

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
      <DialogTitle title="Edit Event" onClose={() => handleCloseModal()} />
      <DialogContent dividers style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} style={fullScreen ? {} : { width: '50%' }}>
            <FormControl className={classes.formControl}>
              <TextField
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
            <FormControl className={classes.formControl}>
              <EditImageForm
                uploadImage={uploadImage}
                removeImage={removeImage}
                picture={eventForm.picture}
                type="edit"
              />
            </FormControl>
            <FormControl className={classes.formControl} style={{ padding: '5px 0px' }} >
              <StatusBox
                cancel={eventForm.cancel}
                style={{ width: 'auto' }}
                start_date={eventForm.event_start_date}
                end_date={eventForm.event_end_date}
              />
            </FormControl>
            <FormControl className={classes.formControl} style={{ display: 'flex' }}>
              {eventForm.cancel === true ?
                <Button color="primary" variant="outlined" onClick={handleCancelModal}>
                  Uncancel Event
                  </Button>
                :
                <Button color="secondary" variant="outlined" onClick={handleCancelModal}>
                  Cancel Event
                  </Button>
              }
              <ConfirmationDialog
                type="Cancel"
                name={eventForm.event_name}
                content="Event"
                open={openCancelModal}
                handleConfirm={handleCancel}
                close={handleCloseCancelModal}
              />
            </FormControl>
          </div>
          <div style={fullScreen ? {} : { marginTop: 14 }}>
            <FormControl className={classes.formDate}>
              <DateRange
                onChange={handleDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date(props.project.project_start_date)}
                maxDate={new Date(props.project.project_end_date)}
                rangeColors={[theme.palette.secondary.main]}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            eventForm.event_name === "" ||
            eventForm.event_description === "" ||
            eventForm.event_start_date === "" ||
            eventForm.event_end_date === "" ||
            eventForm.event_location === "" 
          ) ?
            ("invalid") : ("valid")
        }
        content="Event"
        name={eventForm.event_name}
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
};





