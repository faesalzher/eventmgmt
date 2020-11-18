import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
const PROJECTS_QUERY = gql`
  query projects($organization_id:String!){
    projects(organization_id: $organization_id){
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

const COMITEESBYSTAFF_QUERY = gql`
  query comiteesByStaff($staff_id: String!){
    comiteesByStaff(staff_id:$staff_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;

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

  const [comitees, setComitees] = useState([]);
  const { data: comiteesData, loading: comiteesLoading, error: comiteesError, refetch: comiteesRefetch } = useQuery(COMITEESBYSTAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id }
  }
  );

  useEffect(() => {
    const onCompleted = (comiteesData) => {
      setComitees(
        comiteesData.comiteesByStaff
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !comiteesLoading && !comiteesError) {
        onCompleted(comiteesData);
      } else if (onError && !comiteesLoading && comiteesError) {
        onError(comiteesError);
      }
    }
  }, [comiteesLoading, comiteesData, comiteesError]);

  useEffect(() => {
    refresh();
    comiteesRefetch();
  });

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
  if (loading) return (
    <div className={classes.loading}><CircularProgress /></div>
  )
  console.log(comitees);
  // console.log(decodedToken.organization_id)

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
                      projects.slice().reverse().map((project, index) => {
                        return (
                          <Grid
                            item
                            key={project._id}
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                          >
                            <ProjectCard
                              project={project}
                              handleDelete={handleDelete}
                            />
                          </Grid>
                        )
                      })
                    }
                  </>
                  :
                  <>
                    {
                      comitees.slice().reverse().map((comitee, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                          >
                            <MyProject
                              comitee={comitee}
                              handleDelete={handleDelete}
                            />
                          </Grid>
                          // <div>{console.log(comitee.project_id)}</div>
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
