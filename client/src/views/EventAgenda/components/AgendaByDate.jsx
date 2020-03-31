import React, { useEffect, useState } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import Button from '@material-ui/core/Button';
import {
  Popover,
  // Typography,
  TableCell,
  TableRow
} from '@material-ui/core';
import TimeKeeper from 'react-timekeeper';
// use material theme
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

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

export default function Agenda(props) {
  // const classes = useStyles();
  const [popoverTime, setPopoverTime] = React.useState(null);

  // const [date, setDate] = React.useState(moment);
  // const initialTime = "00:00"
  const [agenda, setAgenda] = useState(props.agenda)
  useEffect(() => {
    setAgenda(props.agenda)
  }, [props.agenda])

  const [validateTime, setValidateTime] = React.useState(false);
  const dtStart = new Date(props.rundownDate.date+agenda.start_time);
  const dtEnd = new Date(props.rundownDate.date+agenda.end_time);
  const difference_in_milliseconds = dtEnd - dtStart;
  useEffect(() => {
    if (difference_in_milliseconds < 0) {
      setValidateTime(false)
    } else {
      setValidateTime(true)
    }
  },[difference_in_milliseconds])

  const onStartTimeChange = (e) => {
    setAgenda({ ...agenda, start_time: new Date(agenda.start_time.slice(0, 16) + e).toString() });
  };

  const onEndTimeChange = (e) => {
    setAgenda({ ...agenda, end_time: new Date(agenda.end_time.slice(0, 16) + e).toString() });
  };

  // const handleOpenTime = e => {
  //   setPopoverTime(popoverTime ? null : e.currentTarget);
  // };


  // console.log(dtStart + "-" + dtEnd)
  const handleSubmitTime = () => {
    setAgenda({ ...agenda, start_time: agenda.start_time, end_time: agenda.end_time });
    setPopoverTime(null);
    props.handleSaveChange(agenda, props.index);
  };


  const handleCloseTime = () => {
    setPopoverTime(null);
    setAgenda({ ...agenda, start_time: props.agenda.start_time, end_time: props.agenda.end_time });
  };


  const [showEditIcon, setShowEditIcon] = React.useState(false);
  const openTime = Boolean(popoverTime);
  const id_time = openTime ? 'startTimeForm' : undefined;

  return (
    <StyledTableRow onMouseEnter={() => setShowEditIcon(true)} onMouseLeave={() => setShowEditIcon(false)} onClick={() => console.log("aa")} hover={true}>
      <StyledTableCell style={{ width: 115 }} align="center" component="th" scope="row">
        {/* <ButtonBase onClick={handleOpenTime}> */}
        {(agenda.start_time === "00:00" && agenda.end_time === "00:00") ?
          <div>-</div> : <div>{agenda.start_time} -{agenda.end_time}</div>
        }
        {/* </ButtonBase> */}
      </StyledTableCell>
      <StyledTableCell align="left">
        {agenda.agenda_name}
      </StyledTableCell>
      <StyledTableCell align="left">Details goes in this section</StyledTableCell>
      <StyledTableCell style={{ width: 36 }} align="center">
        {/* {props.index+1} */}
        {showEditIcon ?
          <EditIcon style={{ fontSize: 14 }} />
          : <div style={{}}></div>
        }
      </StyledTableCell>
      <Popover id={id_time} open={openTime} anchorEl={popoverTime} onClose={handleCloseTime}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }} >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TimeKeeper
              time={agenda.start_time.slice(16, 21)}
              onChange={(newTime) => onStartTimeChange(newTime.formatted24)}
              hour24Mode={true}
            />
            <TimeKeeper
              time={agenda.end_time.slice(16, 21)}
              onChange={(newTime) => onEndTimeChange(newTime.formatted24)}
              hour24Mode={true}
            />
          </div>
          {
            validateTime ?
              <Button onClick={handleSubmitTime}>Set Time</Button>
              :
              <Button disabled>Set Time</Button>
          }
        </div>
      </Popover>
    </StyledTableRow>
  );
}