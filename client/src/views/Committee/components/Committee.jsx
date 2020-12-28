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
  CommitteeEditForm
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

export default function Volunteer(props) {
  // const classes = useStyles();
  // console.log(props.committee.imageUrl)

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setVolunteers([...committees, e])
  // }
  return (
    <StyledTableRow>
      <StyledTableCell style={{ paddingLeft: 16 }} scope="row">
        {props.committee.committee_name}
      </StyledTableCell>
      <StyledTableCell style={{ width: 100 }}>{props.committee.core ? "Core" : "Non Core"}</StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {props.committee.committee_name === 'Core Committee' ?
          <div></div>
          :
          <div>
            {
              props.decodedToken.user_type === "organization" ?
                <>
                  <Tooltip arrow title="Edit" aria-label="confirm">
                    <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
                      <EditIcon style={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                  <CommitteeEditForm
                    committees={props.committees}
                    committee={props.committee}
                    event_id={props.event_id}
                    open={openEditModal}
                    index={props.index}
                    handleDeleteCommittee={props.handleDeleteCommittee}
                    handleSaveEditButton={props.handleSaveEditButton}
                    close={handleCloseEditModal}
                  />
                </>
                :
                <></>
            }
          </div>
        }
      </StyledTableCell>
    </StyledTableRow >
  );
}