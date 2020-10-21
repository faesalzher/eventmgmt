import React from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
// import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import SettingsIcon from '@material-ui/icons/Settings';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link as RouterLink } from 'react-router-dom';
import logo from 'assets/image.png'
// import { StatusBullet } from 'components';
import EventIcon from '@material-ui/icons/Event';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 200,
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  divider: {
    marginTop: theme.spacing(1)
  },
  nav: {
    // padding: theme.spacing(2),
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  logo:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: theme.spacing(1)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Project',
      href: '/project',
      icon: <EventIcon />
    },
    {
      title: 'Organization',
      href: '/organization',
      icon: <PeopleIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
    // ,
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.logo}> 
        <RouterLink to="/">
          <img
            alt="Logo"
            src={logo}
            width='40'
            height='40'
          />
      </RouterLink>
      </div>
      <Divider className={classes.divider} />
      <SidebarNav
        className={classes.nav}
        pages={pages}
      />
      <Divider />
      <Profile collapsed={props.collapsed}/>
    </div>
  );
};

// Sidebar.propTypes = {
//   className: PropTypes.string,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired,
//   variant: PropTypes.string.isRequired
// };

export default Sidebar;
