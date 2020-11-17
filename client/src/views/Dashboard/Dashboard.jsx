import React from 'react';
import { makeStyles } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';
// import image1 from "assets/planer_desk.jpg";
// import image2 from "assets/project.png";
import { DashboardOrganization, DashboardStaff } from './components';

import jwtDecode from "jwt-decode";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        decodedToken.user_type === "organization" ?
          <DashboardOrganization decodedToken={decodedToken} />
          :
          <DashboardStaff decodedToken={decodedToken}/>
      }
    </div>
  );
};

export default Dashboard;
