import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Chip,
  CircularProgress
} from "@material-ui/core";

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ConfirmationDialog } from 'components';
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

const COMITEE_QUERY = gql`
  query comitee($_id: String!){
    comitee(_id:$_id) {
      _id
      staff_id
    }
  }
`;

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
  const [comitee, setComitee] = useState([]);
  const deleteButton = props.deleteButton === true ? true : false;

  const [staffFetch, { data: staffData, loading: staffLoading }] = useLazyQuery(STAFFSBYID_QUERY,
    {
      variables: { _id: comitee.staff_id },
      onCompleted: () => { setStaff(staffData.staffById) }
    });

  const { data: comiteeData } = useQuery(COMITEE_QUERY,
    {
      variables: { _id: props.taskAssignedTo.comitee_id },
      onCompleted: () => { setComitee(comiteeData.comitee); staffFetch(); }

    });

  const handleDelete = () => {
    props.handleDeleteTaskAssignedTo(props.taskAssignedTo._id, props.taskAssignedTo.comitee_id)
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
