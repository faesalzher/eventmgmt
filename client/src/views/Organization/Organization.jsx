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
  Staffs,
  Departements,
} from './components';
import jwtDecode from "jwt-decode";

const DEPARTEMENS_QUERY = gql`
query departements($organization_id:String!){
  departements(organization_id: $organization_id){
    _id
    departement_name
  }
}
`;

const STAFFS_QUERY = gql`
query staffs($organization_id:String!){
  staffs(organization_id: $organization_id){
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
      organization_id
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
}));

export default function Organization() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [departements, setDepartements] = useState([]);
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

  const { data: departementsData, refetch: departementsRefetch } = useQuery(DEPARTEMENS_QUERY, {
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

  console.log(staffs)
  useEffect(() => {
    refresh();
  });
  // useEffect(() => {
  //   const onCompleted = (staffsData) => { setDepartements(staffsData.staffs) };
  //   const onError = (staffsError) => { /* magic */ };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !staffsLoading && !staffsError) {
  //       onCompleted(staffsData);
  //     } else if (onError && !staffsLoading && staffsError) {
  //       onError(staffsError);
  //     }
  //   }
  // }, [staffsLoading, staffsData, staffsError]);

  const refresh = () => {
    staffsRefetch();
    departementsRefetch();
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

  return (
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
        <Paper elevation={0} style={{ backgroundColor: 'orange' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            style={{ color: 'white' }}
            aria-label="project comitee tabs"
            className={classes.tabs}
          >
            <Tab label="Staff" {...a11yProps(0)} />
            <Tab label="Departement" {...a11yProps(1)} />
            {/* <Tab label="Organization" {...a11yProps(2)} /> */}
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
              departements={departements}
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
        {/* <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={2}>

        </TabPanel> */}
      </Paper>
    </div>
  );
}