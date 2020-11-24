

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
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

import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import { EVENT_QUERY, EDIT_ROADMAP, DELETE_ROADMAP,COMMITTEE_QUERY,PERSON_IN_CHARGES_BY_PROJECT_QUERY } from 'gql';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  formControl: {
    width: "100%"
  },
  formDate: {
    width: "100%"
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


export default function RoadmapEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  let { project_id, event_id } = useParams();

  const initialDateRange = [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]

  const [roadmapForm, setRoadmapForm] = useState({});
  const [navigate, setNavigate] = useState(false);

  React.useEffect(() => {
    setRoadmapForm(props.roadmap);
  }, [setRoadmapForm, props.roadmap]);

  const [event, setEvent] = useState([]);
  const { data: eventData } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: event_id },
      onCompleted: () => {
        setEvent(eventData.event)
      }
    });

  const [date, setDate] = useState(initialDateRange);

  React.useEffect(() => {
    if (roadmapForm.start_date !== undefined) {
      setDate([
        {
          startDate: new Date(roadmapForm.start_date),
          endDate: new Date(roadmapForm.end_date),
          key: "selection",
        },
      ]);
    }
  }, [setDate, roadmapForm.start_date, roadmapForm.end_date]);

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

  const [editRoadmap] = useMutation(EDIT_ROADMAP);
  const [deleteRoadmap] = useMutation(DELETE_ROADMAP);

  const handleSaveEditButton = () => {
    // roadmapForm.color = roadmapForm.color
    roadmapForm.start_date = date[0].startDate.toString().slice(0, 16);
    roadmapForm.end_date = date[0].endDate.toString().slice(0, 16);
    props.handleSaveEditButton(roadmapForm)
    editRoadmap(
      {
        variables:
        {
          _id: roadmapForm._id,
          roadmap_name: roadmapForm.roadmap_name,
          color: roadmapForm.color,
          start_date: roadmapForm.start_date,
          end_date: roadmapForm.end_date,
          event_id: roadmapForm.event_id,
          project_id: roadmapForm.project_id,
        }
      });
    // setRoadmapForm(intitialFormState);
    handleDeleteDate()
    props.close();
  }
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

  const handleChangeCommittee = (e) => {
    const { id, value } = e.target;
    // roadmapForm.committee_id = event.target.value;
    // setCommittee_id(e.target.value)
    setRoadmapForm({ ...roadmapForm, committee_id: value });
  };

  const handleDelete = () => {
    deleteRoadmap({ variables: { _id: roadmapForm._id } });
    setNavigate(true);
  };

  const handleCloseModal = () => {
    props.close();
    setRoadmapForm(props.roadmap)
  }


  if (navigate) {
    return <Redirect push to={'/project/' + project_id + '/' + event_id} />;
  }


  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title=" Edit roadmap" onClose={() => handleCloseModal()} />
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
                  disabled
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Committee"
                  value={roadmapForm.committee_id}
                  onChange={handleChangeCommittee}
                  variant="outlined"
                >
                  {groupCommittees.map((groupCommittee) => {
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
                maxDate={new Date(event.event_end_date)}
                rangeColors={[roadmapForm.color]}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            roadmapForm.roadmap_name === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
        content="Roadmap"
        name={roadmapForm.roadmap_name}
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
