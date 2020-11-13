import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, List, ListItem, Divider } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Assignees } from '.';


const DIVISIONSBYPROJECT_QUERY = gql`
  query divisionsByProject($project_id: String!){
    divisionsByProject(project_id:$project_id) {
      _id
      division_name
      project_id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  list: {
    paddingTop: 2,
    paddingBottom: 2
  }
}));
export default function AssigneesDivision(props) {
  const classes = useStyles();
  const [divisions, setDivisions] = useState([]);

  const { data: divisionsData, refetch: divisionsRefetch } = useQuery(DIVISIONSBYPROJECT_QUERY, {
    variables: { project_id: props.project_id },
    onCompleted: () => {
      setDivisions(
        divisionsData.divisionsByProject
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    divisionsRefetch();
  };

  // if (divisionLoading) {
  //   return <div style={{ textAlign: 'center' }}>
  //     <CircularProgress />
  //   </div>
  // }

  return (
    <div>
      <Dialog

        open={props.openComitees}
        onClose={props.handleCloseComitees}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-title">
          <Typography className={classes.title}>Choose assigned to</Typography>
        </DialogTitle>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          thumbMinSize={30}
          autoHeight
          autoHeightMax={500}
        >
          <List component="nav" className={classes.root} aria-label="contacts">

            {
              divisions.map((division, index) => {
                return <div key={index}>
                  <ListItem className={classes.list}>
                    <Typography variant="h6" color="primary">
                      {division.division_name}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <Assignees
                    project_id={props.project_id}
                    handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
                    handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
                    tasksAssignedTo={props.tasksAssignedTo}
                    task={props.task}
                    division={division}
                  />
                </div>
              })
            }
          </List>
        </Scrollbars>
      </Dialog>
    </div>
  );
}