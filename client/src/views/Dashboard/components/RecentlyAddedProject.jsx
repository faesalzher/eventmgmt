import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const sortedProjects = (props.projects.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };
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
      <CardContent style={{ padding: '10px 50px 25px', backgroundColor: "#e7e7e7" }}>
        <Slider
          {...settings}
          style={{ padding: '0px 25px', display: 'flex', justifyContent: 'center' }}
        >
          {
            sortedProjects.slice(0, 3).map((project, index) => {
              return (
                <Grid
                  container
                  key={project._id}
                  spacing={1}
                  style={{ backgroundColor: '#d6d6d6', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
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
        </Slider>
      </CardContent>
    </Card >
  );
};
