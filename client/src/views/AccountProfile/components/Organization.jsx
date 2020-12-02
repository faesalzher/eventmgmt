import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
  Avatar,
  CardHeader,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  centerHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
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
  avatar: {
    height: 100,
    width: 100,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.white
  },
  subheader: {
    color: theme.palette.divider
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    header: {
      display: 'block'
    },
    avatarHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 16
    },
    title: {
      textAlign: 'center'
    }
  }
}));

const Organization = props => {

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [organization, setOrganization] = useState(props.organization);
  // const [organizationForm, setOrganizationForm] = useState(props.organization);
  // useEffect(() => {
  //   setOrganizationForm(props.organization)
  // }, [setOrganizationForm, props.organization]);
  useEffect(() => {
    setOrganization(props.organization)
  }, [props.organization, setOrganization]);

  const isAdmin = props.decodedToken.user_type === "organization" ? true : false;
  return (
    <form
      autoComplete="off"
      noValidate
    >
      <CardHeader
        className={classes.header}
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.centerHeader].join(" ")}>
              {organization.organization_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.centerHeader].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {organization.email}
            </Typography>
          </div>
        }
        action={
          isAdmin ?
            <div className={classes.title}>
              <Tooltip arrow title="Edit Organization" aria-label="confirm">
                <IconButton onClick={props.handleOpenEditPage}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
            : <></>
        }
        avatar={
          <div style={{ padding: 10 }}>
            {
              <div className={classes.avatarHeader}>
                <Avatar
                  className={classes.avatar}
                  src={organization.picture}
                />
              </div>
            }
          </div>
        }
      >
      </CardHeader>
      <CardContent style={{ backgroundColor: 'white' }}>
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
            <Typography variant="body1">
              {
                props.organization.organization_name
              }
            </Typography>
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
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                props.organization.description
              }
            </Typography>
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
            <Typography variant="body1" style={{ color: 'blue' }}>{organization.email}</Typography>
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
            <Typography variant="body1">{organization.phone_number}</Typography>

          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Address</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" >{organization.address}</Typography>
          </div>
        </div>
        <Divider />
      </CardContent>
    </form >
  );
};

Organization.propTypes = {
  className: PropTypes.string
};

export default Organization;
