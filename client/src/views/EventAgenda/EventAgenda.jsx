import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Popover, Chip, Paper, IconButton, Button } from '@material-ui/core';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  AgendaByDate,
  AddAgendaModal,
} from './components';

const rundown_date = [
  { _id: 1, date: "Sun Mar 22 2020", event_id: 0 },
  { _id: 0, date: "Sat Mar 21 2020", event_id: 0 },
]

const dataAgenda = [
  { _id: 0, agenda_name: "tanggal 21", start_time: "12:50", date: 0, end_time: '15:20' },
  { _id: 2, agenda_name: "aaa", start_time: "14:30", date: 1, end_time: '17:50' },
  { _id: 1, agenda_name: "tanggal 21", start_time: "10:30", date: 0, end_time: '12:50' },
  { _id: 2, agenda_name: "aaa", start_time: "10:30", date: 1, end_time: '12:50' },
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

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


export default function EventAgenda() {
  const classes = useStyles();
  const [popoverDate, setPopoverDate] = React.useState(null);
  const [popoverEditDate, setPopoverEditDate] = React.useState(null);
  const [agendas, setAgendas] = React.useState(dataAgenda);
  const initialAgendaState =
  {
    _id: agendas.length + 1,
    agenda_name: "aaa",
    date: "",
    start_time: "10:10",
    end_time: "10:20",
  };
  const [agendaForm, 
    // setAgendaForm
  ] = React.useState(initialAgendaState);
  const [rundownDates, setRundownDates] = React.useState(rundown_date);
  const initialRundownState =
  {
    _id: rundownDates.length + 1,
    date: "",
    event_id: 0,
  };
  const [rundownDatesForm, setRundownDatesForm] = React.useState(initialRundownState);
  const [
    // timeOverlap,
     setTimeOverlap] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState(undefined);
  const [indexEditDate, setIndexEditDate] = React.useState(undefined);
  const [idEditDate, setIdEditDate] = React.useState(undefined);
  const sortedRundownDates = (rundownDates.slice().sort((a, b) => new Date(a.date) - new Date(b.date)));
  const sortedAgendas = (agendas.slice().sort((a, b) => new Date(new Date().toString().slice(0, 16) + a.start_time) - new Date(new Date().toString().slice(0, 16) + b.start_time)));
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // const [sortedRundownDates, setSortedRundownDates] = React.useState(rundownDates.slice().sort((a, b) => new Date(a.date) - new Date(b.date)));
  // const handleSaveAgendaButton = (_id, date) => {
  //   setAgendaForm({
  //     ...agendaForm,
  //     date: _id,
  //     agenda_name: "Duck",
  //     // start_time: new Date(v.toString()).toString(),
  //     // end_time: new Date(v.toString()).toString(),
  //   });
  //   setTimeOverlap(false);
  // }
  console.log(agendaForm)
  // const [formStart,setFormStart] = React.useState("");
  // const [fomrEnd,setFormEnd] = React.useState();

  React.useEffect(() => {
    for (let i = 0; i < rundownDates.length; i++) {
      for (let j = 0; j < agendas.length; j++) {
        if (agendas[j].date === rundownDates[i]._id && agendaForm.date === rundownDates[i]._id) {
          const AStart = new Date(rundownDates[i].date + " " + agendaForm.start_time);
          const AEnd = new Date(rundownDates[i].date + " " + agendaForm.end_time);
          if ((AStart < new Date(rundownDates[i].date + " " + agendas[j].end_time)) &&
            (AEnd > new Date(rundownDates[i].date + " " + agendas[j].start_time))) {
            setTimeOverlap(true);
            break;
          } else {
            setTimeOverlap(false)
          }
        }
      }
    }
  }, [setTimeOverlap,agendaForm, rundownDates, agendas])

  // const handleSave = () => {
  //   if (timeOverlap) {
  //     alert("gabisa gan")
  //   } else {
  //     setAgendas([...agendas, agendaForm]);
  //   }
  // }
  // console.log(timeOverlap)

  const handleSaveChange = (e, index) => {
    const newArr = [...agendas];
    newArr[index] = e;
    setAgendas(newArr)
  }


  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDays(modifiers.selected ? undefined : day);
    setRundownDatesForm({ ...rundownDatesForm, date: day.toString().slice(0, 16) })
  }
  const handleEditDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDays(modifiers.selected ? undefined : day);
    setRundownDatesForm({ ...rundownDatesForm, _id: idEditDate, date: day.toString().slice(0, 16) })
  }

  const handleOpenDate = e => {
    setPopoverDate(popoverDate ? null : e.currentTarget);
  };

  const handleOpenEditDate = (e, _id, index) => {
    setPopoverEditDate(popoverEditDate ? null : e.currentTarget);
    setIndexEditDate(index);
    setIdEditDate(_id);
  };

  const handleSubmitDate = () => {
    // setAgenda({ ...agenda, start_time: agenda.start_time, end_time: agenda.end_time });
    setRundownDates([...rundownDates, rundownDatesForm])
    handleClose();
  };
  console.log(rundownDates)
  const handleSubmitEditDate = () => {
    const newArr = [...sortedRundownDates];
    newArr[indexEditDate] = rundownDatesForm;
    setRundownDates(newArr);
    handleClose();
  };

  const handleClose = () => {
    setPopoverDate(null);
    setPopoverEditDate(null);
    setIndexEditDate(undefined);
    setSelectedDays(undefined);
    setIdEditDate(undefined);
    setRundownDatesForm(initialRundownState);
  };

  const openDate = Boolean(popoverDate);
  const id_date = openDate ? 'AddDateForm' : undefined;
  const openEditDate = Boolean(popoverEditDate);
  const id_edit_date = openEditDate ? 'EditDateForm' : undefined;

  return (
    <div>
      {
        sortedRundownDates.map((rundownDate, index) => (
          <div style={{ padding: "7px 0px" }} key={index}>
            <div style={{ display: 'flex', padding: 4, justifyContent: 'center' }}>
              <Chip clickable variant="outlined" color="primary" onClick={(e) => handleOpenEditDate(e, rundownDate._id, index)} size="small" label={rundownDate.date} />
            </div>
            <TableContainer component={Paper}>
              <Table size="small" className={classes.table} aria-label="customized table">
                <TableHead style={{ backgroundColor: 'orange' }}>
                  <TableRow>
                    <StyledTableCell align="center">Time</StyledTableCell>
                    <StyledTableCell align="left">Agenda Name</StyledTableCell>
                    <StyledTableCell align="left">Details</StyledTableCell>
                    <StyledTableCell style={{ width: 10 }} align="center">
                      <IconButton style={{ padding: 0 }} onClick={handleClickOpenAddDialog}>
                        <AddBoxIcon /></IconButton>
                        <AddAgendaModal 
                        rundownDate={rundownDate}
                        open={openAddDialog}
                        close={handleCloseAddDialog}
                        />
                        {/* onClick={() => handleSaveAgendaButton(rundownDate._id, rundownDate.date)}  */}
                      {/* <Button onClick={() => handleSave()} >add</Button> */}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    sortedAgendas.slice().map((agenda, index) => {
                      if (agenda.date === rundownDate._id)
                        return <AgendaByDate
                          key={index}
                          rundownDate={rundownDate}
                          agenda={agenda}
                          index={index}
                          handleSaveChange={handleSaveChange}
                        />
                      return null;
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      }
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleOpenDate} variant="contained" size="small" color="primary">
          add more dates    <AddIcon />
        </Button>
      </div>
      <Popover id={id_date} open={openDate} anchorEl={popoverDate} onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DayPicker
            showOutsideDays
            selectedDays={selectedDays}
            disabledDays={
              rundownDates.map((date, index) => {
                return new Date(date.date)
              })
            }
            onDayClick={handleDayClick}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {selectedDays === undefined ?
            <Button disabled>Set New Date</Button>
            :
            <Button onClick={handleSubmitDate}>Set New Date</Button>
          }
        </div>
      </Popover>
      <Popover id={id_edit_date} open={openEditDate} anchorEl={popoverEditDate} onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DayPicker
            showOutsideDays
            selectedDays={selectedDays}
            disabledDays={
              rundownDates.map((date, index) => {
                return new Date(date.date)
              })
            }
            onDayClick={handleEditDayClick}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {selectedDays === undefined ?
            <Button disabled>Change Agenda Date</Button>
            :
            <Button onClick={handleSubmitEditDate}>Change Agenda Date</Button>
          }
        </div>
      </Popover>
    </div>
  );
}