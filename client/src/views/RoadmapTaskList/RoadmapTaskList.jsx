import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import { createBrowserHistory } from 'history';
// // import ScrollContainer from 'react-indiana-drag-scroll'
// import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  IconButton,
  Paper,
  Typography,
  Grid,
} from '@material-ui/core';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';

import {
  TaskList,
  RoadmapEditForm,
} from './components';

// const DIVISIONSBYPROJECT_QUERY = gql`
//   query divisionsByProject($project_id: String!){
//     divisionsByProject(project_id:$project_id) {
//       _id
//       division_name
//       project_id
//     }
//   }
// `;

const PROJECT_QUERY = gql`
  query project($project_id: String!){
    project(_id:$project_id) {
      _id
      project_name
    }
  }
`;

const EVENT_QUERY = gql`
  query event($event_id: String!){
    event(_id:$event_id) {
      _id
      event_name
    }
  }
`;

// const ROADMAP_QUERY = gql`
//   query roadmap($roadmap_id: String!){
//     roadmap(_id:$roadmap_id) {
//       _id
//       roadmap_name
//       start_date
//       end_date
//       color
//       event_id
//     }
//   }
// `;

const ROADMAPBYEVENTID_QUERY = gql`
  query roadmapByEvent($event_id: String!){
    roadmapByEvent(event_id:$event_id) {
      _id
      roadmap_name
      start_date
      end_date
      color
      event_id
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    padding: '0px 30px',
    paddingTop: '8px',
  },
  // container: {
  //   // padding: '0px 130px',
  //   // [theme.breakpoints.down('xs')]: {
  //   //   padding: '0px 0px'
  //   // }
  // },
  tabs_root: {
    // backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  iconbutton: {
    "&:hover": {
      color: 'black'
    },
  },
}));

export default function RoadamapTaskList() {
  const classes = useStyles();
  const theme = useTheme();
  const browserHistory = createBrowserHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  let { project_id, event_id, roadmap_id } = useParams();

  const [openEditModal, setOpenEditModal] = useState(false);

  // const [divisions, setDivisions] = useState([]);

  // const { data: divisionsData, refetch: divisionsRefetch } = useQuery(DIVISIONSBYPROJECT_QUERY, {
  //   variables: { project_id: project_id },
  //   onCompleted: () => {
  //     setDivisions(
  //       divisionsData.divisionsByProject
  //     )
  //   }
  // }
  // );



  const [project, setProject] = React.useState({ project_name: "" });
  const { data: projectData } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: project_id },
      onCompleted: () => {
        setProject(projectData.project)
      }
    });

  const [event, setEvent] = React.useState({ event_name: "" });
  const { data: eventData } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: event_id },
      onCompleted: () => {
        setEvent(eventData.event)
      }
    });



  const [roadmap, setRoadmap] = React.useState({});
  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAPBYEVENTID_QUERY,
    {
      variables: { event_id: event_id },
      onCompleted: () => {
        setRoadmap(roadmapData.roadmapByEvent[0])
      }
    });

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    // divisionsRefetch();
    roadmapRefetch()
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };


  const handleSaveEditRoadmapButton = (e) => {
    setRoadmap(e)
  };

  const breadcrumb_item = [
    { name: 'Project List', link: '/project' },
    { name: project.project_name, link: `/project/${project_id}` },
    { name: event.event_name, link: `/project/${project_id}/${event_id}` },
    { name: roadmap.roadmap_name, link: `/` }
  ]

  return (
    <div className={classes.tabs_root}>
      <Paper className={classes.tabs_root} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <IconButton className={classes.iconbutton} style={{ marginLeft: 1 }} onClick={browserHistory.goBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>
          Task to do of roadmap {roadmap.roadmap_name}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton className={classes.iconbutton} onClick={handleOpenEditModal}>
            <SettingsIcon />
          </IconButton>
          <RoadmapEditForm
            open={openEditModal}
            close={handleCloseEditModal}
            handleSaveEditButton={handleSaveEditRoadmapButton}
            roadmap={roadmap}
          />
        </div>
      </Paper>
      <div className={classes.root}>
        <div style={{ paddingTop: 8 }}>
          {fullScreen ? <></> :
            <BreadCrumbs breadcrumb_item={breadcrumb_item} />
          }
        </div>
        <Grid container spacing={1} style={{ justifyContent: 'center' }}>
          <Grid
            lg={6}
            sm={6}
            xl={6}
            xs={12}
            item>
            <TaskList
              roadmap_id={roadmap_id}
              project_id={project_id}
            />
          </Grid>
        </Grid>
      </div >
    </div>
  );
}
