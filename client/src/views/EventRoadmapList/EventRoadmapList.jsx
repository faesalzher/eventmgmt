import React, { useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  Roadmap,
  RoadmapAddForm,
  RoadmapCalendar,
} from './components';


const ROADMAPS_QUERY = gql`
  query roadmaps($event_id: String!){
    roadmaps(event_id:$event_id) {
      _id
      roadmap_name
      start_date
      end_date
      color
      event_id
    }
  }
`;


export default function EventRoadmapList(props) {

  // const dataRoadmap = [
  //   { _id: '0', event_id: "0", roadmap_name: "Persiapan Tiket", start_date: "04/11/2020", end_date: '04/18/2020', color: randomColor({ luminosity: 'dark' }), },
  //   { _id: '1', event_id: '0', roadmap_name: "Jersey", start_date: "04/12/2020", end_date: '04/28/2020', color: randomColor({ luminosity: 'dark' }), },
  //   { _id: '2', event_id: '0', roadmap_name: "Sponshorships", start_date: "04/18/2020", end_date: '04/28/2020', color: randomColor({ luminosity: 'dark' }), },
  // ]

  // const initialFormState = {
  //   _id: '',
  //   roadmap_name: "",
  //   color: "",
  //   event_id: props.event_id,
  //   start_date: "",
  //   end_date: "",
  // }

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);

  const { data: roadmapsData, refetch: roadmapsRefetch, loading: roadmapsLoading, eror: roadmapsError } = useQuery(ROADMAPS_QUERY,
    {
      variables: { event_id: props.event_id },
      // onCompleted: () => {
      //   if (roadmapsData !== undefined) {
      //     setRoadmaps(roadmapsData.roadmaps)
      //   }
      // }
    });

  React.useEffect(() => {
    refresh();
  });

  React.useEffect(() => {
    const onCompleted = (data) => {
      if (roadmapsData !== undefined) {
        setRoadmaps(data.roadmaps)
      }
    };
    const onError = (roadmapsError) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !roadmapsLoading && !roadmapsError) {
        onCompleted(roadmapsData);
      } else if (onError && !roadmapsLoading && roadmapsError) {
        onError(roadmapsError);
      }
    }
  }, [roadmapsLoading, roadmapsData, roadmapsError]);

  const refresh = () => {
    roadmapsRefetch();
  };

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
    setRoadmaps([...roadmaps, e])
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
              roadmaps={roadmaps}
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
              roadmaps={roadmaps} />
          </div>
        </div>
      </div>
      <Divider />
      <CardContent style={
        props.xs ?
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)" }
          :
          { padding: 0, backgroundColor: "rgba(0, 0, 0, 0.12)", overflowY: "auto", maxHeight: 490 }} >
        {roadmaps.length === 0 ?
          (
            <Paper style={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
                there is no roadmap yet
            </Typography>
            </Paper>
          ) : (
            roadmaps.map((roadmap, index) => (
              <Roadmap
                xs={props.xs}
                key={index}
                roadmap={roadmap}
                project_id={props.project_id}
                event_id={props.event_id}
              />
            ))

          )
        }

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