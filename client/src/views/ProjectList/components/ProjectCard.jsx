import React, { useState,forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import SettingsIcon from '@material-ui/icons/Settings';
// import AddprojectsModal from '../AddProjectModal';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveIcon from '@material-ui/icons/Remove';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import image from 'assets/project.png'
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
import { NavLink as RouterLink } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

const STAFFSBYID_QUERY = gql`
  query staffById($_id: String!){
    staffById(_id:$_id) {
      _id
      staff_name      
    }
  }
`;
const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: 80,
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
  },
  media: {
    height: 110,
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const ProjectCard = (props) => {
  // const [elevate, setElevate] = useState(1);
  const { handleDelete, className, ...rest } = props;
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();
  const [open, setOpen] = useState(false);

  const handleColorStatus = () => {
    if (props.project.status === "No Status") return "white"
    if (props.project.status === "Completed") return "#3dc5d1"
    if (props.project.status === 'Planned') return 'Yellow'
    if (props.project.status === 'Active') return '#6cba47'
    if (props.project.status === 'Completed') return '#3dc5d1'
    if (props.project.status === 'On Hold') return "#d8dce3"
    if (props.project.status === 'Cancelled') return "#d8dce3"
  }

  const [color, setColor] = useState(
    handleColorStatus
  );


  // useEffect(() => {
  //   props.sc.map(color => {
  //     if (props.project.status === color.status) {
  //       setColor(color.color);
  //     }
  //     return null;
  //   })
  // }, [props.project.status, color.status, props.sc]);
  const [headOfProject, setHeadOfProject] = useState([]);

  const { data } = useQuery(STAFFSBYID_QUERY,
    {
      variables: { _id: props.project.head_of_project_id },
      onCompleted: () => { setHeadOfProject(data.staffById) }
    });
  const [status, setStatus] = useState(props.project.status);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
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
    }, 700);

  }

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setAnchorElStatus(null);
    setAnchorElSettings(null);
  };

  const handleStatusButton = e => {
    setAnchorElStatus(e.currentTarget);
  };

  const handleSettingsButton = e => {
    setAnchorElSettings(e.currentTarget);
  };


  const handleStatus = (status, color) => {
    setStatus(status);
    setColor(color);
    handleClose();
  };

  const openPopOverStatus = Boolean(anchorElStatus);
  const openPopOverSettings = Boolean(anchorElSettings);

  const idStatus = openPopOverStatus ? 'simple-popover' : undefined;
  const idSettings = openPopOverSettings ? 'simple-popover' : undefined;

  return (
    <Grid
      item
      lg={3}
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
        elevation={1}
      >
        {handlerDelete ?
          (
            <CardContent className={classes.root} >
              <div className={classes.root} style={{
                display: "flex",
                flexDirection: "column", justifyContent: "center", verticalAlign: "center",
              }}>
                <Typography style={{ textAlign: "center" }}>
                  Are you sure to delete this project ?
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
                <Button style={{ color: 'red' }} onClick={() => { handleDeleteConfirm(props.project._id); handleClose() }}>Yes</Button>
              </div>
            </CardContent>
          ) : (
            <LoadingOverlay
              active={spinnerActive}
              spinner
            // text='Loading your content...'
            >
              {/* <Link to={`/project/${props.project._id}`}> */}
              {/* <button>
                aa
              </button>
              </Link> */}
              <Tooltip title={"See Details of ".concat(props.project.project_name)}>
                <CardActionArea className={classes.root}
                  component={CustomRouterLink}
                  to={`/project/${props.project._id}`}
                >
                  <CardMedia
                        className={classes.media}
                        image={image}
                        title="Contemplative Reptile"
                      />
                  <CardContent className={classes.root} style={{paddingTop:5}} >
                    <div style={{ display: 'flex', flexDirection:'column',justifyContent: 'space-between' }}
                      className={classes.root}
                    >
                      <div style={{ width: 'fit-content' }} >
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          // gutterBottom
                          variant="body2"
                        >
                          Head Of Project - {headOfProject.staff_name}
                        </Typography>
                        <Typography variant="h6" className={classes.content}>
                          {props.project.project_name}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                      <Typography
                        className={classes.status}>
                        0% Events Completed
                </Typography>
                      <Typography
                        className={classes.status}>
                        0 Events Total
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
                <Popover
                  id={idStatus}
                  open={openPopOverStatus}
                  anchorEl={anchorElStatus}
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
                        {props.sc.map((color, index) => (
                          <MenuItem
                            key={color.id}
                            className={classes.status}
                            onClick={() => handleStatus(color.status, color.color)}>
                            {color.status}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popover>
                <Button
                  size="small"
                  aria-describedby={idStatus}
                  style={{ backgroundColor: color, fontSize: 10 }}
                  onClick={handleStatusButton}
                  className={classes.button}
                  variant="outlined"
                >
                  <Typography
                    style={{ textTransform: 'none' }} className={classes.status}>
                    {status}
                  </Typography>
                  {/* <ArrowDropDownIcon className={classes.icon}/> */}
                </Button>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', color: 'blue' }}>
                  <DateRangeIcon className={classes.icon} />
                  <Typography className={classes.status}>
                    {props.project.project_start_date.slice(4, 10)}
                  </Typography>
                  <RemoveIcon className={classes.icon} />
                  <Typography className={classes.status}>
                    {props.project.project_end_date.slice(4, 15)}
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
                {/* <button onClick={console.log(props.project._id)}> hapuss</button> */}
              </CardActions>
            </LoadingOverlay>
          )
        }

      </Card>
    </Grid >
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string
};

export default ProjectCard;
