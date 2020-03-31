import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Badge, IconButton, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    color: "white",
    flexGrow: 1,
    display: 'flex',
    marginTop: theme.spacing(0.5)
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  // const { className } = props;
  // const breadcrumb_item = [
  //   { name: 'Project List', link: '/project' },
  //   { name: "Projec List", link: '/project' }
  // ]
  const classes = useStyles();

  const [notifications] = useState([]);
  return (

    <div className={classes.root}>
      <div className={classes.root}>
        <Typography variant='h6'>
          Event Management
          </Typography>
          {/* <BreadCrumbs breadcrumb_item={breadcrumb_item}/> */}
      </div>
        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          className={classes.signOutButton}
          color="inherit"
        >
          <InputIcon />
        </IconButton>
    </div>
  );
};

// Topbar.propTypes = {
//   className: PropTypes.string,
//   onSidebarOpen: PropTypes.func
// };

export default Topbar;
