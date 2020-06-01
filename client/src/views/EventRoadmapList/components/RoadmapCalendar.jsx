import React, {} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
      <Typography variant="h6">{children}</Typography>
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
  },
}))(MuiDialogContent);

export default function RoadamapCalendar(props) {
  // const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const calendarComponentRef = React.createRef();

  const calendarRoadmaps = (fetchInfo, successCallback, failureCallback) => {
    successCallback(props.roadmaps);
  };

  const roadmapDataTransform = e => {
    return {
      title: e.roadmap_name,
      allDay: true,
      color: e.color,
      start: new Date(e.start_date + " 00:00"),
      end: new Date(e.end_date + " 23:59"),
    };
  };


  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.close} style={{ textAlign: 'center' }}>
        Roadmap Timeline Calendar
        </DialogTitle>
      <DialogContent dividers style={
        fullScreen ?
          { backgroundColor: "#e6e8eb" } :
          { backgroundColor: "#e6e8eb", flexDirection: 'row', display: 'flex' }}>
       <div style={{}}>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "title",
            right: "prev,next"
          }}
          plugins={[dayGridPlugin]}
          ref={calendarComponentRef}
          weekends={true}
          events={calendarRoadmaps}
          eventDataTransform={roadmapDataTransform}
        // dateClick={handleDateClick}
        // editable={true}
        // eventClick={(e) => handleEventClick(e)}
        />
      </div>
      </DialogContent  >
    </Dialog >
  );
}