import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
// import {
//   // Grid,
//   // Paper,
//   Typography
// } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

// import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
// import Paper from '@material-ui/core/Paper';
import {
  ProjectCard,
} from '.';
// import MuiAlert from '@material-ui/lab/Alert';
// import jwtDecode from "jwt-decode";

import { PROJECT_QUERY } from 'gql';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4),
//   },
//   tabs_root: {
//     flexGrow: 1
//   },
//   loading: {
//     paddingTop: 100,
//     textAlign: 'center',
//   },
// }));


export default function MyProject(props) {
  const initialFormState =
  {
    _id: "",
    project_name: "",
    project_description: "",
    cancel: false,
    project_start_date: new Date().toString(),
    project_end_date: new Date().toString(),
    picture: " ",
    organization_id: props.organization_id,
  };

  const [project, setProject] = useState(initialFormState);

  const { loading, error, data, refetch } = useQuery(PROJECT_QUERY, {
    variables: { project_id: props.personInCharge.project_id },
    // onCompleted: () => { setProjects(data.projects) }
  });

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (data) => {
      setProject(data.project)
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);


  const refresh = () => {
    refetch();
  };

  if (error) return <p>Error :(</p>;
  // console.log(projects);
  // console.log(decodedToken.organization_id)

  return (
    <ProjectCard
      project={project}
    />
  );
}

