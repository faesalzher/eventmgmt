import * as React from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { Sponsors, Volunteers, Guests } from './components';

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

export default function EventExternal(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper style={{ backgroundColor: 'orange' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        // textColor="secondary"
        style={{ color: 'white' }}
        variant="fullWidth"
        aria-label="event external tabs"
      >
        <Tab style={{ textTransform: "none" }} label="Sponsors" {...a11yProps(0)} />
        <Tab style={{ textTransform: "none" }} label="Volunteer" {...a11yProps(1)} />
        <Tab style={{ textTransform: "none" }} label="Guests" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ padding: 0 }}>
        <Sponsors event_id={props.event_id} />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: 0 }}>
        <Volunteers event_id={props.event_id} />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ padding: 0 }}>
        <Guests event_id={props.event_id} />
      </TabPanel>
    </Paper>
  );
}
