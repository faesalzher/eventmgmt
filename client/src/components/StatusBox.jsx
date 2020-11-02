import React from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Box
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  cancelled: {
    backgroundColor: theme.palette.error.main
  },
  planned: {
    backgroundColor: theme.palette.warning.main
  },
  completed: {
    backgroundColor: theme.palette.success.main,
    color: 'white'
  },
  active: {
    backgroundColor: theme.palette.info.main
  },
  boxStatus: {
    textAlign: 'center',
    width: 120,
    height: 17,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  fontStatus: {
    fontSize: 11,
    color: 'white'
  },
  primaryColor: {
    color: theme.palette.primary.main
  }
}));

export default function StatusBox(props) {
  const classes = useStyles();
  const today = new Date();
  const start_date = new Date(props.start_date);
  const end_date = new Date(props.end_date);

  // const plannedDays = Math.ceil((start_date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  // const activeDays = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
  // const completedDays = Math.ceil((today.getTime() - end_date.getTime()) / (1000 * 3600 * 24));
  // const totalActiveDays = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24));

  const isToday = (someDate) => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const plannedDays = today < start_date;
  const activeDays = (today < end_date) || isToday(start_date) || isToday(end_date)



  return (
    (props.cancel === true) ? (
      <Box borderRadius={4} style={props.style} className={[classes.cancelled, classes.boxStatus].join(" ")}>
        <Typography variant="subtitle2" className={classes.fontStatus}>Cancelled</Typography>
      </Box>
    ) : (
        (plannedDays) ? (
          <Box borderRadius={4} style={props.style}  className={[classes.planned, classes.boxStatus].join(" ")}>
            <Typography variant="subtitle2" className={[classes.fontStatus, classes.primaryColor].join(" ")}>Planned</Typography>
          </Box>
        ) : (
            (activeDays) ? (
              <Box borderRadius={4}  style={props.style} className={[classes.active, classes.boxStatus].join(" ")}>
                <Typography variant="subtitle2" className={classes.fontStatus}>Active</Typography>
              </Box>
            ) : (
                <Box borderRadius={4}  style={props.style}  className={[classes.completed, classes.boxStatus].join(" ")}>
                  <Typography variant="subtitle2" className={classes.fontStatus}>Completed</Typography>
                </Box>
              )
          )
      )
  );
}
