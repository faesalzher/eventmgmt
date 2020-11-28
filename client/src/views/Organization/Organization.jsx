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
  CircularProgress,

  // Tooltip,
  // IconButton,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import { useQuery } from '@apollo/react-hooks';


import {
  Staffs,
  Departements,
  DepartementPositions,
} from './components';
import jwtDecode from "jwt-decode";
import { 
  STAFFS_QUERY,
  DEPARTEMENTS_QUERY,
  DEPARTEMENT_POSITIONS_QUERY,
 } from 'gql';


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
    // backgroundColor: theme.palette.background.paper,
    // display: 'flex',
    // height: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}));

export default function Organization() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [departements, setDepartements] = useState([]);
  const [departementPositions, setDepartementPositions] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

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

  const { data: departementPositionsData, refetch: departementPositionsRefetch } = useQuery(DEPARTEMENT_POSITIONS_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setDepartementPositions(
        departementPositionsData.departement_positions
      )
    }
  }
  );

  
  const { data: departementsData, refetch: departementsRefetch } = useQuery(DEPARTEMENTS_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setDepartements(
        departementsData.departements
      )
    }
  }
  );
  
  

  const { loading: staffsLoading, data: staffsData, refetch: staffsRefetch } = useQuery(STAFFS_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setStaffs(
        staffsData.staffs
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });


  const refresh = () => {
    staffsRefetch();
    departementsRefetch();
    departementPositionsRefetch();
  };

  const handleSaveDepartementButton = (e) => {
    setDepartements([...departements, e])
  };

  const handleSaveEditDepartementButton = (e) => {
    const temp = [...departements];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setDepartements(temp)
  };

  const handleSaveEditStaffButton = (e) => {
    const temp = [...staffs];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setStaffs(temp)
  };

  const handleDeleteDepartement = (e) => {
    const temp = [...departements];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setDepartements(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };

  const handleDeleteStaff = (e) => {
    const temp = [...staffs];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setStaffs(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };

  const handleSaveStaffButton = (e) => {
    setStaffs([...staffs, e])
  };

  
  const handleSaveDepartementPositionButton = (e) => {
    setDepartementPositions([...departementPositions, e])
  };

  const handleSaveEditDepartementPositionButton = (e) => {
    const temp = [...departementPositions];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setDepartementPositions(temp)
  };


  const handleDeleteDepartementPosition = (e) => {
    const temp = [...departementPositions];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setDepartementPositions(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };


  return (
    <div>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>User Management</Typography>
      </Paper>
      <div className={classes.root}>
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
          <Paper elevation={0} className={classes.colorPrimary}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              style={{ color: 'white' }}
              aria-label="project personInCharge tabs"
              className={classes.tabs}
            >
              <Tab label="Staff" {...a11yProps(0)} />
              <Tab label="Departement" {...a11yProps(1)} />
              <Tab label="Position" {...a11yProps(2)} />
            </Tabs>
          </Paper>
          <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
            {staffsLoading ?
              <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
                <CircularProgress size={100} />
              </div>
              :
              <Staffs
                decodedToken={decodedToken}
                organization_id={decodedToken.organization_id}
                departements={departements}
                departementPositions={departementPositions}
                staffs={staffs}
                handleSaveButton={handleSaveStaffButton}
                handleSaveEditButton={handleSaveEditStaffButton}
                handleDeleteStaff={handleDeleteStaff}
              />
            }
          </TabPanel>
          <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={1}>
            <Departements
              decodedToken={decodedToken}
              organization_id={decodedToken.organization_id}
              departements={departements}
              handleSaveEditButton={handleSaveEditDepartementButton}
              handleSaveButton={handleSaveDepartementButton}
              handleDeleteDepartement={handleDeleteDepartement}
            />
          </TabPanel>
          <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={2}>
          <DepartementPositions
              decodedToken={decodedToken}
              departementPositions={departementPositions}
              organization_id={decodedToken.organization_id}
              handleSaveEditButton={handleSaveEditDepartementPositionButton}
              handleSaveButton={handleSaveDepartementPositionButton}
              handleDeleteDepartementPosition={handleDeleteDepartementPosition}
            />
        </TabPanel>
        </Paper>
      </div>
    </div>
  );
}