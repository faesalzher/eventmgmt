import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { AddProjectModal } from '.';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  // IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    "&:hover": {
      background: theme.palette.primary.main,
      color: 'white'
    },
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    margin: theme.spacing(1.5),
    verticalAlign: 'center'
  },
}));

const AddProjectCard = (props) => {
  const { sc, addProject, className, ...rest } = props;
  // const [elevate, setElevate] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();

  return (
    <Grid
      item
      lg={3}
      sm={6}
      xl={3}
      xs={12}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      // onMouseEnter={() => (setElevate(3))}
      // onMouseLeave={() => (setElevate(1))}
      // elevation={elevate}
      >
        <AddProjectModal
          organization_id={props.organization_id}
          openListener={open}
          onCloseListener={handleClose}
          closeAfterTransition
          style={{ minWidth: 420 }}
          addProject={addProject}
          sc={props.sc}
        />
        <CardActionArea className={classes.root} onClick={handleOpen}>
          <CardContent className={classes.root}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <AddIcon style={{ fontSize: 96, alignItems: "center" }}></AddIcon>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid >
  );
};

AddProjectCard.propTypes = {
  className: PropTypes.string

};

export default AddProjectCard;
