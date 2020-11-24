import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Chip,
  CircularProgress
} from "@material-ui/core";

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { ConfirmationDialog } from 'components';
import { STAFF_QUERY,PERSON_IN_CHARGE_QUERY } from 'gql';


const useStyles = makeStyles(theme => ({
  small: {
    width: 30,
    height: 30,
    border: '2px solid #F4F6F8',
    marginLeft: '-8px',
    zIndex: 2
  },
}));

export default function StatusBox(props) {
  const classes = useStyles();
  const [staff, setStaff] = useState([]);
  const [personInCharge, setPersonInCharge] = useState([]);
  const deleteButton = props.deleteButton === true ? true : false;

  const [staffFetch, { data: staffData, loading: staffLoading }] = useLazyQuery(STAFF_QUERY,
    {
      variables: { staff_id: personInCharge.staff_id },
      onCompleted: () => { setStaff(staffData.staff) }
    });

  const { data: personInChargeData } = useQuery(PERSON_IN_CHARGE_QUERY,
    {
      variables: { _id: props.taskAssignedTo.person_in_charge_id },
      onCompleted: () => { setPersonInCharge(personInChargeData.person_in_charge); staffFetch(); }

    });

  const handleDelete = () => {
    props.handleDeleteTaskAssignedTo(props.taskAssignedTo._id, props.taskAssignedTo.person_in_charge_id)
  }

  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false)

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  }
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  }

  if (staffLoading) {
    return <div style={{ textAlign: 'center' }}>
      <CircularProgress />
    </div>
  }

  if (props.type === "avatar") {
    return <Avatar alt={staff.staff_name} src={staff.picture === " " ? "/static/images/avatar/1.jpg" : staff.picture} className={classes.small} />
  }

  if (props.type === "chip") {
    return <div>
      <ConfirmationDialog
        type="delete"
        name={staff.staff_name}
        content="Assigned"
        open={openConfirmationDialog}
        handleConfirm={handleDelete}
        close={handleCloseConfirmationDialog}
      />
      {deleteButton === true ?
        <Chip
          avatar={<Avatar src={staff.picture} />}
          label={staff.staff_name}
          size="small"
          color="primary"
          variant="outlined"
          onDelete={() => handleOpenConfirmationDialog()}
        />
        :
        <Chip
          avatar={<Avatar src={staff.picture} />}
          label={staff.staff_name}
          size="small"
          color="primary"
          variant="outlined"
        />
      }

    </div>
  }

}
