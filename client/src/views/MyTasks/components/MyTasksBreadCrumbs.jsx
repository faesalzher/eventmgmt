import React, { forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavLink as RouterLink } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { EVENT_QUERY,ROADMAP_QUERY,PROJECT_QUERY } from 'gql';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

export default function MyTasksBreadCrumbs(props) {
  const classes = useStyles();

  const [roadmap, setRoadmap] = React.useState({ event_id: "" });
  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: props.roadmap_id },
      onCompleted: () => {
        if (roadmapData !== undefined && roadmapData.roadmap !== null) {
          setRoadmap(roadmapData.roadmap)
        } else {
          setRoadmap({ event_id: "" })
        }
      }
    });

  const [project, setProject] = React.useState({ project_name: "" });
  const { data: projectData, refetch: projectRefetch } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: props.project_id },
      onCompleted: () => {
        if (projectData !== undefined && projectData.project !== null) {
          setProject(projectData.project)
        } else {
          setProject({ event_id: "" })
        }
      }
    });

  const [event, setEvent] = React.useState({ event_name: "" });
  const { data: eventData, refetch: eventRefetch } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: props.event_id },
      onCompleted: () => {
        if (eventData !== undefined && eventData.event !== null) {
          setEvent(eventData.event)
        } else {
          setEvent({ event_id: "" })
        }
      }
    });

    useEffect(() => {
      refresh();
    });
    const refresh = () => {
      roadmapRefetch();
      projectRefetch();
      eventRefetch();
    };

  const breadcrumb_item = [
    { name: project.project_name, link: `/project/${project._id}` },
    { name: event.event_name, link: `/project/${project._id}/${event._id}` },
    { name: roadmap.roadmap_name, link: `/project/${project._id}/${event._id}/${roadmap._id}` }
  ]

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumb_item.map((item, index) => {
          return (
            <Link
              color="inherit"
              component={CustomRouterLink}
              to={item.link === undefined ? "" : item.link}
              key={index}
            >
              {item.name === undefined ? "" : item.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
