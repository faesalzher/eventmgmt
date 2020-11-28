import React from "react";
import clsx from "clsx";
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactsIcon from '@material-ui/icons/Contacts';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
// import ImageIcon from '@material-ui/icons/Image';
// import SettingsIcon from '@material-ui/icons/Settings';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link as RouterLink } from "react-router-dom";
import logo from "assets/image.png";
// import { StatusBullet } from 'components';
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderIcon from "@material-ui/icons/Folder";
import jwtDecode from "jwt-decode";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  nav: {
    // padding: theme.spacing(2),
    // backgroundColor: 'yellow',
    alignItems: "center",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
    marginTop: theme.spacing(1),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const classes = useStyles();

  const OrganizationPages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "All Project",
      href: "/project",
      icon: <FolderIcon />,
    },
    {
      title: "My Tasks",
      href: "/mytasks",
      icon: <AssignmentIcon />,
    },
    {
      title: "Committeee",
      href: "/committeee",
      icon: <ContactsIcon />,
    },
    {
      title: "User Management",
      href: "/user_management",
      icon: <PeopleAltIcon />,
    }
  ];

  const StaffPages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "My Project",
      href: "/project",
      icon: <FolderIcon />,
    },
    {
      title: "My Tasks",
      href: "/mytasks",
      icon: <AssignmentIcon />,
    },
    
  ];

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.logo}>
        <RouterLink to="/">
          <img alt="Logo" src={logo} width="40" height="40" />
        </RouterLink>
      </div>
      <Divider className={classes.divider} />
      <SidebarNav
        className={classes.nav}
        collapsed={props.collapsed}
        pages={
          decodedToken.user_type === "organization"
            ? OrganizationPages
            : StaffPages
        }
      />
      <Divider />
      <Profile collapsed={props.collapsed} />
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
