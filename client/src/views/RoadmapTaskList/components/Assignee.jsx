import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemSecondaryAction, Avatar, ListItemAvatar, CircularProgress } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import { ConfirmationDialog } from 'components';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import uuid from 'uuid/v1';

const STAFFSBYID_QUERY = gql`
  query staffById($_id: String!){
    staffById(_id:$_id) {
      _id
      staff_name
      phone_number
      email
      picture
    }
  }
`;

const POSITION_QUERY = gql`
  query position($_id: String!){
    position(_id:$_id) {
      _id
      position_name
      core
    }
  }
`;

const ADD_TASK_ASSIGNED_TO = gql`
  mutation addTaskAssignedTo(
    $_id: String!,
    $task_id: String!,
    $comitee_id: String!,
    ){
    addTask_assigned_to(
      _id: $_id,
      task_id: $task_id,
      comitee_id: $comitee_id,
    ){
      _id
      task_id
      comitee_id
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
export default function ComiteeDialog(props) {
  const classes = useStyles();
  const initialFormState =
  {
    _id: uuid(),
    task_id: props.task._id,
    comitee_id: props.comitee._id,
  };

  const [staff, setStaff] = useState([]);
  const [position, setPosition] = useState([]);
  const [addTaskAssignedToForm] = React.useState(initialFormState)
  const [selected, setSelected] = useState(false);
  const [addTaskAssignedTo] = useMutation(ADD_TASK_ASSIGNED_TO);


  let assignedComiteeId = null;

  props.tasksAssignedTo.map((taskAssignedTo) => {
    if (taskAssignedTo.comitee_id === props.comitee._id) {
      assignedComiteeId = taskAssignedTo._id
    }
    return null;
  }
  );

  const { data: staffData, loading: staffLoading } = useQuery(STAFFSBYID_QUERY,
    {
      variables: { _id: props.comitee.staff_id },
      onCompleted: () => { setStaff(staffData.staffById) }
    });



  const { data: positionData, loading: positionLoading } = useQuery(POSITION_QUERY, {
    variables: { _id: props.comitee.position_id },
    onCompleted: () => {
      if (positionData !== undefined && positionData.position !== null) {
        setPosition(
          positionData.position
        )
      } else {
        setPosition({ position_name: "" })
      }
    }
  }
  );

  const handleListClickAdd = () => {
    setSelected(true);
    props.handleAddTaskAssignedTo(addTaskAssignedToForm)
    addTaskAssignedTo({
      variables:
      {
        _id: addTaskAssignedToForm._id,
        task_id: addTaskAssignedToForm.task_id,
        comitee_id: addTaskAssignedToForm.comitee_id,
      }
    });
  }

  // const handleDelete = (e) => {
  //   // setSelected(false);
  //   props.handleDeleteTaskAssignedTo(e);
  // }


  const handleDelete = () => {
    setSelected(false)
    props.handleDeleteTaskAssignedTo(assignedComiteeId)
  }
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false)

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  }
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  }


  if (staffLoading || positionLoading) {
    return <div style={{ textAlign: 'center' }}>
      <CircularProgress />
    </div>
  }

  return (
    <div>
      <ConfirmationDialog
        type="delete"
        name={staff.staff_name}
        content="Assigned"
        open={openConfirmationDialog}
        handleConfirm={handleDelete}
        close={handleCloseConfirmationDialog}
      />
      <ListItem button className={classes.list}
        onClick={
          assignedComiteeId || selected ? () => handleOpenConfirmationDialog() : () => handleListClickAdd()
        }>
        <ListItemAvatar>
          <Avatar src={staff.picture} />
        </ListItemAvatar>
        <ListItemText
          primary={staff.staff_name}
          secondary={position.position_name}
        />
        {
          assignedComiteeId || selected ?
            <ListItemSecondaryAction>
              <CheckIcon />
            </ListItemSecondaryAction>
            : <div></div>
        }
      </ListItem>
    </div>
  );
}