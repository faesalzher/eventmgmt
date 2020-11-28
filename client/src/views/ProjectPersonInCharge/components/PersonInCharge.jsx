import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
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
  PersonInChargeEditForm
} from '.';

import { STAFF_QUERY } from 'gql';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: "3px 3px 3px 3px"
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "theme.palette.background.default",
    },
  },
}))(TableRow);

export default function PersonInCharge(props) {
  // const classes = useStyles();
  // console.log(props.personInCharges.imageUrl)


  const [openEditModal, setOpenEditModal] = useState(false);
  const [staff, setStaff] = useState([]);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setPersonInChargess([...personInChargess, e])
  // }

  const { data } = useQuery(STAFF_QUERY,
    {
      variables: { staff_id: props.personInCharge.staff_id },
      onCompleted: () => { setStaff(data.staff) }
    });

  return (
    <StyledTableRow style={
      props.project_personInCharge._id === props.personInCharge._id ? { backgroundColor: "#ececec" } : {}}>
      <StyledTableCell style={{ display: 'flex', justifyContent: 'center', padding: '2px 10px' }}>
        <Avatar style={{ width: 30, height: 30 }} src={staff.picture} />
      </StyledTableCell>
      <StyledTableCell scope="row">
        {staff.staff_name}
      </StyledTableCell>
      <StyledTableCell scope="row">
        {staff.phone_number}
      </StyledTableCell>
      <StyledTableCell scope="row">
        {staff.email}
      </StyledTableCell>
      <StyledTableCell align="left">
        {props.positions.map((position, index) => {
          if (position._id === props.personInCharge.position_id) {
            return <div key={index}>{position.position_name}</div>
          }
          return null;
        })
        }
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {
          (props.decodedToken.user_type === "organization")
            ?
            <Tooltip arrow title="Edit" aria-label="confirm">
              <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
                <EditIcon style={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            :
            (props.project_personInCharge.order === "1"
              || props.project_personInCharge.order === "2"
              || props.project_personInCharge.order === "3"
            ) ?
              ((parseInt(props.project_personInCharge.order) >= parseInt(props.personInCharge.order)))
                ?
                <></>
                :
                <>
                  <Tooltip arrow title="Edit" aria-label="confirm">
                    <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
                      <EditIcon style={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>

                </>
              :
              (parseInt(props.project_personInCharge.order) >= parseInt(props.personInCharge.order))
                || (props.project_personInCharge.committee_id !== props.personInCharge.committee_id)
                ?
                <></>
                :
                <Tooltip arrow title="Edit" aria-label="confirm">
                  <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
                    <EditIcon style={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
        }
        <PersonInChargeEditForm
          personInCharge={props.personInCharge}
          project_id={props.project_id}
          personInCharges={props.personInCharges}
          committees={props.committees}
          positions={props.positions}
          staffs={props.staffs}
          departements={props.departements}
          project_personInCharge={props.project_personInCharge}
          decodedToken={props.decodedToken}
          open={openEditModal}
          handleDeletePersonInCharge={props.handleDeletePersonInCharge}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}