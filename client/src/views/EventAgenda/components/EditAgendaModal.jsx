import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import Typography from '@material-ui/core/Typography';
import TimeKeeper from 'react-timekeeper';

import {
  TextField,
  FormControl,
  Popover,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { useMutation } from "@apollo/react-hooks";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { EDIT_AGENDA,DELETE_AGENDA } from 'gql';


const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
  },
  formControl: {
    width: "100%",
  },
  textField: {
    backgroundColor: "white"
  },
  formDate: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(0),
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function EditAgendaModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [popoverDate, setPopoverDate] = React.useState(null);

  // const initialFormState =
  // {
  //   _id: props.agenda._id,
  //   agenda_name: props.agenda.agenda_name,
  //   details: props.agenda.details,
  //   date: props.agenda.date,
  //   start_time: props.agenda.start_time,
  //   end_time: props.agenda.end_time,
  // };


  const [editAgenda] = useMutation(EDIT_AGENDA);
  const [deleteAgenda] = useMutation(DELETE_AGENDA);

  const [agendaForm, setAgendaForm] = useState(props.agenda)
  useEffect(() => {
    setAgendaForm(props.agenda)
  }, [setAgendaForm, props.agenda])
  const [selectedDays, setSelectedDays] = React.useState(new Date(props.agenda.date));

  const handleInputChange = e => {
    const { id, value } = e.target;
    setAgendaForm({ ...agendaForm, [id]: value })
  }

  const onStartTimeChange = (e) => {
    setAgendaForm({ ...agendaForm, start_time: e });
  };

  const onEndTimeChange = (e) => {
    setAgendaForm({ ...agendaForm, end_time: e });
  };

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(agendaForm)
    editAgenda({
      variables: {
        _id: agendaForm._id,
        agenda_name: agendaForm.agenda_name,
        date: agendaForm.date,
        start_time: agendaForm.start_time,
        end_time: agendaForm.end_time,
        details: agendaForm.details,
        event_id: agendaForm.event_id,
        project_id: agendaForm.project_id,
      },
    });
    props.close();
  };

  const handleClose = () => {
    props.close();
    setAgendaForm(props.agenda);
    setSelectedDays(props.agenda.date)
  };

  const handleCloseDate = () => {
    setPopoverDate(null);
  };

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDays(modifiers.selected ? undefined : day);
    setAgendaForm({ ...agendaForm, date: day.toString().slice(0, 16) })
    handleCloseDate();
  }

  const handleCancelDate = () => {
    setAgendaForm({ ...agendaForm, date: "" })
    setSelectedDays(undefined)
    handleCloseDate();
  };

  const handleOpenDate = e => {
    setPopoverDate(popoverDate ? null : e.currentTarget);
  };

  const handleDelete = () => {
    deleteAgenda({ variables: { _id: agendaForm._id } });
    props.handleDelete(props.agenda._id);
    props.close();
    // deletePerson_in_charge({ variables: { _id: props.personInCharge._id, } });
  }
  const [validateTime, setValidateTime] = React.useState(false);
  const dtStart = new Date(agendaForm.date + agendaForm.start_time);
  const dtEnd = new Date(agendaForm.date + agendaForm.end_time);
  const difference_in_milliseconds = dtEnd - dtStart;
  useEffect(() => {
    if (difference_in_milliseconds < 0) {
      setValidateTime(false)
    } else {
      setValidateTime(true)
    }
  }, [difference_in_milliseconds])

  const openDate = Boolean(popoverDate);
  const id_date = openDate ? 'AddDateForm' : undefined;

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle title="Edit Agenda" onClose={handleClose} style={{ textAlign: 'center' }} />
      <DialogContent style={
        fullScreen ? {} : { height: 600, flexDirection: 'row', display: 'flex' }}>
        <div className={classes.form} style={fullScreen ? {} : {}}>
          <FormControl className={classes.formControl}>
            <TextField
              className={classes.textField}
              margin="dense"
              id="agenda_name"
              label="Agenda Name"
              type="text"
              variant="outlined"
              value={agendaForm.agenda_name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              className={classes.textField}
              margin="dense"
              multiline
              rowsMax="5"
              id="details"
              label="Details"
              type="text"
              variant="outlined"
              value={agendaForm.details}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className={classes.formControl} style={{ margin: '10px 0px' }}>
            <Button variant="outlined" style={{ textTransform: 'none' }} onClick={handleOpenDate}>
              <CalendarTodayIcon color="primary" style={{ fontSize: 20, marginRight: 3 }} />
              {agendaForm.date === "" ?
                <Typography color="primary" variant="subtitle2">Set Date</Typography>
                :
                <Typography color="primary" variant="subtitle2">{agendaForm.date}</Typography>
              }
            </Button>
          </FormControl>
          <FormControl className={classes.formDate} style={
            fullScreen ? { display: 'flex', flexDirection: 'column' } : {}
          }>
            <div style={{ textAlign: 'center' }}>
              <Typography color="textSecondary" variant="subtitle2">Start Time</Typography>
              <TimeKeeper
                time={agendaForm.start_time}
                onChange={(newTime) => onStartTimeChange(newTime.formatted24)}
                hour24Mode={true}
              />
            </div>
         -
         <div style={{ textAlign: 'center' }}>
              <Typography color="textSecondary" variant="subtitle2">End Time</Typography>
              <TimeKeeper
                time={agendaForm.end_time}
                onChange={(newTime) => onEndTimeChange(newTime.formatted24)}
                hour24Mode={true}
              />
            </div>
          </FormControl>
        </div>
      </DialogContent  >
      <DialogActionsEdit
        validation={
          (
            agendaForm.agenda_name === "" ||
            agendaForm.details === "" ||
            agendaForm.date === "" ||
            validateTime === false
          ) ?
            ("invalid") : ("valid")
        }
        content="Agenda"
        name={agendaForm.agenda_name}
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleClose()}
      />
      <Popover id={id_date} open={openDate} anchorEl={popoverDate} onClose={handleCloseDate}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DayPicker
            showOutsideDays
            selectedDays={selectedDays}
            onDayClick={handleDayClick}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {selectedDays === undefined ?
            <Button color="secondary" disabled>Cancel Date</Button>
            :
            <Button color="secondary" onClick={handleCancelDate}>Cancel Date</Button>
          }
        </div>
      </Popover>
    </Dialog >
  );
}