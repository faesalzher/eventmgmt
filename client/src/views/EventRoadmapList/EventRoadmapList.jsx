import React, { useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import {
  Roadmap,
  RoadmapAddForm,
  RoadmapCalendar,
} from './components';

export default function EventRoadmapList(props) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  const handleOpenCalendar = () => {
    setOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSaveButton = (e) => {
    props.handleSaveButton(e);
  }

  return (
    <Card style={{ maxHeight: "100%", width: '100%' }} elevation={0} >
      <div
        style={{
          backgroundColor: 'orange',
          color: 'white',
          padding: '10px 9px',
        }}
      >
        <div style={{ padding: '0px 13px', justifyContent: 'space-between', display: 'flex', }}>
          Roadmap List
          <div style={{ display: 'flex', width: 50, justifyContent: 'space-between' }}>
            <Tooltip title="Show Roadmap Calendar" arrow>
              <IconButton style={{ padding: 0 }} onClick={handleOpenCalendar}>
                <CalendarTodayIcon style={{ fontSize: 20, }} />
              </IconButton>
            </Tooltip>
            <RoadmapCalendar
              roadmaps={props.roadmaps}
              open={openCalendar}
              close={handleCloseCalendar}
            />
            <Tooltip title="Add New Roadmap" arrow>
              <IconButton style={{ padding: 0 }} onClick={handleOpenAddModal}>
                <AddIcon style={{ fontSize: 20, }} />
              </IconButton>
            </Tooltip>
            <RoadmapAddForm
              xs={props.xs}
              open={openAddModal}
              close={handleCloseAddModal}
              event_id={props.event_id}
              handleSaveButton={handleSaveButton}
              roadmaps={props.roadmaps} />
          </div>
        </div>
      </div>
      <Divider />
      <CardContent style={
        props.xs ?
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)" }
          :
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)", overflowY: "auto", maxHeight: 490 }} >
        {props.roadmaps.map((roadmap, index) => (
          <Roadmap
            xs={props.xs}
            key={index}
            roadmap={roadmap}
            project_id={props.project_id}
            event_id={props.event_id}
          />
        ))}
      </CardContent>
      {/* <div
        style={{
          backgroundColor: 'orange',
          color: 'white',
          padding: 6,
          paddingLeft: 13,
          paddingRight: 10,
        }}
      >
      </div> */}
    </Card >
  );
}