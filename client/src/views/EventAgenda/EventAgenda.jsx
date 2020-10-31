import React, { } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Typography,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import {
  AgendaByDate,
  AddAgendaModal,
} from './components';


const dataAgenda = [
  { _id: '0', agenda_name: "tanggal 21", details: "Details goes in this section", start_time: "12:50", date: "Sat Mar 21 2020", end_time: '15:20' },
  { _id: '2', agenda_name: "aaa", details: "Details goes in this section", start_time: "14:30", date: "Sun Mar 22 2020", end_time: '17:50' },
  { _id: '1', agenda_name: "tanggal 21", details: "Details goes in this section", start_time: "10:30", date: "Sat Mar 21 2020", end_time: '12:50' },
  { _id: '3', agenda_name: "aaa", details: "Details goes in this section", start_time: "10:30", date: "Sun Mar 22 2020", end_time: '12:50' },
  // { _id: 4, agenda_name: "z", start_time: "10:30", date: "Tue Jun 09 2020", end_time: '12:50' },
];

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 100,
  },
  colorSecondary: {
    backgroundColor: theme.palette.primary.main
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    padding: "6px 3px 6px 3px",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(TableRow);

export default function EventAgenda() {
  const classes = useStyles();
  const [agendas, setAgendas] = React.useState(dataAgenda);
  // const sortedRundownDates = (rundownDates.slice().sort((a, b) => new Date(a.date) - new Date(b.date)));
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  }
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };


  const handleSaveAgendaButton = (agendaForm) => {
    setAgendas([...agendas, agendaForm]);
  }

  const handleSaveEditButton = (e) => {
    const temp = [...agendas];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setAgendas(temp)
  }

  const handleDelete = (e) => {
    const temp = [...agendas];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setAgendas(temp);
    setTimeout(() => {
      handleOpenSnackbar();
    }, 700);
  };


  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const sortedAgendas = (
    agendas.slice().sort((a, b) =>
      new Date(new Date().toString().slice(0, 16) + a.start_time) -
      new Date(new Date().toString().slice(0, 16) + b.start_time)
    )
  );

  const groupByDate = sortedAgendas.reduce((groupByDate, agenda) => {
    const date = agenda.date;
    if (!groupByDate[date]) {
      groupByDate[date] = [];
    }
    groupByDate[date].push(agenda);
    return groupByDate;
  }, {});

  // Edit: to add it in the array format instead
  const groupAgendas = Object.keys(groupByDate).map((date) => {
    return {
      date,
      sortedAgendas: groupByDate[date]
    };
  });
  const sortedGroupAgendas = (groupAgendas.slice().sort((a, b) => new Date(a.date) - new Date(b.date)));

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Succes!
         </MuiAlert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} aria-label="customized table">
          <TableHead className={classes.colorSecondary}>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="left">Agenda Name</StyledTableCell>
              <StyledTableCell align="left">Details</StyledTableCell>
              <StyledTableCell style={{ width: 10 }} align="center">
                <AddAgendaModal
                  open={openAddDialog}
                  handleSaveAgendaButton={handleSaveAgendaButton}
                  close={handleCloseAddDialog}
                />
                <Tooltip arrow title="Add New Agenda" aria-label="confirm">
                  <IconButton onClick={handleOpenAddDialog} style={{ padding: 0 }}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                {/* <Button
                  onClick={handleOpenAddDialog}
                  variant="contained"
                  size="small"
                  color="secondary">
                  add new agenda    <AddIcon />
                </Button> */}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {
            sortedGroupAgendas.map((rundownDate, index) => (
              <TableBody>
                <StyledTableRow >
                  <StyledTableCell align="center" colSpan={5}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <CalendarTodayIcon style={{ fontSize: 10, margin: 5, color: 'white' }} />
                      <Typography variant="subtitle2" style={{ color: 'white' }}>
                        {rundownDate.date}
                      </Typography>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
                {
                  rundownDate.sortedAgendas.map((agenda, index) => {
                    return <AgendaByDate
                      key={index}
                      rundownDate={rundownDate}
                      agenda={agenda}
                      index={index}
                      handleDelete={handleDelete}
                      handleSaveEditButton={handleSaveEditButton}
                    />
                  })
                }
              </TableBody>
            )
            )
          }

        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

      </div>
    </div>
  );
}