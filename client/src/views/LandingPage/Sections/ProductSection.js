import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import FaceIcon from '@material-ui/icons/Face';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EventIcon from '@material-ui/icons/Event';

// core components
import InfoArea from "views/LandingPage/components/InfoArea/InfoArea.js";

import {
  Grid,
  Typography
} from '@material-ui/core';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8}>   
        <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
          <EventIcon style={{color:'blue'}} />
          </div>
          <Typography variant="h1" style={{ color: 'blue', marginRight:5, textAlign: 'center', fontWeight: 600, fontSize: 25 }}>
            25th</Typography>
          <Typography variant="h1" style={{ color: 'black', textAlign: 'center', fontWeight: 500, fontSize: 15 }}>
            December 2020</Typography>
          </div>
          <h2 className={classes.title}>Why You Should Join?</h2>          
          <h5 className={classes.description}>
            This is the paragraph where you can write more details about your
            event. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </h5>      
        </Grid>
      </Grid>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <InfoArea
              title="Special Guests"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              "
              icon={FaceIcon}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InfoArea
              title="Special Service"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
              icon={FreeBreakfastIcon}
              iconColor="success"
              vertical
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InfoArea
              title="Special Insight"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
              icon={EmojiObjectsIcon}
              iconColor="warning"
              vertical
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
