import React, { useState, useEffect } from 'react';
import {
  Paper,
  Toolbar,
  Typography,
  TextField,
  TableCell,
  TableRow,
} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/core/styles';
// import {, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { useQuery } from '@apollo/react-hooks';

import {
  PersonInCharge,
} from '.';
import { COMMITTEE_QUERY } from 'gql';
const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 500,
  },
  committee: {
    backgroundColor: "#e4e4e4"
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    padding: "3px 3px 3px 3px",
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);


const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "theme.palette.background.default",
    },
  },
}))(TableRow);



const PersonInCharges = (props) => {
  const classes = useStyles();
  const [personInCharges, setPersonInCharges] = useState(props.personInCharges);

  const sortedPersonInCharges = personInCharges.sort((a, b) => parseInt(a.position_id) - parseInt(b.position_id));

  const personInChargesByCommittee = sortedPersonInCharges.filter(function (personInCharge) {
    if (props.committee_id === "all") {
      return personInCharge.project_id === props.project_id;
    } else {
      return personInCharge.committee_id === props.committee_id && personInCharge.project_id === props.project_id;
    }
  });

  const groupCommitteesObject = personInChargesByCommittee.reduce((committees, personInCharge) => {
    const committee_id = personInCharge.committee_id;
    if (!committees[committee_id]) {
      committees[committee_id] = [];
    }
    committees[committee_id].push(personInCharge);
    return committees;
  }, {});


  const groupCommittees = Object.keys(groupCommitteesObject).map((committee_id) => {
    return {
      committee_id,
      personInCharges: groupCommitteesObject[committee_id]
    };
  });


  return (
    <div >
      <Toolbar style={{ minHeight: 36, display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: 'black' }} variant='subtitle2'>
          List of Person In Charge
        </Typography>
        <div style={{ display: 'flex' }}>
          <TextField
            id="select-committee-native"
            select
            size="small"
            margin="dense"
            style={{ margin: '4px 10px' }}
            label="Committee"
            value={props.committee_id}
            onChange={props.handleChange}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option key={'All'} value={'all'}>
              All
              </option>
            {props.groupCommittees.map((groupCommittee, index) => (
              <Option key={index} committee_id={groupCommittee.committee_id} />
            ))}
          </TextField>
        </div>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableRow >
              <StyledTableCell></StyledTableCell>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >Phone Number</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell align="left">Position</StyledTableCell>
              <StyledTableCell style={{ width: 10 }} align="center">
                {
                  props.project_personInCharge.position_id !== "7" ?
                    "Action" : ""
                }
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
            {
              groupCommittees.map((groupCommittee, index) => {
                return <TableBody key={index}>
                  <StyledTableRow className={classes.committee}>
                    <StyledTableCell component="th" scope="row" colSpan={7}>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        <CommitteeName committee_id={groupCommittee.committee_id} />
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                  {
                    (groupCommittee.personInCharges).map((personInCharge) => {
                      return (
                        <PersonInCharge
                          key={personInCharge._id}
                          handleDeletePersonInCharge={props.handleDeletePersonInCharge}
                          positions={props.positions}
                          committees={props.committees}
                          project_id={props.project_id}
                          project_personInCharge={props.project_personInCharge}
                          personInCharge={personInCharge}
                          staffs={props.staffs}
                          decodedToken={props.decodedToken}
                          personInCharges={props.personInCharges}
                          handleSaveEditButton={props.handleSaveEditButton}
                        />
                      )
                    })
                  }
                </TableBody>
              })
            }
        </Table>
      </TableContainer>
    </div>
  );
};
export default PersonInCharges;

const Option = props => {
  const { data: committeeData } = useQuery(COMMITTEE_QUERY, {
    variables: { _id: props.committee_id },
  },
  );

  if (!committeeData) {
    return (<></>)
  }

  return (
    <option key={committeeData.committee._id} value={committeeData.committee._id}>
      {committeeData.committee.committee_name}
    </option>
  );
}

const CommitteeName = props => {
  const { data: committeeData } = useQuery(COMMITTEE_QUERY, {
    variables: { _id: props.committee_id },
  },
  );

  if (!committeeData) {
    return (<></>)
  }

  return (
    <>      {committeeData.committee.committee_name}    </>
  );
}