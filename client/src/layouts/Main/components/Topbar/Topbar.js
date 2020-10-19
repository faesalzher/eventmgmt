import React from "react";
// import { Link as RouterLink } from 'react-router-dom';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import { IconButton, Typography, Tooltip } from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { useAuth } from "context/auth.jsx";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "white",
    flexGrow: 1,
    display: "flex",
    marginTop: theme.spacing(0.5),
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  // const { className } = props;
  // const breadcrumb_item = [
  //   { name: 'Project List', link: '/project' },
  //   { name: "Projec List", link: '/project' }
  // ]
  const { setAuthTokens } = useAuth();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  function logOut() {
    setAuthTokens();
    localStorage.removeItem("jwtToken");
  }

  const classes = useStyles();

  // const [notifications] = useState([]);
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Typography variant="h6">
          Event Management
          {decodedToken.user_type === "organization" ? " (Admin)" : ""}
        </Typography>
        {/* <BreadCrumbs breadcrumb_item={breadcrumb_item}/> */}
      </div>
      {/* <IconButton color="inherit">
        <Badge
          badgeContent={notifications.length}
          color="primary"
          variant="dot"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton> */}
      <Tooltip arrow title="Logout" aria-label="confirm">
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={() => logOut()}
        >
          <InputIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

// Topbar.propTypes = {
//   className: PropTypes.string,
//   onSidebarOpen: PropTypes.func
// };

export default Topbar;
