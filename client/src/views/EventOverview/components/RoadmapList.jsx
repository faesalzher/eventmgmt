import React, { useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import {
  Roadmap,
  RoadmapAddForm,
} from '.';

export default function RoadmapList(props) {
  const [addRoadmapForm, setAddRoadmapForm] = useState(false);

  const handleSaveButton = (e) => {
    props.handleSaveButton(e);
  }

  return (
    <Card style={{ maxHeight: "100%" }} elevation={0} >
      <div
        style={{
          backgroundColor: 'orange',
          color: 'white',
          padding: '10px 9px',
        }}
      >
        <div style={{ padding: '0px 13px', justifyContent: 'space-between', display: 'flex', }}>
          Roadmap List
            <Tooltip title="Add New Roadmap" arrow>
            <IconButton style={{ padding: 0 }} onClick={() => setAddRoadmapForm(true)}>
              <AddIcon style={{ fontSize: 20, }} />
            </IconButton>
          </Tooltip>
        </div>
        <RoadmapAddForm
          xs={props.xs}
          addRoadmapForm={addRoadmapForm}
          setAddRoadmapForm={setAddRoadmapForm}
          handleSaveButton={handleSaveButton}
          roadmaps={props.roadmaps} />
      </div>
      <Divider />
      <CardContent style={
        props.xs ?
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)" }
          :
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)", overflowY: "auto", maxHeight: 490 }} >
        {props.roadmaps.map((roadmap, index) => (
          <Roadmap
            key={index}
            roadmap={roadmap}
            project_id={props.project_id}
            event_id={props.event_id}
          />
        ))}
      </CardContent>
      <div
        style={{
          backgroundColor: 'orange',
          color: 'white',
          padding: 6,
          paddingLeft: 13,
          paddingRight: 10,
        }}
      >
      </div>
    </Card >
  );
}