import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  Typography,
  Snackbar,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import { useParams } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { useQuery } from '@apollo/react-hooks';
import MuiAlert from '@material-ui/lab/Alert';
// import { UseSimeContext } from "context/context.jsx";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import jwtDecode from "jwt-decode";

import {
  IconButton,
} from '@material-ui/core';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';

import {
  ProjectEventList,
  ProjectPersonInCharge,
  ProjectOverview,
} from 'views';

import {
  ProjectEditModal
} from './components';

import {
  PROJECT_QUERY,
  ORGANIZATION_QUERY,
  EVENTS_QUERY,
  PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY,
  PERSON_IN_CHARGES_BY_PROJECT_QUERY,
} from 'gql';



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
      {value === index && <Box style={{}}>{children}</Box>}
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
    // padding: '0px 10px',
    paddingTop: theme.spacing(1),
  },
  tabs_root: {
    // backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

export default function ProjectDetail() {
  const classes = useStyles();
  const theme = useTheme();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const browserHistory = createBrowserHistory();
  let { project_id } = useParams();
  const staff_id = decodedToken.staff_id
  const [value, setValue] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [project, setProject] = useState({ project_name: "" });
  const [project_personInCharge, setProject_personInCharge] = useState({ position_id: "", committee_id: "", staff_id: "" });
  const [personInCharges, setPersonInCharges] = useState([]);
  const [events, setEvents] = useState([]);

  const [openEditModal, setOpenEditModal] = useState(false);



  const { data } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: project_id },
      onCompleted: () => {
        setProject(data.project)
      }
    });

  const { data: personInChargeData, loading: personInChargeLoading, error: personInChargeError, refetch: personInChargeRefetch } =
    useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
      variables: { project_id: project_id, staff_id: staff_id },
    }
    );

  const { data: personInChargesData, loading: personInChargesLoading, error: personInChargesError, refetch: personInChargesRefetch } =
    useQuery(PERSON_IN_CHARGES_BY_PROJECT_QUERY, {
      variables: { project_id: project_id },
    }
    );

  const { loading: eventsLoading, error: eventsError, data: eventsData, refetch: eventsRefetch } =
    useQuery(EVENTS_QUERY,
      {
        variables: { project_id: project_id },
      });

  useEffect(() => {
    const onCompleted = (personInChargesData) => {
      setPersonInCharges(
        personInChargesData.person_in_charges
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargesLoading && !personInChargesError) {
        onCompleted(personInChargesData);
      } else if (onError && !personInChargesLoading && personInChargesError) {
        onError(personInChargesError);
      }
    }
  }, [personInChargesLoading, personInChargesData, personInChargesError]);

  useEffect(() => {
    const onCompleted = (personInChargeData) => {
      if (personInChargeData  && personInChargeData.person_in_charges_by_staff_and_project !== null) {
        setProject_personInCharge(personInChargeData.person_in_charges_by_staff_and_project)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargeLoading && !personInChargeError) {
        onCompleted(personInChargeData);
      } else if (onError && !personInChargeLoading && personInChargeError) {
        onError(personInChargeError);
      }
    }
  }, [personInChargeLoading, personInChargeData, personInChargeError]);

  useEffect(() => {
    const onCompleted = (eventsData) => { setEvents(eventsData.events) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !eventsLoading && !eventsError) {
        onCompleted(eventsData);
      } else if (onError && !eventsLoading && eventsError) {
        onError(eventsError);
      }
    }
  }, [eventsLoading, eventsData, eventsError]);

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    personInChargeRefetch();
    personInChargesRefetch();
    eventsRefetch();
  };
  console.log(project_personInCharge)

  const { data: organizationData } =
    useQuery(ORGANIZATION_QUERY, {
      variables: { _id: decodedToken.organization_id },
    }
    );
  if (!organizationData) return (<></>)

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEditProjectButton = (e) => {
    setProject(e)
  };

  const handleSaveEventButton = (e) => {
    setEvents([...events, e]);
  }


  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };



  const handleSaveEditPersonInChargeButton = (e) => {
    const temp = [...personInCharges];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setPersonInCharges(temp)
  };



  const handleDeletePersonInCharge = (e) => {
    const temp = [...personInCharges];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setPersonInCharges(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };

  const handleSavePersonInChargeButton = (e) => {
    setPersonInCharges([...personInCharges, e])
  };

  const breadcrumb_item = [
    { name: organizationData.organization.organization_name, link: '/project' },
    { name: project.project_name }
  ]

  return (
    <div className={classes.tabs_root}>
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
      <AppBar position="static" className={classes.appBar} elevation={2} color="primary">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton style={{ marginLeft: 1 }} onClick={browserHistory.goBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        {/* <div style={{ justifyContent: 'center', display: 'flex' }}> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          // textColor="white"
          variant="scrollable"
          // scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{}}
        >
          <Tab label="Event List" {...a11yProps(0)} />
          <Tab label="Committee" {...a11yProps(1)} />
          <Tab label="Overview Project" {...a11yProps(2)} />
        </Tabs>
        {/* </div> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {
            (project_personInCharge.order === '1' || decodedToken.user_type === "organization") ?
              <>
                <IconButton onClick={handleOpenEditModal} >
                  <SettingsIcon />
                </IconButton>
                <ProjectEditModal
                  open={openEditModal}
                  decodedToken={decodedToken}
                  organization_id={decodedToken.organization_id}
                  personInCharges={personInCharges}
                  events={events}
                  project_personInCharge={project_personInCharge}
                  close={handleCloseEditModal}
                  handleSaveEditButton={handleSaveEditProjectButton}
                  project={project}
                  project_id={project_id}
                />
              </>
              :
              <>
              </>
          }
        </div>
      </AppBar>
      <div className={classes.root}>
        <div style={{ justifyContent: 'space-between', padding: '8px 30px' }}>
          <div>
            <BreadCrumbs breadcrumb_item={breadcrumb_item} />
          </div>
        </div>
        <TabPanel value={value} index={0} dir={theme.direction} style={{ padding: '0px 30px' }}>
          <ProjectEventList
            events={events}
            loading={eventsLoading}
            project={project}
            project_id={project_id}
            project_personInCharge={project_personInCharge}
            decodedToken={decodedToken}
            handleSaveEventButton={handleSaveEventButton}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{ padding: '0px 30px', paddingBottom: 10 }}>
          <ProjectPersonInCharge
            project_id={project_id}
            personInCharges={personInCharges}
            project_personInCharge={project_personInCharge}
            handleSavePersonInChargeButton={handleSavePersonInChargeButton}
            handleSaveEditPersonInChargeButton={handleSaveEditPersonInChargeButton}
            handleDeletePersonInCharge={handleDeletePersonInCharge}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} style={{ padding: '0px 30px' }} >
          <ProjectOverview project={project} project_id={project_id} personInCharges={personInCharges} />
        </TabPanel>
      </div>
    </div >
  );
}
