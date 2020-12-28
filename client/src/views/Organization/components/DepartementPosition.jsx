import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
// import Button from '@material-ui/core/Button';
import {
  // Popover,
  // Typography,
  // Avatar,
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
  DepartementPositionEditForm
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

export default function DepartementPosition(props) {
  // const classes = useStyles();
  // console.log(props.departement_position.imageUrl)

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setVolunteers([...departement_positions, e])
  // }
  return (
    <StyledTableRow>
      <StyledTableCell style={{ paddingLeft: 16 }} scope="row">
        {props.departementPosition.departement_position_name}
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {props.decodedToken.user_type === "organization" ?
          <Tooltip arrow title="Edit" aria-label="confirm">
            <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
              <EditIcon style={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          : <div></div>
        }
        <DepartementPositionEditForm
          departementPosition={props.departementPosition}
          departementPositions={props.departementPositions}
          event_id={props.event_id}
          open={openEditModal}
          index={props.index}
          handleDeleteDepartementPosition={props.handleDeleteDepartementPosition}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}