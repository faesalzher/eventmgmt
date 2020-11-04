import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Divider,
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
}
)
);

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
            <Typography variant="body1" >{organization.organization_name}</Typography>
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
            style={sm ? { paddingTop: 0 } : {}}
            className={[classes.center, classes.value].join(" ")}

          >
            <Typography variant="body1" style={{ color: 'blue' }}>{organization.email}</Typography>
          </div>
        </div>
        <Divider />

        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Description</Typography>
          </div>
          <div
            style={sm ? { paddingTop: 0 } : {}}
            className={[classes.center, classes.value].join(" ")}

          >
            <Typography variant="body1" style={{ color: 'blue' }}>{organization.description}</Typography>
          </div>
        </div>
        <Divider />
      </CardContent>
      <Divider />
    </form >
  );
};

Organization.propTypes = {
  className: PropTypes.string
};

export default Organization;
