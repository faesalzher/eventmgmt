import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
  ComiteeEditForm
} from '.';

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

export default function Comitees(props) {
  // const classes = useStyles();
  // console.log(props.comitees.imageUrl)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [staff, setStaff] = useState([]);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // const handleSaveButton = (e) => {
  //   // setComiteess([...comiteess, e])
  // }

  const { data } = useQuery(STAFFSBYID_QUERY,
    {
      variables: { _id: props.comitee.staff_id },
      onCompleted: () => { setStaff(data.staffById) }
    });

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row" style={{ display: 'flex', justifyContent: 'center', width: 70 }}>
        <Avatar style={{width:30, height:30}} src={staff.picture} />
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
          if (position._id === props.comitee.position_id) {
            return <div key={index}>{position.position_name}</div>
          }
          return null;
        })
        }
      </StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        <Tooltip arrow title="Edit" aria-label="confirm">
          <IconButton onClick={handleOpenEditModal} style={{ padding: 3 }}>
            <EditIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <ComiteeEditForm
          comitee={props.comitee}
          project_id={props.project_id}
          comitees={props.comitees}
          divisions={props.divisions}
          positions={props.positions}
          staffs={props.staffs}
          departements={props.departements}
          open={openEditModal}
          handleDeleteComitee={props.handleDeleteComitee}
          handleSaveEditButton={props.handleSaveEditButton}
          close={handleCloseEditModal}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}