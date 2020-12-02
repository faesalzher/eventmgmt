import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

import { useQuery } from '@apollo/react-hooks';
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
import jwtDecode from "jwt-decode";

import {
  ORGANIZATION_QUERY,
  // ORGANIZATION_NAME_QUERY,
  STAFF_QUERY,
} from 'gql';

import {
  ProfileDetailCard,
  OrganizationDetailCard
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.main,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
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


const AccountProfile = () => {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const initialFormState = {
    staff_name: '',
    departement_position_id: '',
    departement_id: '',
    email: '',
    phone_number: '',
    organization_id: ""
  }

  const [profile, setProfile] = useState(initialFormState)
  const [organization, setOrganization] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: dataStaff, refetch: refetchProfile } = useQuery(STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    onCompleted: () => {
      if (dataStaff && dataStaff.staff !== null) {
        setProfile(
          dataStaff.staff
        )
      }
      // org();
      // dept();
    }
  }
  );

  const { data: dataOrganization, refetch: organizationRefetch } = useQuery(ORGANIZATION_QUERY, {
    variables: { _id: profile.organization_id },
    onCompleted: () => {
      if (dataOrganization.organization !== null) {
        setOrganization(dataOrganization.organization);
      }
    },
  });



  // const { data: dataOrganization, refetch: organizationRefetch } = useQuery(ORGANIZATION_QUERY, {
  //   variables: { _id: decodedToken.organization_id },
  //   onCompleted: () => {
  //     if (dataOrganization.organization !== null) {
  //       setOrganization(dataOrganization.organization);
  //     }
  //   },
  // });


  // useEffect(() => {
  //   // org();
  //   dept();
  // }, [org, dept]);

  useEffect(() => {
    refresh();
  });

  // useEffect(() => {
  //   const onCompleted = (dataStaff) => {
  //     setProfile(
  //       dataStaff.staff
  //     )
  //   };
  //   const onError = (error) => {
  //     /* magic */
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !loadingProfile && !errorProfile) {
  //       onCompleted(dataStaff);
  //     } else if (onError && !loadingProfile && errorProfile) {
  //       onError(errorProfile);
  //     }
  //   }
  // }, [loadingProfile, dataStaff, errorProfile]);

  const refresh = () => {
    refetchProfile();
    // organizationRefetch();
    organizationRefetch();

  }

  const handleSaveEditProfileButton = (profileForm) => {
    setProfile(profileForm);
  }

  const handleSaveEditOrganizationButton = organizationForm => {
    setOrganization(organizationForm)
  }

  return (
    <div>
      <Paper className={classes.colorPrimary}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          style={{ color: 'white' }}
          aria-label="project personInCharge tabs"
        // className={classes.tabs}
        >
          <Tab label="My Profile" {...a11yProps(0)} />
          <Tab label="My Organization" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <div className={classes.root} >
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={0}>
          <ProfileDetailCard
            handleSaveEditButton={handleSaveEditProfileButton}
            profile={profile}
            organization={organization}
            decodedToken={decodedToken}
          />
        </TabPanel>
        <TabPanel style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} value={value} index={1}>
          <OrganizationDetailCard
            decodedToken={decodedToken}
            organization={organization}
            handleSaveEditButton={handleSaveEditOrganizationButton}
          />
        </TabPanel>
      </div>
    </div>
  );
};

export default AccountProfile;
