import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationContainer, NotificationManager } from "react-light-notifications";
// import "react-light-notifications/lib/main.css";
// import Paper from '@material-ui/core/Paper';
import {
  ProjectCard,
  AddProjectCard,
  MyProject,
} from './components';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwtDecode from "jwt-decode";
import { PROJECTS_QUERY, PERSON_IN_CHARGES_BY_STAFF_QUERY } from 'gql';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  tabs_root: {
    flexGrow: 1
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
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
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
    variables: { organization_id: decodedToken.organization_id },
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

  const [personInCharges, setPersonInCharges] = useState([]);
  const { data: personInChargesData, loading: personInChargesLoading, error: personInChargesError, refetch: personInChargesRefetch } = useQuery(PERSON_IN_CHARGES_BY_STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id }
  }
  );

  useEffect(() => {
    const onCompleted = (personInChargesData) => {
      setPersonInCharges(
        personInChargesData.person_in_charges
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargesLoading && !personInChargesError) {
        onCompleted(personInChargesData);
      } else if (onError && !personInChargesLoading && personInChargesError) {
        onError(personInChargesError);
      }
    }
  }, [personInChargesLoading, personInChargesData, personInChargesError]);

  useEffect(() => {
    refresh();
    personInChargesRefetch();
  });

  const addProject = useCallback(
    (e) => {
      setProjects([...projects, e]);
      setTimeout(() => {
        handleSucces();
      }, 100);
    }, [projects]
  );

  const sortedProjects = (projects.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  if (error) return <p>Error :(</p>;
  if (loading) return (
    <div className={classes.loading}><CircularProgress /></div>
  )
  console.log(decodedToken.organization_id)

  return (
    <div className={classes.tabs_root}>
      <Paper color="default" position="static" style={{ display: "flex", height: 48, flexDirection: "row", justifyContent: "center" }}>
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
                {decodedToken.user_type === "organization" ?
                  <>
                    <AddProjectCard addProject={addProject} organization_id={decodedToken.organization_id} />
                    {
                      sortedProjects.map((project, index) => {
                        return (
                          <Grid
                            item
                            key={index}
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                          >
                            <ProjectCard
                              project={project}
                            />
                          </Grid>
                        )
                      })
                    }
                  </>
                  :
                  <>
                    {
                      personInCharges.slice().reverse().map((personInCharge, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                          >
                            <MyProject
                              personInCharge={personInCharge}
                            />
                          </Grid>
                          // <div>{console.log(personInCharge.project_id)}</div>
                        )
                      })
                    }
                  </>
                }

              </Grid>
            </div>
        }
      </div>
    </div>
  );
};

export default ProjectList;
