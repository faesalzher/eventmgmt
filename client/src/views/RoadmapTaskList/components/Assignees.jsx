import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, List, ListItem, Divider, Paper } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import { useQuery } from '@apollo/react-hooks';

// import { Assignees } from '.';
import { PERSON_IN_CHARGES_BY_COMMITTEE_QUERY, COMMITTEE_QUERY } from 'gql';
import { Assignee } from '.';


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
export default function Assignees(props) {
  const classes = useStyles();
  const [personInCharges, setPersonInCharges] = useState([]);

  const { data: personInChargesData, loading: personInChargesLoading, refetch: personInChargesRefetch } = useQuery(PERSON_IN_CHARGES_BY_COMMITTEE_QUERY, {
    variables: { committee_id: props.roadmap.committee_id },
    onCompleted: () => {
      if (personInChargesData)
        setPersonInCharges(
          personInChargesData.person_in_charges
        )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    personInChargesRefetch();
  };

  const sortedPersonInCharges = personInCharges.sort((a, b) => parseInt(a.position_id) - parseInt(b.position_id));
  if (!personInChargesData) {
    return (<></>)
  }

  return (
    <div>
      <Dialog

        open={props.openPersonInCharges}
        onClose={props.handleClosePersonInCharges}
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
            <ListItem className={classes.list}>
              <Typography variant="h6" color="primary">
                <CommitteeName committee_id={props.roadmap.committee_id} />
              </Typography>
            </ListItem>
            <Divider />
            {
              personInCharges.length === 0 ?
                <Paper style={{ height: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
                    there is no comitees yet
                 </Typography>
                </Paper>
                :
                sortedPersonInCharges.map((personInCharge, index) => {
                  return (
                    <List component="nav" className={classes.root} key={index}>
                      <Assignee
                      personInChargesLoading={personInChargesLoading}
                        project_id={props.project_id}
                        event_id={props.event_id}
                        roadmap_id={props.roadmap_id}
                        task={props.task}
                        handleAddTaskAssignedTo={props.handleAddTaskAssignedTo}
                        handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
                        tasksAssignedTo={props.tasksAssignedTo}
                        key={index}
                        personInCharge={personInCharge}
                      />
                    </List>
                  )
                })
            }
          </List>
        </Scrollbars>
      </Dialog>
    </div>
  );
}

const CommitteeName = (props) => {
  const { data: committeeData } = useQuery(COMMITTEE_QUERY, {
    variables: { _id: props.committee_id },
  }
  );

  if (!committeeData) {
    return (<></>)
  }

  return (
    <div>
      {committeeData.committee.committee_name}
    </div>
  );
}
