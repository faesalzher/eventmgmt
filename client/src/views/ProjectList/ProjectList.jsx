import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  // Fade, 
  Typography
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
// import AppBar from '@material-ui/core/AppBar';
import {
  ProjectCard,
  AddProjectCard,
} from './components';
import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const PROJECTS_QUERY = gql`
{
  projects{
    _id
    project_name
    project_description
    cancel
    project_start_date
    project_end_date
    picture
    organization_id
  }
}
`;

const DELETE_PROJECT = gql`
mutation deleteProject ($_id: String!) {
  deleteProject(_id:$_id){
    _id
  }
}
`;


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  loading: {
    paddingTop: 100,
    textAlign: 'center',
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProjectList = () => {
  const classes = useStyles();

   const [open, setOpen] = React.useState(false);

  const handleSucces = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [projects, setProjects] = useState([]);

  const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY, {
    // onCompleted: () => { setProjects(data.projects) }
  });
  useEffect(() => {
    refresh();
  });
  useEffect(() => {
    const onCompleted = (data) => { setProjects(data.projects) };
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

  const addProject = useCallback(
    (e) => {
      setProjects([...projects, e]);
      setTimeout(() => {
        handleSucces();
      }, 100);
    }, [projects]
  );
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleDelete = e => {
    deleteProject({ variables: { _id: e, } });
    setTimeout(() => {
      handleSucces();
    }, 700);
  }

  if (error) return <p>Error :(</p>;
  // console.log(projects);


  return (
    <div>
      <Paper style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
        <Typography color='textSecondary' variant="button"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>Project List</Typography>
      </Paper>
      <div className={classes.root}>
        {
          (loading) ? <div className={classes.loading}><CircularProgress /></div> :
            <div>
              <Grid
                container
                spacing={2}
              >
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">
                    Succes!
               </Alert>
                </Snackbar>
                <AddProjectCard addProject={addProject} />
                {
                  projects.slice().reverse().map((project, index) => {
                    if (projects.length === 0) {
                      return (
                        <div className={classes.loading}><CircularProgress /></div>
                      )
                    } else {
                      return (
                        <ProjectCard
                          key={project._id}
                          project={project}
                          handleDelete={handleDelete}
                        />
                      )
                    }
                  })
                }
              </Grid>
            </div>
        }
      </div>
    </div>
  );
};

export default ProjectList;
