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
  PositionEditForm
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
  // console.log(props.position.imageUrl)

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setVolunteers([...positions, e])
  // }
  return (
    <StyledTableRow>
      <StyledTableCell style={{ paddingLeft: 16 }} scope="row">
        {props.position.position_name}
      </StyledTableCell>
      <StyledTableCell style={{ width: 150 }} scope="row">
        {props.position.core ?
          props.coreCommittee.committee_name : "Non " + props.coreCommittee.committee_name
        }
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {props.position.position_name === 'Core Position' ?
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
                  <PositionEditForm
                    position={props.position}
                    event_id={props.event_id}
                    coreCommittee={props.coreCommittee}
                    open={openEditModal}
                    index={props.index}
                    handleDeletePosition={props.handleDeletePosition}
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