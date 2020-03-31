import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

import randomColor from 'randomcolor';

import {
  EventOverview,
  EventAgenda,
  TimelineCalendar
} from 'views';

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

const dataRoadmap = [
  { _id: '0', event_id: "0", roadmap_name: "Persiapan Tiket", start_date: "03/11/2020", end_date: '03/18/2020', color: randomColor({ luminosity: 'dark' }), },
  { _id: '1', event_id: '0', roadmap_name: "Jersey", start_date: "03/12/2020", end_date: '03/28/2020', color: randomColor({ luminosity: 'dark' }), },
  { _id: '2', event_id: '0', roadmap_name: "Sponshorship", start_date: "03/18/2020", end_date: '03/28/2020', color: randomColor({ luminosity: 'dark' }), },
]
export default function EventDetail() {
  const classes = useStyles();
  const theme = useTheme();
  const browserHistory = createBrowserHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  let { project_id, event_id } = useParams();
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [event, setEvent] = React.useState([]);
  const { data: eventData } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: event_id },
      onCompleted: () => {
        setEvent(eventData.event)
      }
    });

  const [project, setProject] = React.useState([]);
  const { data: projectData } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: project_id },
      onCompleted: () => {
        setProject(projectData.project)
      }
    });

  const [roadmaps, setRoadmaps] = useState(dataRoadmap);

  const breadcrumb_item = [
    { name: 'Project List', link: '/project' },
    { name: project.project_name, link: `/project/${project._id}` },
    { name: event.event_name, link: '/' }
  ]
  const handleSaveButton = (e) => {
    setRoadmaps([...roadmaps, e])
  }

  return (
    <div className={classes.tabs_root}>
      <Paper className={classes.tabs_root} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton className={classes.iconbutton} style={{ marginLeft: 1 }} onClick={browserHistory.goBack}>
              <ArrowBackIcon />
            </IconButton>
            {matches ?
              <div style={{ width: 200 }}>
                <Typography noWrap style={{ fontWeight: 500, paddingTop: 11, paddingLeft: 10 }}>
                  {event.event_name}
                </Typography>
              </div> : <div></div>
            }
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          aria-label="full width tabs example"
        >
          <Tab label="Calendar" {...a11yProps(0)} />
          <Tab label="Event Overview" {...a11yProps(1)} />
          <Tab label="Agenda" {...a11yProps(2)} />
        </Tabs>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {matches ?
            <div style={{ width: 200 }}>
            </div> : <div></div>
          }
          <IconButton className={classes.iconbutton}>
            <SettingsIcon />
          </IconButton>
        </div>
      </Paper>
      <div className={classes.root}>
        <div style={{ paddingLeft: 30, paddingTop: 8 }}>
          {fullScreen ? <></> :
            <BreadCrumbs breadcrumb_item={breadcrumb_item} />
          }
        </div>
        {/* <div style={{ overflowX: 'auto' }}>
          <TabPanel value={value} index={2} style={{ padding: '0px 30px' }} >
            <div style={{ display: 'flex', flexDirection: 'row', height: 424, width: (divisionData.length * 315) }}>
              {divisionData.map((division, index) => (
                <EventTaskList division={division} key={division._id} />
              ))}
            </div>
          </TabPanel>
        </div> */}
        <TabPanel value={value} index={0} style={{ padding: '0px 30px' }}>
          {/* <EventRoadmap  /> */}
          <TimelineCalendar roadmaps={roadmaps} />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ padding: '0px 30px' }}>
          <EventOverview
            event_id={event_id}
            project_id={project_id}
            roadmaps={roadmaps}
            handleSaveButton={handleSaveButton} />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ padding: '0px 30px' }}>
          <EventAgenda />
        </TabPanel>
      </div>
    </div>
  );
}
