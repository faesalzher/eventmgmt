import React from 'react';
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
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';

import {
  TaskList
} from './components';

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

export default function RoadamapTaskList() {
  const classes = useStyles();
  const theme = useTheme();
  const browserHistory = createBrowserHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  let { project_id, event_id, roadmap_id } = useParams();
  // const [value, setValue] = React.useState(0);
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [divisionData,
    // setDivisionData
  ] = React.useState([
    { _id: 0, name: 'Konsumsi', roadmap_id: '0' },
    { _id: 1, name: 'Perlengkapan', roadmap_id: '0' },
    { _id: 2, name: 'Humas', roadmap_id: '0' },
    { _id: 3, name: 'Kemanan', roadmap_id: '0' },
  ]);

  const breadcrumb_item = [
    { name: 'Project List', link: '/project' },
    { name: 'Dies Natalies UB', link: `/project/${project_id}` },
    { name: 'Fun Bike', link: `/project/${project_id}/${event_id}` },
    { name: 'Jersey', link: `/` }
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
          Roadmap Jersey Task List
            </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
        <div style={{ overflowX: 'auto' }}>
          <div style={{ padding: '0px 30px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: 424, width: (divisionData.length * 315) }}>
              {divisionData.map((division, index) => {
                if (roadmap_id === division.roadmap_id) {
                  return <TaskList division={division} key={division._id} />
                } return null
              })}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
