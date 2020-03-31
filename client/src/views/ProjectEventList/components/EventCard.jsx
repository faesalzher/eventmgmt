import React, {  useState, forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import SettingsIcon from '@material-ui/icons/Settings';
// import AddeventsModal from '../AddEventModal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveIcon from '@material-ui/icons/Remove';

// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  LinearProgress,
  Popover,
  MenuItem,
  Paper,
  // Popper,
  MenuList,
  ClickAwayListener,
} from '@material-ui/core';
// import { findByLabelText } from '@testing-library/react';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 30,
    paddingBottom: 1
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 15
  },
  title: {
    fontWeight: 600,
    fontSize: 11
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    fontSize: 12,
  },
  progress: {
    // marginTop: theme.spacing(3),
    // justify: "space-between"

  },
  iconbutton: {
    padding: 1,
    "&:hover": {
      color: 'black'
    },
  },
  status: {
    fontWeight: 450,
    fontSize: 11,
    letterSpacing: '0.0000em'
  },
  button: {
    borderRadius: 0,
    border: '1px solid rgba(143, 143, 143, 0.23)',
    color: 'black',
    padding: 0,
    // paddingRight: 0
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const EventCard = (props) => {
  // const [elevate, setElevate] = useState(1);
  const { handleDelete, className, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();
  const [open, setOpen] = useState(false);



  // const [color, setColor] = useState(
  //   handleColorStatus
  // );


  // useEffect(() => {
  //   props.sc.map(color => {
  //     if (props.event.status === color.status) {
  //       setColor(color.color);
  //     }
  //     return null;
  //   })
  // }, [props.event.status, color.status, props.sc]);


  // const [status, setStatus] = useState(props.event.status);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [handlerDelete, setHandlerDelete] = useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleDeleteDialog = () => {
    setHandlerDelete(true);
  }
  const handleDeleteConfirm = e => {
    setHandlerDelete(false);
    setSpinnerActive(true);
    timer.current = setTimeout(() => {
      handleDelete(e);
    }, 800);
  }

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setAnchorElSettings(null);
  };

  // const handleStatusButton = e => {
  //   setAnchorElStatus(e.currentTarget);
  // };

  const handleSettingsButton = e => {
    setAnchorElSettings(e.currentTarget);
  };


  // const handleStatus = (status, color) => {
  //   setStatus(status);
  //   setColor(color);
  //   handleClose();
  // };

  const openPopOverSettings = Boolean(anchorElSettings);

  const idSettings = openPopOverSettings ? 'simple-popover' : undefined;
  return (
    <Grid
      item
      lg={4}
      sm={6}
      xl={3}
      xs={12}
    >
      {/* <Button
            // activeClassName={classes.active}
            // className={classes.button}
            component={CustomRouterLink}
          >
            "tombol"
          </Button> */}
      <Card
        {...rest}
        className={clsx(classes.root, className, shadowStyles.root)}
        elevation={0}
      >
        {handlerDelete ?
          (
            <CardContent className={classes.root} >
              <div className={classes.root} style={{
                display: "flex",
                flexDirection: "column", justifyContent: "center", verticalAlign: "center",
              }}>
                <Typography style={{ textAlign: "center" }}>
                  Are you sure to delete this event ?
          </Typography>
              </div>
              <div style={{
                paddingLeft: 16,
                paddingRight: 12,
                height: 40,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}>
                <Button style={{ color: 'blue' }} onClick={() => { setHandlerDelete(false); handleClose() }}>Cancel</Button>
                <Button style={{ color: 'red' }} onClick={() => { handleDeleteConfirm(props.event._id); handleClose() }}>Yes</Button>
              </div>
            </CardContent>
          ) : (
            <LoadingOverlay
              active={spinnerActive}
              spinner
            // text='Loading your content...'
            >
              <Tooltip title={"See Details of ".concat(props.event.event_name)}>
                <CardActionArea className={classes.root}
                component={CustomRouterLink}
                to={`/project/${props.project._id}/${props.event._id}`}
                >
                  <CardContent className={classes.root} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}
                      className={classes.root}
                    >
                      <div style={{ width: 'fit-content' }} >
                        <Typography variant="h6" className={classes.content}>
                          {props.event.event_name}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                      <Typography
                        className={classes.status}>
                        0% Completed
                       </Typography>
                      <Typography
                        className={classes.status}>
                        0/0 Tasks
                       </Typography>
                    </div>
                    <div style={{ justifyContent: 'space-between' }}>
                      <LinearProgress
                        className={classes.progress}
                        value={75.5}
                        variant="determinate"
                      />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Tooltip>
              <CardActions style={{
                paddingLeft: 16,
                paddingRight: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', color: 'blue' }}>
                  <DateRangeIcon className={classes.icon} />
                  <Typography className={classes.status}>
                    {props.event.event_start_date.slice(4, 15)}
                  </Typography>
                  <RemoveIcon className={classes.icon} />
                  <Typography className={classes.status}>
                    {props.event.event_end_date.slice(4, 15)}
                  </Typography>
                </div>

                <IconButton className={classes.iconbutton} onClick={handleSettingsButton}>
                  <SettingsIcon className={classes.icon} />
                </IconButton>
                <Popover
                  id={idSettings}
                  open={openPopOverSettings}
                  anchorEl={anchorElSettings}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <Paper elevation={7}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open}>
                        <MenuItem className={classes.status}>Edit</MenuItem>
                        <MenuItem className={classes.status} onClick={() => handleDeleteDialog()}>Delete</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popover>
                {/* <button onClick={console.log(props.event._id)}> hapuss</button> */}
              </CardActions>
            </LoadingOverlay>
          )
        }

      </Card>
    </Grid >
  );
};


export default React.memo(EventCard);
