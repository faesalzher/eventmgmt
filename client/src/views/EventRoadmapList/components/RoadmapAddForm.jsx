

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  MenuItem,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { DateRange } from 'react-date-range';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useMediaQuery from '@material-ui/core/useMediaQuery';
import randomColor from 'randomcolor';

import { useMutation, useQuery } from '@apollo/react-hooks';
import uuid from 'uuid/v1';

import { ADD_ROADMAP, COMMITTEE_QUERY, PERSON_IN_CHARGES_BY_PROJECT_QUERY } from 'gql';

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
    color: randomColor({ luminosity: 'dark' }),
    start_date: "",
    end_date: "",
    committee_id: "",
    event_id: props.event_id,
    project_id: props.project_id,
  }

  const initialDateRange = [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]
  const [roadmapForm, setRoadmapForm] = useState(intitialFormState);
  const [daysSelected, setDaysSelected] = useState(false);
  const [date, setDate] = useState(initialDateRange);
  // const [committee_id, setCommittee_id] = useState("");

  const handleDeleteDate = () => {
    setDate(initialDateRange);
  };


  const handleDate = e => {
    setDate([e.selection])
    setDaysSelected(true)
  }

  const handleInputChange = e => {
    const { id, value } = e.target;
    setRoadmapForm({ ...roadmapForm, [id]: value })
  }

  const [addRoadmap] = useMutation(ADD_ROADMAP);


  const { data: personInChargesData } =
    useQuery(PERSON_IN_CHARGES_BY_PROJECT_QUERY, {
      variables: { project_id: props.project_id },
    }
    );
  if (!personInChargesData) {
    return (<></>)
  }


  //group cmmittee from person_in_charges
  const groupCommitteesObject = personInChargesData.person_in_charges.reduce((committees, personInCharge) => {
    const committee_id = personInCharge.committee_id;
    if (!committees[committee_id]) {
      committees[committee_id] = [];
    }
    committees[committee_id].push(personInCharge);
    return committees;
  }, {});

  //add it into array
  const groupCommittees = Object.keys(groupCommitteesObject).map((committee_id) => {
    return {
      committee_id,
      personInCharges: groupCommitteesObject[committee_id]
    };
  });
  console.log(groupCommittees)


  const handleChangeCommittee = (e) => {
    const { value } = e.target;
    // roadmapForm.committee_id = event.target.value;
    // setCommittee_id(e.target.value)
    setRoadmapForm({ ...roadmapForm, committee_id: value });
  };

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
          committee_id: roadmapForm.committee_id,
          event_id: roadmapForm.event_id,
          project_id: roadmapForm.project_id,
        }
      });
    setRoadmapForm(intitialFormState);
    handleDeleteDate()
    props.close();
    setDaysSelected(false);
  }
  console.log(roadmapForm)


  const handleCloseModal = () => {
    props.close();
    setRoadmapForm(intitialFormState);
    handleDeleteDate()
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title="Add New roadmap" onClose={() => handleCloseModal()} />
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
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="committee_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Committee"
                  value={roadmapForm.committee_id}
                  onChange={handleChangeCommittee}
                  variant="outlined"
                >
                  {groupCommittees.map((groupCommittee) => {
                    if (groupCommittee.committee_id === props.project_personInCharge.committee_id
                      || props.decodedToken.user_type === "organization"
                      || props.project_personInCharge.position_id === '1'
                      || props.project_personInCharge.position_id === '2'
                      || props.project_personInCharge.position_id === '3'
                    )
                      return (
                        <MenuItem key={groupCommittee.committee_id}
                          value={groupCommittee.committee_id}
                        >
                          <MenuItemSelect groupCommittee={groupCommittee} />
                        </MenuItem>
                      )
                    return null
                  })}
                </TextField>
              }
            </FormControl>
          </div>
          <div style={fullScreen ? {} : { marginTop: 14 }}>
            <FormControl className={classes.formDate}>
              <DateRange
                onChange={handleDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
                // minDate={new Date(props.project.project_start_date)}
                maxDate={new Date(props.event.event_end_date)}
                rangeColors={[roadmapForm.color]}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsAdd
        validation={
          (
            roadmapForm.roadmap_name === "" ||
            daysSelected === false
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()}
        close={() => handleCloseModal()}
      />

    </Dialog>
  );
};

const MenuItemSelect = (props) => {
  const { data: committeeData } = useQuery(COMMITTEE_QUERY, {
    variables: { _id: props.groupCommittee.committee_id },
  }
  );

  if (!committeeData) {
    return (<></>)
  }

  return (
    <div>
      {committeeData.committee.committee_name}
    </div>
  );
}
