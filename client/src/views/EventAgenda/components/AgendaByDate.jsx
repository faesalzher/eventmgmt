import React, { useEffect, useState } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import {
  Tooltip,
  IconButton,
  Typography,
  TableCell,
  TableRow
} from '@material-ui/core';
// use material theme
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import {
  EditAgendaModal
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

export default function Agenda(props) {

  const [agenda, setAgenda] = useState(props.agenda)
  useEffect(() => {
    setAgenda(props.agenda)
  }, [props.agenda])

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <StyledTableRow hover={true}>
      <StyledTableCell style={{ width: 115, color: 'blue' }} align="center" component="th" scope="row">
        <div><AccessTimeIcon style={{ fontSize: 14, verticalAlign: 'middle' }} />
          {agenda.start_time} -{agenda.end_time}</div>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle2">
          {agenda.agenda_name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">{agenda.details}</StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        <Tooltip arrow title="Edit" aria-label="confirm">
          <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
            <EditIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <EditAgendaModal
          open={openEditModal}
          handleDelete={props.handleDelete}
          agenda={agenda}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}