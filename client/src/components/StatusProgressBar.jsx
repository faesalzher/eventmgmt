import React from "react";
import { makeStyles } from '@material-ui/styles';
import {
  LinearProgress,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  status: {
    fontWeight: 450,
    fontSize: 11,
    letterSpacing: '0.0000em'
  },
}));

export function Percentage(props) {
  const classes = useStyles();
  const today = new Date();
  const start_date = new Date(props.start_date);
  const end_date = new Date(props.end_date);

  const isToday = (someDate) => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const activeDays = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
  const totalActiveDays = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24));

  return (
    <Typography className={classes.status}>
      {
        ((today < start_date) ? (
          0
        ) : (
            (today < end_date) ? (
              Math.round(((activeDays) / (totalActiveDays + 1)) * 100)
            ) : (
                (isToday(start_date) && isToday(end_date)) ? (
                  0
                ) : (
                    100
                  )
              )
          )
        )
      }
    </Typography>
  );
}

export function StatusProgressDays(props) {
  const classes = useStyles();
  const today = new Date();
  const start_date = new Date(props.start_date);
  const end_date = new Date(props.end_date);

  const isToday = (someDate) => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const preparingDays = Math.ceil((start_date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  const activeDays = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
  const completedDays = Math.ceil((today.getTime() - end_date.getTime()) / (1000 * 3600 * 24));
  const totalActiveDays = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24));

  return (
    <Typography className={classes.status}>
      {
       ((today < start_date) ? (
          (preparingDays) + " Days to go"
        ) : (
            (today < end_date) ? (
              "Days " + (activeDays) + " of " + (totalActiveDays + 1)
            ) : (
                (isToday(start_date) && isToday(end_date)) ? (
                  "Days " + (activeDays) + " of " + (totalActiveDays + 1)
                ) : (
                    (completedDays) + " Days ago"
                  )
              )
          )
          )
      }
    </Typography>
  );
}

export default function StatusProgressBar(props) {
  const classes = useStyles();
  const today = new Date();
  const start_date = new Date(props.start_date);
  const end_date = new Date(props.end_date);

  const isToday = (someDate) => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const activeDays = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
  const totalActiveDays = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24));

  return (
    <div>
      {
        <LinearProgress
          className={classes.progress}
          value={
           ((today < start_date) ? (
              0
            ) : (
                (today < end_date) ? (
                  ((activeDays) / (totalActiveDays + 1)) * 100
                ) : (
                    (isToday(start_date) && isToday(end_date)) ? (
                      0
                    ) : (
                        100
                      )
                  )
              )
              )
          }
          variant="determinate"
        />
      }
    </div>
  );
}
