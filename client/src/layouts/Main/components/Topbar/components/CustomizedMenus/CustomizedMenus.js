import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{
          display: "flex",
          backgroundColor: "transparent",
          textTransform: "none",
        }}
      >
        {props.decodedToken.user_type === "staff" ? (
          <PersonIcon style={{ color: "white", margin: '0px 2px',fontSize: 18 }} />
        ) : (
          <SupervisorAccountIcon style={{ color: "white", margin: '0px 2px',fontSize: 18 }} />
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={"bottom-end"}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "center top" : "bottom-end",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
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
                  <ListItem button onClick={props.logOut}>
                    <ListItemIcon style={{ minWidth: 20 }}>
                      <InputIcon style={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
                {/* <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList> */}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ThemeProvider>
  );
}
