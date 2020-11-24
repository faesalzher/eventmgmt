import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  CircularProgress
  // Tooltip,
  // IconButton,
} from '@material-ui/core';


import { useQuery } from '@apollo/react-hooks';
import jwtDecode from "jwt-decode";

import {
  Committees,
  Positions,
} from './components';

import {POSITIONS_QUERY, COMMITTEES__QUERY } from 'gql';


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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  tabs_root: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}));

export default function ComiteeView(props) {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const [value, setValue] = React.useState(0);
  const [positions, setPositions] = useState([]);
  const [committees, setCommittees] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const { loading: positionsLoading, data: positionsData, refetch: positionsRefetch } = useQuery(POSITIONS_QUERY, {
    onCompleted: () => {
      setPositions(
        positionsData.positions
      )
    }
  }
  );

  const { data: committeesData, refetch: committeesRefetch, loading: committeesLoading } = useQuery(COMMITTEES__QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setCommittees(
        committeesData.committees
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    positionsRefetch();
    committeesRefetch();
  };

  const handleSaveCommitteeButton = (e) => {
    setCommittees([...committees, e])
  };

  const handleSaveEditCommitteeButton = (e) => {
    const temp = [...committees];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setCommittees(temp)
  };


  const handleDeleteCommittee = (e) => {
    const temp = [...committees];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setCommittees(temp);
    // setTimeout(() => {
    //   handleOpenSnackbar();
    // }, 700);
  };


  return (
    <div>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>Committee Master Management</Typography>
      </Paper>
      <div className={classes.root}>
        <Paper>
          <Paper elevation={0} className={classes.colorPrimary}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              style={{ color: 'white' }}
              aria-label="project personInCharge tabs"
              className={classes.tabs}
            >
              <Tab label="Committee" {...a11yProps(0)} />
              <Tab label="Position" {...a11yProps(1)} />
            </Tabs>
          </Paper>
          <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
            {committeesLoading ?
              <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
                <CircularProgress size={100} />
              </div>
              :
              <Committees
                committees={committees}
                decodedToken={decodedToken}
                project_personInCharge={props.project_personInCharge}
                handleSaveEditButton={handleSaveEditCommitteeButton}
                handleSaveButton={handleSaveCommitteeButton}
                handleDeleteCommittee={handleDeleteCommittee}
              />
            }
          </TabPanel>
          <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={1}>
            {positionsLoading ?
              <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
                <CircularProgress size={100} />
              </div>
              :
              <Positions
                positions={positions}
                decodedToken={decodedToken}
                project_personInCharge={props.project_personInCharge}
              // handleSaveEditButton={handleSaveEditCommitteeButton}
              // handleSaveButton={handleSaveCommitteeButton}
              // handleDeleteCommittee={handleDeleteCommittee}
              />
            }
          </TabPanel>
        </Paper>
      </div>
    </div>
  );
}