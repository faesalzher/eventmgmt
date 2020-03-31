import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Paper,
} from '@material-ui/core';

export default function TimelineCalendar(props) {
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
    <Paper style={{ height: '100%' }}>
      <div style={{ padding: 8 }}>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "title",
            right: "prev,next"
          }}
          style={{ height: '100%' }}
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
    </Paper>
  );
}