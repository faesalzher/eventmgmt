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

const Organization = props => {

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [organization, setOrganization] = useState(props.organization);
  // const [departement, setDepartement] = useState(
  //   { departement_name: "" }
  // );

  useEffect(() => {
    setOrganization(props.organization)
  }, [props.organization, setOrganization]);

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
            <Typography variant="body1" >{organization.organization_name}</Typography>
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
            <Typography variant="body1" style={{ color: 'blue' }}>{organization.email}</Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Description</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={sm ? { paddingTop: 0 } : {}}
            className={classes.center}
          >
            <Typography variant="body1" style={{ color: 'blue' }}>{organization.Description}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </form >
  );
};

Organization.propTypes = {
  className: PropTypes.string
};

export default Organization;
