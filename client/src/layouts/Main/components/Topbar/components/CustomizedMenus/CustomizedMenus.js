import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";

import {
  List,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import theme from "theme";
import { ThemeProvider } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InputIcon from "@material-ui/icons/Input";
import { Link as RouterLink } from "react-router-dom";
import { ConfirmationDialog } from "components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));
export default function CustomizedMenus(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLogOutModal, setOpenLogOutModal] = useState(false);

  const handleCloseLogOutModal = () => {
    setOpenLogOutModal(false);
  };

  const handleLogOutModal = (event) => {
    setOpenLogOutModal(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    props.logOut();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{
          display: "flex",
          backgroundColor: "transparent",
          textTransform: "none",
        }}
      >
        {props.decodedToken.user_type === "staff" ? (
          <PersonIcon
            style={{ color: "white", margin: "0px 2px", fontSize: 18 }}
          />
        ) : (
          <SupervisorAccountIcon
            style={{ color: "white", margin: "0px 2px", fontSize: 18 }}
          />
        )}

        <Typography
          variant="body1"
          className={classes.text}
          style={{ color: "white" }}
        >
          {props.decodedToken.user_type === "organization"
            ? props.profileOrganization.email
            : props.profileStaff.email}
        </Typography>
        <ArrowDropDownIcon style={{ color: "white" }} />
      </Button>
      <ConfirmationDialog
        type="Log Out"
        name=""
        content=""
        open={openLogOutModal}
        handleConfirm={handleLogOut}
        close={handleCloseLogOutModal}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              onClick={handleClose}
              component={RouterLink}
              to="/account"
            >
              <ListItemIcon style={{ minWidth: 20 }}>
                <AccountBoxIcon style={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button onClick={() => handleLogOutModal()}>
              <ListItemIcon style={{ minWidth: 20 }}>
                <InputIcon style={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </ThemeProvider>
  );
}
