import React, { } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import jwtDecode from "jwt-decode";
import { TasksAssignedToMe, TasksCreatedByMe } from './components';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}




export default function MyTasks(props) {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>My Tasks</Typography>
      </Paper>
      <div className={classes.root}>
        <Paper elevation={0} className={classes.colorPrimary}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            style={{ color: 'white' }}
            aria-label="project personInCharge tabs"
            className={classes.tabs}
          >
            <Tab label="Assigned To Me" {...a11yProps(0)} />
            <Tab label="Created By Me" {...a11yProps(1)} />
          </Tabs>
        </Paper>
        <div style={{ backgroundColor: "#d8dce3", height: 10 }} />

        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
          <Card elevation={0} >
            <CardContent style={{ padding: 0, backgroundColor: "#d8dce3" }}>
              <TasksAssignedToMe decodedToken={decodedToken} />
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={1}>

          <TasksCreatedByMe decodedToken={decodedToken} />

        </TabPanel>
      </div>
    </div >
  );
};

