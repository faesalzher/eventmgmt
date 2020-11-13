import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import { createBrowserHistory } from 'history';
// import ScrollContainer from 'react-indiana-drag-scroll'
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  IconButton,
} from '@material-ui/core';


import {
  EventOverview,
  EventExternal,
  EventRoadmapList,
  EventAgenda,
} from 'views';

import {
  EventEditModal
} from './components';
const PROJECT_QUERY = gql`
  query project($project_id: String!){
    project(_id:$project_id) {
      _id
      project_name
      project_start_date
      project_end_date
    }
  }
`;

const EVENT_QUERY = gql`
  query event($event_id: String!){
    event(_id:$event_id) {
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(4),
    paddingTop: theme.spacing(1),
  },
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


export default function EventDetail() {
  const classes = useStyles();
  const theme = useTheme();
  const browserHistory = createBrowserHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  let { project_id, event_id } = useParams();
  const [value, setValue] = React.useState(0);
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [event, setEvent] = React.useState({ event_name: "" });
  const { data: eventData, refetch: eventRefetch } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: event_id },
      onCompleted: () => {
        setEvent(eventData.event)
      }
    });

  React.useEffect(() => {
    refresh();
  });

  const refresh = () => {
    eventRefetch();
  };
  const [project, setProject] = React.useState({ project_name: "" });
  const { data: projectData } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: project_id },
      onCompleted: () => {
        setProject(projectData.project)
      }
    });

  const [openEditModal, setOpenEditModal] = useState(false);

  const breadcrumb_item = [
    { name: 'Project List', link: '/project' },
    { name: project.project_name, link: `/project/${project._id}` },
    { name: event.event_name, link: '/' }
  ]


  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEditEventButton = (e) => {
    setEvent(e)
  };

  return (
    <div className={classes.tabs_root}>
      <AppBar elevation={2} position="static" className={classes.tabs_root} color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton className={classes.iconbutton} style={{ marginLeft: 1 }} onClick={browserHistory.goBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          // textColor="primary"
          variant="scrollable"
          aria-label="full width tabs example"
        >
          <Tab label="Roadmap" {...a11yProps(0)} />
          <Tab label="External" {...a11yProps(1)} />
          <Tab label="Rundown" {...a11yProps(2)} />
          <Tab label="Event Overview" {...a11yProps(3)} />
        </Tabs>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton onClick={handleOpenEditModal} className={classes.iconbutton}>
            <SettingsIcon />
          </IconButton>
          <EventEditModal
            open={openEditModal}
            project={project}
            project_id={project_id}
            close={handleCloseEditModal}
            handleSaveEditButton={handleSaveEditEventButton}
            event={event}
          />
        </div>
      </AppBar>
      <div className={classes.root}>
        <div style={{ paddingLeft: 30, paddingTop: 8 }}>
          {fullScreen ? <></> :
            <BreadCrumbs breadcrumb_item={breadcrumb_item} />
          }
        </div>
        <TabPanel value={value} index={0} style={{ padding: '0px 30px' }}>
          <EventRoadmapList
            event_id={event_id}
            project_id={project_id}
            xs={fullScreen}
          />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ padding: '0px 30px' }}>
          <EventExternal
            event_id={event_id}
          />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ padding: '0px 30px' }}>
          <EventAgenda event_id={event_id} />
        </TabPanel>
        <TabPanel value={value} index={3} style={{ padding: '0px 30px' }}>
          <EventOverview
            event={event}
          />
        </TabPanel>
      </div>
    </div>
  );
}
