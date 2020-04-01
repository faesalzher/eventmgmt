import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Paper,
  Chip,
  Tooltip,
  IconButton,
  Divider,
  Popover,
  Button,
} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import randomColor from 'randomcolor';


const useStyles = makeStyles(theme => ({
  iconbutton: {
    padding: 0
  },
}));

export default function RoadmapAddForm(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: props.roadmaps.length + 1,
    roadmap_name: "",
    event_id: props.event_id,
    start_date: "",
    end_date: "",
  }
  const initialDateRange = [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]
  const [roadmapForm, setRoadmapForm] = useState(intitialFormState);
  const [date, setDate] = useState(initialDateRange);
  const [dateIsNull, setDateIsNull] = useState(true);
  const openCalendar = Boolean(anchorEl);
  const id = openCalendar ? 'simple-popover' : undefined;
  console.log(roadmapForm)


  const handleOpenCalendar = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDate = () => {
    setDate(initialDateRange);
    setDateIsNull(true);
  };
  const handleSaveButton = () => {
    roadmapForm.color = randomColor({ luminosity: 'dark' });
    props.handleSaveButton(roadmapForm)
    setRoadmapForm(intitialFormState);
    setDateIsNull(true);
    handleDeleteDate()
  }

  const handleDate = e => {
    setDate([e.selection])
  }

  const handleInputChange = e => {
    const { id, value } = e.target;
    setRoadmapForm({ ...roadmapForm, [id]: value })
  }

  const handleDateSubmit = () => {
    roadmapForm.start_date = date[0].startDate.toString().slice(0, 16);
    roadmapForm.end_date = date[0].endDate.toString().slice(0, 16);
    handleClose();
    setDateIsNull(false);
  }
  return (
    <div>
      {props.addRoadmapForm ?
        <div>
          <Paper variant="outlined" square style={{ marginTop: 10, padding: "0px 5px" }}>
            <TextField
              style={{ backgroundColor: 'white' }}
              autoFocus
              id="roadmap_name"
              placeholder="new roadmap"
              size="small"
              fullWidth
              multiline
              rowsMax="3"
              value={roadmapForm.roadmap_name}
              onChange={handleInputChange}
            />
            <Divider />
            <div style={
              props.xs ? {} : {}
            }>
              <div>
                {dateIsNull ?
                  <Tooltip title="Add New Roadmap" arrow>
                    <IconButton className={classes.iconbutton} onClick={handleOpenCalendar}>
                      <CalendarTodayIcon style={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                  :
                  <Chip
                    variant="outlined"
                    style={{ fontSize: 10 }}
                    size="small"
                    color="primary"
                    icon={<CalendarTodayIcon style={{ fontSize: 9 }} />}
                    label={roadmapForm.start_date + " - " + roadmapForm.end_date}
                    onClick={handleOpenCalendar}
                    onDelete={() => handleDeleteDate()}
                  />
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small" className={classes.iconbutton} onClick={() => props.setAddRoadmapForm(false)} style={{ color: 'grey' }}>Cancel</Button>
                {(roadmapForm.roadmap_name === "") ?
                  < Button size="small" className={classes.iconbutton} disabled >Create</Button>
                  :
                  (dateIsNull) ?
                    < Button size="small" className={classes.iconbutton} disabled >Create</Button>
                    :
                    < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveButton()}>Create</Button>
                }
              </div>
              <Popover
                id={id}
                open={openCalendar}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <DateRange
                  onChange={handleDate}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={() => handleDateSubmit()}>Set Date</Button>
                </div>
              </Popover>
            </div>
          </Paper>
        </div>
        : null
      }
    </div>
  );
}