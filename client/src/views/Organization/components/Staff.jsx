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
  StaffEditForm
} from '.';

import { AdminChip } from 'components';
import { useQuery } from '@apollo/react-hooks';
import {
  DEPARTEMENT_QUERY,
  DEPARTEMENT_POSITION_QUERY,
} from 'gql';
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

function DepartementName(props) {
  const { data: departementData, refetch: departementRefetch } = useQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: props.departement_id },
  }
  );
  React.useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementRefetch();
  };

  if (!departementData || departementData.departement === null) return <></>
  return (
    <>      {departementData.departement.departement_name}    </>
  );
}

function DepartementPositionName(props) {
  const { data: departementPositionData, refetch: departementPositionRefetch } = useQuery(DEPARTEMENT_POSITION_QUERY, {
    variables: { _id: props.departement_position_id },
  }
  );
  React.useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementPositionRefetch();
  };


  if (!departementPositionData || departementPositionData.departement_position === null) return <></>

  return (
    <>      {departementPositionData.departement_position.departement_position_name}    </>
  );
}
export default function Staffs(props) {
  // const classes = useStyles();
  // console.log(props.staffs.imageUrl)

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setStaffss([...staffss, e])
  // }
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row" style={{ display: 'flex', justifyContent: 'center', width: 70 }}>
        <Avatar src={props.staff.picture} />
      </StyledTableCell>
      <StyledTableCell scope="row">
        {props.staff.staff_name}
      </StyledTableCell>
      <StyledTableCell align="left">
        {props.staff.email}
      </StyledTableCell>
      <StyledTableCell align="left">{props.staff.phone_number}</StyledTableCell>
      <StyledTableCell scope="row">
        <DepartementName departement_id={props.staff.departement_id} />
      </StyledTableCell>
      <StyledTableCell scope="row">
        <DepartementPositionName departement_position_id={props.staff.departement_position_id} />
      </StyledTableCell>
      <StyledTableCell align="left">
        {props.staff.is_admin ? <AdminChip /> : ""}
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {props.decodedToken.user_type === "organization" ?
          <Tooltip arrow title="Edit" aria-label="confirm">
            <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
              <EditIcon style={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          :
          <div></div>
        }
        <StaffEditForm
          staff={props.staff}
          departements={props.departements}
          departementPositions={props.departementPositions}
          open={openEditModal}
          organization_id={props.organization_id}
          handleDeleteStaff={props.handleDeleteStaff}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
          decodedToken={props.decodedToken}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}