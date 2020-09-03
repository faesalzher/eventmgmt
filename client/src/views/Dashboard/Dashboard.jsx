import React from 'react';
// import { makeStyles } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import image1 from "assets/planer_desk.jpg";
import image2 from "assets/project.png";

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

const Dashboard = () => {
  // const classes = useStyles();
  // const styles = AwsSliderStyles();
  return (
      <AwesomeSlider >
        <div data-src={image1} />
        <div data-src={image2} />
      </AwesomeSlider>
  );
};

export default Dashboard;
