import React,{ forwardRef }  from 'react';
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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { NavLink as RouterLink } from 'react-router-dom';

import ProjectCard from 'views/ProjectList/components/ProjectCard';
const useStyles = makeStyles(theme => ({
  root: {
    // height: '100%'
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
export default function RecentlyAddedProject(props) {
  const { className, projects, ...rest } = props;

  const classes = useStyles();
  // const theme = useTheme();
  const handleDelete = () => {

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Recently Added Project "
        action={
          <Button
            size="small"
            color="secondary"
            component={CustomRouterLink}
            to={`/project`}
            variant="contained"
          >
            View All
          </Button>
        }
      />
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <Carousel showThumbs={false} showStatus={false} autoPlay swipeable infiniteLoop>
          {
            props.projects.slice().reverse().map((project, index) => {
              return (
                <Grid
                  container
                  key={project._id}
                  spacing={1}
                  style={{padding:'10px 40px',backgroundColor:'#d6d6d6'}}
                >
                  <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                  >
                  <ProjectCard
                    project={project}
                    handleDelete={handleDelete}
                  />
                </Grid>
                </Grid>
              )
            })
          }
        </Carousel>
      </CardContent>
    </Card >
  );
};

