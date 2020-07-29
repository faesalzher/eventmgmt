import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
// import Button from '@material-ui/core/Button';
import {
  // Popover,
  // Typography,
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from '@material-ui/core';
// import TimeKeeper from 'react-timekeeper';
// use material theme
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  ExternalEditForm
} from '.';
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: "6px 3px 6px 3px"
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "theme.palette.background.default",
    },
  },
}))(TableRow);

export default function External(props) {
  // const classes = useStyles();
  // console.log(props.external.picture)

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setExternals([...guests, e])
  // }
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row" style={{ display: 'flex', justifyContent: 'center', width: 70 }}>
        <Avatar src={props.external.picture} />
      </StyledTableCell>
      <StyledTableCell scope="row">
        {props.external.external_name}
      </StyledTableCell>
      <StyledTableCell scope="row">
        {props.external.email}
      </StyledTableCell>
      <StyledTableCell align="left">
        {props.external.phone_number}
      </StyledTableCell>
      <StyledTableCell align="left">
        {props.external.details}
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        <Tooltip arrow title="Edit" aria-label="confirm">
          <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
            <EditIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <ExternalEditForm
          external={props.external}
          event_id={props.event_id}
          type={props.type}
          open={openEditModal}
          handleDelete={props.handleDelete}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}