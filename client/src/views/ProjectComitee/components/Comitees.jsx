import React, { useState, useEffect } from 'react';
import {
  Paper,
  IconButton,
  TableFooter,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
// import {, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage'

// import mockData from '../dataComitee';

import {
  Comitee,
  ComiteeAddForm
} from '.';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

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

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Comitees(props) {
  const classes = useStyles();
  const [comitees, setComitees] = useState(props.comitees);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, comiteesByDivision.length - page * rowsPerPage);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            // helperText="Please select your currency"
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
            <TableRow>
              <StyledTableCell style={{ width: 70 }} ></StyledTableCell>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >Phone Number</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell align="left">Position</StyledTableCell>
              <StyledTableCell align="left">Division</StyledTableCell>
              <StyledTableCell style={{ width: 10 }} align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? comiteesByDivision.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : comiteesByDivision
              ).map((comitee) => {
                return <Comitee
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
              })
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={comiteesByDivision.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}