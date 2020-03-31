import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import client1 from "assets/client-1.jpg";
import client2 from "assets/client-2.png";
import client3 from "assets/client-3.png";

import {
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Sponsors() {
  const classes = useStyles();
  const imageClasses = classNames(
    // classes.imgRaised,
    // classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Sponsored By</h2>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
              <Grid item xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={client1} alt="..." className={imageClasses} />
              </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
              <Grid item xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={client2} alt="..." className={imageClasses} />
              </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
              <Grid item xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={client3} alt="..." className={imageClasses} />
              </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
