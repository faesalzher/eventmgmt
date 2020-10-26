

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { DateRange } from 'react-date-range';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useMediaQuery from '@material-ui/core/useMediaQuery';
import randomColor from 'randomcolor';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import uuid from 'uuid/v1';

const ADD_ROADMAP = gql`
  mutation addRoadmap(
    $_id: String!,
    $roadmap_name: String!,
    $start_date: String!,
    $end_date: String!,
    $color:String!,
    $event_id:String!
    ) {
    addRoadmap(
      _id: $_id,
      roadmap_name: $roadmap_name,
      start_date:$start_date,
      end_date:$end_date,
      color:$color,
      event_id:$event_id
      ) {
      _id
      roadmap_name
      start_date
      end_date
      color
      event_id
    }
  }
`;


const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // width: '50%',
    margin: theme.spacing(2),
  },
  formControl: {
    // minWidth: 50
    width: "100%"
  },
  formDate: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(0),
    width: "100%"
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


export default function RoadmapAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    roadmap_name: "",
    color: randomColor({ luminosity: 'dark' }) ,
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

  const handleDeleteDate = () => {
    setDate(initialDateRange);
  };


  const handleDate = e => {
    setDate([e.selection])
  }

  const handleInputChange = e => {
    const { id, value } = e.target;
    setRoadmapForm({ ...roadmapForm, [id]: value })
  }

  const [addRoadmap] = useMutation(ADD_ROADMAP);

  const handleSaveButton = () => {
    // roadmapForm.color = roadmapForm.color
    roadmapForm.start_date = date[0].startDate.toString().slice(0, 16);
    roadmapForm.end_date = date[0].endDate.toString().slice(0, 16);
    props.handleSaveButton(roadmapForm)
    addRoadmap(
      {
        variables:
        {
          _id: roadmapForm._id,
          roadmap_name: roadmapForm.roadmap_name,
          color: roadmapForm.color,
          start_date: roadmapForm.start_date,
          end_date: roadmapForm.end_date,
          event_id: roadmapForm.event_id,
        }
      });
    setRoadmapForm(intitialFormState);
    handleDeleteDate()
    props.close();
  }

  
  const handleCloseModal = () => {
    props.close();
    setRoadmapForm(intitialFormState);
    handleDeleteDate()
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={()=>handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title="Add New roadmap" onClose={()=>handleCloseModal()}/>
      <DialogContent style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} style={fullScreen ? {} : { width: '50%' }}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="roadmap_name"
                label="Roadmap Name"
                type="text"
                variant="outlined"
                multiline
                rowsMax="3"
                value={roadmapForm.roadmap_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
          <div style={fullScreen ? {} : { marginTop: 14 }}>
            <FormControl className={classes.formDate}>
              <DateRange
                onChange={handleDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsAdd
        validation={
          (
            roadmapForm.roadmap_name === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()}
        close={()=>handleCloseModal()}
        />
        
    </Dialog>
  );
};

