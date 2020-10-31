import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Divider,
  div,
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
  column: {
    width: '30%',
  },
  value: {
    width: '70%',
  },
  row: {
    display: 'flex',
    padding: '10px 0px',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }, 
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
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Name</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" >{profile.staff_name}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Email</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" style={{ color: 'blue' }}>{profile.email}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Phone Number</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">{profile.phone_number}</Typography>

          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Position Name</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">{profile.position_name}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Departement</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                props.departement_name
              }
            </Typography>
          </div>
        </div><Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Organization</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                props.organization_name
              }
            </Typography>
          </div>
        </div>
        <Divider />
      </CardContent>
    </form >
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
