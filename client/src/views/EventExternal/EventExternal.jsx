import React, { useState, useEffect } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { Externals } from './components';

import { useQuery } from '@apollo/react-hooks';
import { EXTERNALS_QUERY } from 'gql';
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
  header: {
    backgroundColor: theme.palette.primary.main,
  },
}));
export default function EventExternal(props) {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [externals, setExternals] = useState([]);

  const { data: externalsData, refetch: externalsRefetch } = useQuery(EXTERNALS_QUERY,
    {
      variables: { event_id: props.event_id },
      onCompleted: () => {
        if (externalsData !== undefined)
          setExternals(externalsData.externals)
      },
    }
  );

  useEffect(() => {
    refresh()
  });

  const refresh = () => {
    externalsRefetch();
  };
  console.log(externalsData)
  console.log(externals)

  const handleSaveButton = (e) => {
    setExternals([...externals, e])
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const handleSaveEditButton = (e) => {
    const temp = [...externals];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setExternals(temp)
  };

  const handleDelete = (e) => {
    const temp = [...externals];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setExternals(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };

  return (
    <Paper className={classes.header}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Succes!
         </MuiAlert>
      </Snackbar>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        // textColor="secondary"
        style={{ color: 'white' }}
        variant="fullWidth"
        aria-label="event external tabs"
      >
        <Tab style={{ textTransform: "none" }} label="Sponsors" {...a11yProps(0)} />
        <Tab style={{ textTransform: "none" }} label="Volunteer" {...a11yProps(1)} />
        <Tab style={{ textTransform: "none" }} label="Guests" {...a11yProps(2)} />
        <Tab style={{ textTransform: "none" }} label="Media Partners" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{ padding: 0 }}>
        <Externals
          event_id={props.event_id}
          project_id={props.project_id}
          externals={externals}
          type="Sponsor"
          handleSaveButton={handleSaveButton}
          handleDelete={handleDelete}
          handleSaveEditButton={handleSaveEditButton}
        />
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: 0 }}>
        <Externals
          event_id={props.event_id}
          project_id={props.project_id}
          externals={externals}
          type="Volunteer"
          handleDelete={handleDelete}
          handleSaveButton={handleSaveButton}
          handleSaveEditButton={handleSaveEditButton}
        />
      </TabPanel>
      <TabPanel value={value} index={2} style={{ padding: 0 }}>
        <Externals
          event_id={props.event_id}
          project_id={props.project_id}
          externals={externals}
          type="Guest"
          handleSaveButton={handleSaveButton}
          handleDelete={handleDelete}
          handleSaveEditButton={handleSaveEditButton}
        />
      </TabPanel>
      <TabPanel value={value} index={3} style={{ padding: 0 }}>
        <Externals
          event_id={props.event_id}
          project_id={props.project_id}
          externals={externals}
          type="Media Partner"
          handleSaveButton={handleSaveButton}
          handleDelete={handleDelete}
          handleSaveEditButton={handleSaveEditButton}
        />
      </TabPanel>
    </Paper>
  );
}
