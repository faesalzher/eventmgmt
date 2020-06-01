import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Snackbar,
  CircularProgress
  // Tooltip,
  // IconButton,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  Comitees,
  Divisions,
} from './components';

// import mockDataComitee from './dataComitee';
// import mockDataPosition from './dataPosition.js';
// import mockDataDivision from './dataDivision.js';


const COMITEESBYPROJECT_QUERY = gql`
  query comiteesByProject($project_id: String!){
     comiteesByProject(project_id:$project_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;

const STAFFS_QUERY = gql`
{
  staffs{
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
  }
}
`;


const POSITIONS_QUERY = gql`
{
  positions{
      _id
      position_name
      core
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
  tabs_root: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ProjectComitee(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [comitees, setComitees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [staffs, setStaffs] = useState([]);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: comiteesData, refetch: comiteesRefetch } = useQuery(COMITEESBYPROJECT_QUERY, {
    variables: { project_id: props.project_id },
    onCompleted: () => {
      setComitees(
        comiteesData.comiteesByProject
      )
    }
  }
  );

  const { loading: staffsLoading, data: staffsData, refetch: staffsRefetch } = useQuery(STAFFS_QUERY, {
    onCompleted: () => {
      setStaffs(
        staffsData.staffs
      )
    }
  }
  );


  const { loading: positionsLoading, data: positionsData, refetch: positionsRefetch } = useQuery(POSITIONS_QUERY, {
    onCompleted: () => {
      setPositions(
        positionsData.positions
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    staffsRefetch();
    comiteesRefetch();
    positionsRefetch();
  };


  const handleSaveEditComiteeButton = (e) => {
    const temp = [...comitees];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setComitees(temp)
  };



  const handleDeleteComitee = (e) => {
    const temp = [...comitees];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setComitees(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };

  const handleSaveComiteeButton = (e) => {
    setComitees([...comitees, e])
  };

  return (
    <div>
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
      <Paper>
        <Paper elevation={0} style={{ backgroundColor: 'orange' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            style={{ color: 'white' }}
            aria-label="project comitee tabs"
            className={classes.tabs}
          >
            <Tab label="Comitee" {...a11yProps(0)} />
            <Tab label="Division" {...a11yProps(1)} />
          </Tabs>
        </Paper>
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
          {staffsLoading || positionsLoading ?
            <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
              <CircularProgress size={100} />
            </div>
            :
            <Comitees
              project_id={props.project_id}
              divisions={props.divisions}
              comitees={comitees}
              staffs={staffs}
              positions={positions}
              handleSaveButton={handleSaveComiteeButton}
              handleSaveEditButton={handleSaveEditComiteeButton}
              handleDeleteComitee={handleDeleteComitee}
            />
          }
        </TabPanel>
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={1}>
          <Divisions
            divisions={props.divisions}
            project_id={props.project_id}
            handleSaveEditButton={props.handleSaveEditButton}
            handleSaveButton={props.handleSaveButton}
            handleDeleteDivision={props.handleDeleteDivision}
          />
        </TabPanel>
      </Paper>
    </div>
  );
}