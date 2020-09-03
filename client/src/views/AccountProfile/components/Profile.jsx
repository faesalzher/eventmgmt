import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  // LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    // flexDirection: 'column'
  },
  avatar: {
    margin: 10,
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Faesal H',
    departement: 'Keuangan',
    position_name: 'staff',
    avatar: '/images/avatars/avatar_11.png'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div>
              <Typography
                // gutterBottom
                variant="h4"
              >
                {user.name}
            </Typography>
            </div>
            <div>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                {user.position_name} of {user.departement} Departement
            </Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardActions style={{display:'flex', justifyContent:'space-between'}}>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
