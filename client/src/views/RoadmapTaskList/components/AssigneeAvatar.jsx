import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Chip,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";

import { useQuery } from '@apollo/react-hooks';
import { ConfirmationDialog } from 'components';
import { STAFF_QUERY } from 'gql';


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

  const initialStaffState = {
    staff_name: "",
    picture: "",
  }
  const [staff, setStaff] = useState(initialStaffState);
  const deleteButton = props.deleteButton === true ? true : false;
  // const [taskAssignedTo, setTaskAssignedTo] useState([]);

  // React.useState(() => {
  //   setTaskAssignedTo(props.)
  // })


  const { data: staffData, loading: staffLoading } = useQuery(STAFF_QUERY,
    {
      variables: { staff_id: props.taskAssignedTo.staff_id },
      onCompleted: () => {
        if (staffData && staffData.staff !== null) {
          setStaff(staffData.staff);
        } else {
          setStaff({ staff_name: "[ Staff Data Not Found ]", picture: "" })
        }
      }
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
    return <Tooltip title={staff.staff_name} arrow ><Avatar alt={staff.staff_name} src={staff.picture === " " ? "/static/images/avatar/1.jpg" : staff.picture} className={classes.small} /></Tooltip>
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
