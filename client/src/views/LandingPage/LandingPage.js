import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "views/LandingPage/components/Header/Header.js";
import Footer from "views/LandingPage/components/Footer/Footer.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "views/LandingPage/components/Header/HeaderLinks.js";
import Parallax from "views/LandingPage/components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import logo from 'assets/image.png'

// import Flaticon from 'assets/fonts/Flaticon.woff2';
// import PoppinsLight from 'assets/fonts/Poppins-Light.ttf';


// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import Sponsors from "./Sections/Sponsors.js";

import {
  Grid,
  // Fade, 
  Typography
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
const dashboardRoutes = [];


const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <CssBaseline />
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={
          <img
            alt="Logo"
            src={logo}
            width='30'
            height='30'
          />
        }
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />

      <Parallax filter image={require("assets/planer_desk.jpg")}>
        <div className={classes.container}>
          <Grid container style={{ justifyContent: 'center' }}>
            <Grid item>
              <Typography variant="h1" style={{ color: 'white', textAlign: 'center', fontWeight: 600, fontSize: '3rem' }}>SEMINAR SOFTWARE FREEDOM DAY 2020</Typography>
              <Typography variant="subtitle1" style={{ color: 'white', textAlign: 'center', marginTop: 5 }}>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </Typography>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <i className="fas fa-play" />
                Watch video
              </Button> */}
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <Sponsors />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
