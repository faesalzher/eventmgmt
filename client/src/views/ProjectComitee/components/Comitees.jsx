import React, { useState, useEffect } from 'react';
import {
  Paper,
  IconButton,
  // TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
  TableCell,
  TableRow,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import {, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import {
  Comitee,
  ComiteeAddForm
} from '.';

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 500,
  },
  division: {
    backgroundColor: "#e4e4e4"
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    padding: "6px 3px 6px 3px",
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);

function ComiteesByDivision(props) {
  // const rowsPerPage = props.rowsPerPage;
  const comiteesByDivision = props.comiteesByDivision;
  // const page = props.page;
  const sortedComitees = comiteesByDivision.sort((a, b) => parseInt(a.position_id) - parseInt(b.position_id));


  if (comiteesByDivision.length === 0) {
    return <StyledTableRow >
      <StyledTableCell component="th" scope="row" colSpan={7}>
        <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
          there is no comitees yet
    </Typography>
      </StyledTableCell>
    </StyledTableRow>
  }

  return (
    (sortedComitees).map((comitee) => {
      return (
        <Comitee
          key={comitee._id}
          handleDeleteComitee={props.handleDeleteComitee}
          positions={props.positions}
          divisions={props.divisions}
          project_id={props.project_id}
          comitee={comitee}
          staffs={props.staffs}
          comitees={props.comitees}
          handleSaveEditButton={props.handleSaveEditButton}
        />
      )
    })
  );
}

function ComiteesAll(props) {
  // const rowsPerPage = props.rowsPerPage;
  const comiteesByDivision = props.comiteesByDivision;
  // const page = props.page;

  const comiteesPerDivision = comiteesByDivision.filter(function (comitee) {
    return comitee.division_id === props.division._id
  });

  const sortedComitees = comiteesPerDivision.sort((a, b) => parseInt(a.position_id) - parseInt(b.position_id));

  if (comiteesPerDivision.length === 0) {
    return <StyledTableRow >
      <StyledTableCell component="th" scope="row" colSpan={7}>
        <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
          there is no comitees yet
    </Typography>
      </StyledTableCell>
    </StyledTableRow>
  }

  return (
    (sortedComitees).map((comitee) => {
      return (
        <Comitee
          key={comitee._id}
          handleDeleteComitee={props.handleDeleteComitee}
          positions={props.positions}
          divisions={props.divisions}
          project_id={props.project_id}
          comitee={comitee}
          staffs={props.staffs}
          comitees={props.comitees}
          handleSaveEditButton={props.handleSaveEditButton}
        />
      )
    })
  );
}


const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "theme.palette.background.default",
    },
  },
}))(TableRow);

export default function Comitees(props) {
  const classes = useStyles();
  const [comitees, setComitees] = useState(props.comitees);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [divisions, setDivisions] = React.useState(props.divisions);
  const [division_id, setDivision_id] = React.useState('all');

  useEffect(() => {
    setComitees(props.comitees)
  }, [setComitees, props.comitees])

  useEffect(() => {
    setDivisions(props.divisions)
  }, [setDivisions, props.divisions])

  const division_name = (divisions.filter(function (division) {
    if (division_id === "all") {
      return division
    } else {
      return division._id === division_id;
    }
  }));

  const comiteesByDivision = comitees.filter(function (comitee) {
    if (division_id === "all") {
      return comitee.project_id === props.project_id;
    } else {
      return comitee.division_id === division_id && comitee.project_id === props.project_id;
    }
  });

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, comiteesByDivision.length - page * rowsPerPage);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleChange = (event) => {
    setDivision_id(event.target.value);
  };

  return (
    <div >
      <Toolbar style={{ minHeight: 36, display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: 'black' }} variant='subtitle2'>
          List of Comitee
        </Typography>
        <div style={{ display: 'flex' }}>
          <TextField
            id="select-division-native"
            select
            size="small"
            margin="dense"
            style={{ margin: '4px 10px' }}
            label="Division"
            value={division_id}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option key={'All'} value={'all'}>
              All
              </option>
            {divisions.map((division) => (
              <option key={division.division_name} value={division._id}>
                {division.division_name}
              </option>
            ))}
          </TextField>
          <Tooltip arrow title="Add New Comitees" aria-label="confirm">
            <IconButton onClick={handleOpenAddModal} style={{ padding: 0, margin: '10px 0px 10px 0px' }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <ComiteeAddForm
            staffs={props.staffs}
            project_id={props.project_id}
            division_id={division_id}
            divisions={divisions}
            positions={props.positions}
            division_name={division_name}
            comitees={comitees}
            open={openAddModal}
            handleSaveButton={props.handleSaveButton}
            close={handleCloseAddModal}
          />
        </div>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell style={{ width: 70 }} ></StyledTableCell>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >Phone Number</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell align="left">Position</StyledTableCell>
              <StyledTableCell style={{ width: 10 }} align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {
            division_id === "all" ?
              divisions.map((division, index) => {
                return (
                  <TableBody key={index}>
                    <TableRow className={classes.division}>
                      <StyledTableCell component="th" scope="row" colSpan={7}>
                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                          {division.division_name}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                    <ComiteesAll
                      division={division}
                      // rowsPerPage={rowsPerPage}
                      comiteesByDivision={comiteesByDivision}
                      // page={page}
                      handleSaveEditButton={props.handleSaveEditButton}
                      handleDeleteComitee={props.handleDeleteComitee}
                      positions={props.positions}
                      divisions={props.divisions}
                      project_id={props.project_id}
                      staffs={props.staffs}
                      comitees={props.comitees}
                    />
                  </TableBody>
                )
              })
              :
              <TableBody>
                {/* <StyledTableRow>
                <StyledTableCell component="th" scope="row" colSpan={7}>
                  {division_name}
                </StyledTableCell>
              </StyledTableRow> */}
                <ComiteesByDivision
                  // rowsPerPage={rowsPerPage}
                  comiteesByDivision={comiteesByDivision}
                  // page={page}
                  handleSaveEditButton={props.handleSaveEditButton}
                  handleDeleteComitee={props.handleDeleteComitee}
                  positions={props.positions}
                  divisions={props.divisions}
                  project_id={props.project_id}
                  staffs={props.staffs}
                  comitees={props.comitees}
                />
              </TableBody>
          }
          {/* <TableBody>
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={comiteesByDivision.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}
