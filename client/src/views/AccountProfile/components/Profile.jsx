import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  font: {
    fontWeight: 600
  },
  label: {
    paddingBottom: '0px'
  },
  [theme.breakpoints.down('xs')]: {
    l: {
      padding: '0px'
    },
  }
}));

const Profile = props => {

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState(props.profile);
  // const [departement, setDepartement] = useState(
  //   { departement_name: "" }
  // );

  useEffect(() => {
    setProfile(props.profile)
  }, [props.profile, setProfile]);

  // useEffect(() => {
  //   setDepartement(props.departement)
  // }, [props.departement, setDepartement]);

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <CardContent>
        <Grid
          container
          spacing={4}

        // style={{minHeight:300}}
        >

          <Grid
            className={classes.center}
            item
            md={3}
            xs={12}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Name</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            className={classes.center}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" >{profile.staff_name}</Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Email</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={sm ? { paddingTop: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="body1" style={{ color: 'blue' }}>{profile.email}</Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            style={sm ? { paddingBottom: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="subtitle2" className={classes.font}>Phone Number</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={sm ? { paddingTop: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="body1">{profile.phone_number}</Typography>

          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            style={sm ? { paddingBottom: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="subtitle2" className={classes.font}>Position Name</Typography>
          </Grid>
          <Grid
            item
            md={9}
            style={sm ? { paddingTop: 0 } : {}}
            xs={12}
            className={classes.center}
          >
            <Typography variant="body1">{profile.position_name}</Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            style={sm ? { paddingBottom: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="subtitle2" className={classes.font}>Departement</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={sm ? { paddingTop: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="body1">
              {
                props.departement_name
              }
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            style={sm ? { paddingBottom: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="subtitle2" className={classes.font}>Organization</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={sm ? { paddingTop: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="body1">
              {
                props.organization_name
              }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </form >
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
