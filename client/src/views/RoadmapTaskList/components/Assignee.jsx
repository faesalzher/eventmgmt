import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemSecondaryAction, Avatar, ListItemAvatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';

import { ConfirmationDialog, AdminChip } from 'components';

import { useQuery, useMutation } from '@apollo/react-hooks';
import uuid from 'uuid/v1';

import { STAFF_QUERY, ADD_TASK_ASSIGNED_TO, POSITION_QUERY } from 'gql';


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

export default function Assignee(props) {
  const classes = useStyles();

  const initialFormState =
  {
    _id: uuid(),
    task_id: props.task._id,
    person_in_charge_id: props.personInCharge._id,
    event_id: props.event_id,
    project_id: props.project_id,
    roadmap_id: props.roadmap_id,
    staff_id: props.personInCharge.staff_id,
    created_at: new Date().toString(),
  };

  const initialStaffState = {
    staff_name: "",
    picture: "",
  }
  const [staff, setStaff] = useState(initialStaffState);
  const [position, setPosition] = useState({ position_name: "" });
  const [addTaskAssignedToForm] = React.useState(initialFormState)
  const [selected, setSelected] = useState(false);
  const [addTaskAssignedTo] = useMutation(ADD_TASK_ASSIGNED_TO);


  let assignedPersonInChargeId = null;

  props.tasksAssignedTo.map((taskAssignedTo) => {
    if (taskAssignedTo.person_in_charge_id === props.personInCharge._id) {
      assignedPersonInChargeId = taskAssignedTo._id
    }
    return null;
  }
  );

  const { data: staffData, refetch: staffRefetch } = useQuery(STAFF_QUERY,
    {
      variables: { staff_id: props.personInCharge.staff_id },
      onCompleted: () => {
        if (staffData && staffData.staff !== null) {
          setStaff(staffData.staff);
        } else {
          setStaff({ staff_name: "[ Staff Data Not Found ]", picture: "" })
        }
      }
    });



  const { data: positionData, refetch: positionRefetch } = useQuery(POSITION_QUERY, {
    variables: { _id: props.personInCharge.position_id },
    onCompleted: () => {
      if (positionData && positionData.position !== null) {
        setPosition(positionData.position);
      } else {
        setPosition({ position_name: "[ Position Name Not Found ]" })
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
        person_in_charge_id: addTaskAssignedToForm.person_in_charge_id,
        event_id: addTaskAssignedToForm.event_id,
        project_id: addTaskAssignedToForm.project_id,
        roadmap_id: addTaskAssignedToForm.roadmap_id,
        staff_id: addTaskAssignedToForm.staff_id,
        created_at: addTaskAssignedToForm.created_at,
      }
    });
  }

  // const handleDelete = (e) => {
  //   // setSelected(false);
  //   props.handleDeleteTaskAssignedTo(e);
  // }

  const handleDelete = () => {
    setSelected(false)
    props.handleDeleteTaskAssignedTo(assignedPersonInChargeId, props.personInCharge._id)
  }
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false)

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  }
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  }


  // if (staffLoading || positionLoading || props.personInChargesLoading) {
  //   return <div style={{ textAlign: 'center' }}>
  //     <CircularProgress />
  //   </div>
  // }
  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    staffRefetch();
    positionRefetch();
  };

  if (!positionData || !staffData) return <></>

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
          assignedPersonInChargeId || selected ? () => handleOpenConfirmationDialog() : () => handleListClickAdd()
        }>
        <ListItemAvatar>
          <Avatar src={staff.picture} />
        </ListItemAvatar>
        <ListItemText
          primary={staff.staff_name}
          secondary={position.position_name}
        />
        <ListItemSecondaryAction style={{display:'flex'}}>
          {staff.is_admin ? <AdminChip /> : ''}
          {
            assignedPersonInChargeId || selected ?
              <CheckIcon />
              : <div></div>
          }
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}