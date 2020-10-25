import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tabs, Tab, Paper, Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import { useParams } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import jwtDecode from "jwt-decode";

import {
  IconButton,
} from '@material-ui/core';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';

import {
  ProjectEventList,
  ProjectComitee,
  ProjectOverview,
} from 'views';

import {
  ProjectEditModal
} from './components';

const PROJECT_QUERY = gql`
  query project($project_id: String!){
    project(_id:$project_id) {
      _id
      project_name
      project_description
      cancel
      project_start_date
      project_end_date
      picture
      organization_id
    }
  }
`;

const DIVISIONSBYPROJECT_QUERY = gql`
  query divisionsByProject($project_id: String!){
    divisionsByProject(project_id:$project_id) {
      _id
      division_name
      project_id
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
  iconbutton: {
    "&:hover": {
      color: 'black'
    },
  },
}));

export default function ProjectDetail() {
  const classes = useStyles();
  const theme = useTheme();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const browserHistory = createBrowserHistory();
  let { project_id } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [project, setProject] = React.useState({project_name:""});
  const [divisions, setDivisions] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

 
  const { data } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: project_id },
      onCompleted: () => {
        setProject(data.project)
      }
    });

  const { data: divisionsData, refetch: divisionsRefetch } = useQuery(DIVISIONSBYPROJECT_QUERY, {
    variables: { project_id: project_id },
    onCompleted: () => {
      setDivisions(
        divisionsData.divisionsByProject
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    divisionsRefetch();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveEditProjectButton = (e) => {
    setProject(e)
  };

  const handleSaveDivisionButton = (e) => {
    setDivisions([...divisions, e])
  };

  const handleSaveEditDivisionButton = (e) => {
    const temp = [...divisions];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setDivisions(temp)
  };

  const handleDeleteDivision = (e) => {
    const temp = [...divisions];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setDivisions(temp);
    // setTimeout(() => {
    //   handleOpenSnackbar();
    // }, 700);
  };

  const breadcrumb_item = [
    { name: 'Project List', link: '/project' },
    { name: project.project_name, link: '/project' }
  ]
  return (
    <div className={classes.tabs_root}>
      <Paper position="static" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} elevation={1} color="default">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton className={classes.iconbutton} style={{ marginLeft: 1 }} onClick={browserHistory.goBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        {/* <div style={{ justifyContent: 'center', display: 'flex' }}> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          // scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{}}
        >
          <Tab label="Comitee" {...a11yProps(0)} />
          <Tab label="Event List" {...a11yProps(1)} />
          <Tab label="Overview Project" {...a11yProps(2)} />
        </Tabs>
        {/* </div> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton onClick={handleOpenEditModal} className={classes.iconbutton}>
            <SettingsIcon />
          </IconButton>
          <ProjectEditModal
            open={openEditModal}
            organization_id={decodedToken.organization_id}
            divisions={divisions}
            close={handleCloseEditModal}
            handleSaveEditButton={handleSaveEditProjectButton}
            project={project}
          />
        </div>
      </Paper>
      <div className={classes.root}>
        <div style={{ paddingLeft: 30, paddingTop: 8 }}>
          <BreadCrumbs breadcrumb_item={breadcrumb_item} />
        </div>
        <div style={{ overflowX: 'auto', }}>
          <TabPanel value={value} index={0} dir={theme.direction} style={{ padding: '0px 30px', paddingBottom: 10 }}>
            <ProjectComitee
              project_id={project_id}
              divisions={divisions}
              handleSaveEditButton={handleSaveEditDivisionButton}
              handleSaveButton={handleSaveDivisionButton}
              handleDeleteDivision={handleDeleteDivision}
            />
          </TabPanel>
        </div>
        <TabPanel value={value} index={1} dir={theme.direction} style={{ padding: '0px 30px' }}>
          <ProjectEventList project={project}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} style={{ padding: '0px 30px' }} >
          <ProjectOverview project={project} divisions={divisions}/>
        </TabPanel>
      </div>
    </div>
  );
}
