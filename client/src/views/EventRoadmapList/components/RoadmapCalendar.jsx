import React, { } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent } from 'components/Dialog';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

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
      <DialogTitle title="Roadmap Timeline Calendar" onClose={props.close} style={{ textAlign: 'center' }}/>
      <DialogContent style={
        fullScreen ?
          { } :
          { flexDirection: 'row', display: 'flex' }}>
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
          />
        </div>
      </DialogContent  >
    </Dialog >
  );
}