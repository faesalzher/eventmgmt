import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import AddEventModal from './AddEventModal';
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
      background: theme.palette.secondary.main,
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

export default function AddEventCard(props){
  const { sc, addEvent, className, ...rest } = props;
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
        elevation={1}
      // onMouseEnter={() => (setElevate(3))}
      // onMouseLeave={() => (setElevate(1))}
      // elevation={elevate}
      >
        <AddEventModal
          openListener={open}
          onCloseListener={handleClose}
          closeAfterTransition
          project={props.project}
          project_id={props.project_id}
          style={{ minWidth: 420 }}
          addEvent={addEvent}
        />
        <CardActionArea className={classes.root} onClick={()=>handleOpen()}>
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


