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
      backgroundColor: theme.palette.background.default,
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
      <StyledTableCell align="center" component="th" scope="row">
        <Typography variant="subtitle2">
          {props.index + 1}
        </Typography>
      </StyledTableCell>
      <StyledTableCell style={{ width: 115 }} align="center">
        <div style={{ display: 'flex' }}>
          <AccessTimeIcon style={{ fontSize: 14, verticalAlign: 'middle', margin: 3 }} />
          <Typography variant="subtitle2" color="textSecondary">
            {agenda.start_time} -{agenda.end_time}
          </Typography>
        </div>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle2" color="textPrimary">
          {agenda.agenda_name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="body1" color="textPrimary">
          {agenda.details}
        </Typography>
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        <Tooltip arrow title="Edit" aria-label="confirm">
          <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
            <EditIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <EditAgendaModal
          open={openEditModal}
          agenda={agenda}
          handleDelete={props.handleDelete}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}