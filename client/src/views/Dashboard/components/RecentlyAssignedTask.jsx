import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

import { TasksAssignedToMe } from 'views/MyTasks/components';
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
}));

export default function RecentlyAssignedTask(props) {
  const { className, decodedToken, ...rest } = props;

  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Recently Assigned Task To Me "
        action={
          <Button
            size="small"
            color="secondary"
            component={CustomRouterLink}
            to={`/mytasks`}
            variant="contained"
          >
            View All
          </Button>
        }
      />
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <Grid
          container
          spacing={1}
        // style={{padding:'0px 27px',backgroundColor:'#d6d6d6'}}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <TasksAssignedToMe decodedToken={props.decodedToken} slice={3} />
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
};

