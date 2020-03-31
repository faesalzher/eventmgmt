import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 'fit-content',
    marginBottom: -70,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: 15
  },
  name: {
    marginTop: theme.spacing(1),
    display: 'flex',

  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Faesal Herlambang',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <div>
        <Typography variant="h6" className={classes.name} >
          {user.name}
        </Typography>
        <Typography variant="body2"  className={classes.name}>{user.bio}</Typography>
        </div>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
