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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import jwtDecode from "jwt-decode";

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


import { ROADMAP_QUERY, EVENT_QUERY, ORGANIZATION_QUERY } from 'gql';
import { PROJECT_QUERY } from 'gql';
import { PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY } from 'gql';

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
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
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
  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: roadmap_id },
      onCompleted: () => {
        setRoadmap(roadmapData.roadmap)
      }
    });

  const [project_personInCharge, setProject_personInCharge] = useState({ position_id: "", committee_id: "", staff_id: "" })
  const { data: personInChargeData, loading: personInChargeLoading, error: personInChargeError, refetch: personInChargeRefetch } =
    useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
      variables: { project_id: project_id, staff_id: decodedToken.staff_id },
    }
    );

  useEffect(() => {
    const onCompleted = (personInChargeData) => {
      if (personInChargeData && personInChargeData.person_in_charges_by_staff_and_project !== null) {
        setProject_personInCharge(personInChargeData.person_in_charges_by_staff_and_project)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargeLoading && !personInChargeError) {
        onCompleted(personInChargeData);
      } else if (onError && !personInChargeLoading && personInChargeError) {
        onError(personInChargeError);
      }
    }
  }, [personInChargeLoading, personInChargeData, personInChargeError]);

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    personInChargeRefetch();
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
  const { data: organizationData } =
    useQuery(ORGANIZATION_QUERY, {
      variables: { _id: decodedToken.organization_id },
    }
    );
  if (!organizationData) return (<></>)

  const breadcrumb_item = [
    { name: organizationData.organization.organization_name, link: '/project' },
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
          Roadmap {roadmap.roadmap_name}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {
            (project_personInCharge.order === '1' ||
              project_personInCharge.order === '2' ||
              project_personInCharge.order === '3' ||
              project_personInCharge.order === '6' ||
              project_personInCharge.order === '7' ||
              decodedToken.user_type === "organization") ?
              <IconButton className={classes.iconbutton} onClick={handleOpenEditModal}>
                <SettingsIcon />
              </IconButton>
              : <></>
          }
          <RoadmapEditForm
            open={openEditModal}
            close={handleCloseEditModal}
            project_id={project_id}
            project_personInCharge={project_personInCharge}
            handleSaveEditButton={handleSaveEditRoadmapButton}
            roadmap={roadmap}
            roadmap_id={roadmap_id}
          />
        </div>
      </Paper>
      <div className={classes.root}>
        <div style={{ justifyContent: 'space-between', padding: '8px 0px' }}>
          {fullScreen ? <></> :
            <BreadCrumbs breadcrumb_item={breadcrumb_item} />
          }
        </div>
        <Grid container spacing={1} style={{ justifyContent: 'center' }}>
          <Grid
            lg={12}
            sm={12}
            xl={12}
            xs={12}
            item>
            <TaskList
              roadmap={roadmap}
              roadmap_id={roadmap_id}
              project_id={project_id}
              event_id={event_id}
              project_personInCharge={project_personInCharge}
              decodedToken={decodedToken}
            />
          </Grid>
        </Grid>
      </div >
    </div>
  );
}
