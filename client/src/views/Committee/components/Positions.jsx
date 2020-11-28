import React, { useState, useEffect } from 'react';
import {
  Paper,
  IconButton,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  // TextField,
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


import {
  Position,
  PositionAddForm
} from '.';

// import {
//   COMMITTEE_QUERY,
// }

// import mockData from '../dataPosition';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles = makeStyles({
  table: {
    // minWidth: 500,
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

export default function Positions(props) {
  const classes = useStyles();
  // const [positions, setPositions] = useState(mockData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [positions, setPositions] = useState(props.positions)
  // console.log(positions)
  useEffect(() => {
    setPositions(props.positions)
  }, [setPositions, props.positions])

  // const { data: committeesData, refetch: committeesRefetch, loading: committeesLoading } = useQuery(COMMITTEES_QUERY, {
  //   variables: { organization_id: decodedToken.organization_id },
  //   onCompleted: () => {
  //     setCommittees(
  //       committeesData.committees
  //     )
  //   }
  // }
  // );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, positions.length - page * rowsPerPage);

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

  return (
    <div >
      <Toolbar style={{ minHeight: 36, display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: 'black' }} variant='subtitle2'>
          List of Position
        </Typography>
        {
          props.decodedToken.user_type === "organization"
            ?
            <Tooltip arrow title="Add New Positions" aria-label="confirm">
              <IconButton onClick={handleOpenAddModal} style={{ padding: 0, margin: '10px 0px 10px 0px' }}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            : <></>
        }
        <PositionAddForm
          // guests={guests}
          positions={positions}
          coreCommittee={props.coreCommittee}
          decodedToken={props.decodedToken}
          open={openAddModal}
          handleSaveButton={props.handleSaveButton}
          close={handleCloseAddModal}
        />
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ paddingLeft: 16 }}>Name</StyledTableCell>
              <StyledTableCell style={{ width: 150 }}>Committee Type</StyledTableCell>
              <StyledTableCell style={{ width: 10 }} align="center">
                {
                  props.decodedToken.user_type === "organization"
                    ?
                    "Action" : ""
                }
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? positions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : positions
              ).map((position, index) => {
                return <Position
                  key={index}
                  position={position}
                  coreCommittee={props.coreCommittee}
                  project_personInCharge={props.project_personInCharge}
                  decodedToken={props.decodedToken}
                  handleDeletePosition={props.handleDeletePosition}
                  handleSaveEditButton={props.handleSaveEditButton}
                />
              })
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={1} />
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={positions.length}
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
          </TableFooter> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        // colSpan={6}
        component="div"
        count={positions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        // SelectProps={{
        //   inputProps: { 'aria-label': 'rows per page' },
        //   native: true,
        // }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      // ActionsComponent={TablePaginationActions}
      />
    </div>
  );
}
