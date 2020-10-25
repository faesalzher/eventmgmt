

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import uuid from 'uuid/v1';

const ADD_PROJECT = gql`
  mutation addProject(
    $_id: String!,
    $project_name: String!,
    $project_description: String!,
    $cancel: String!,
    $project_start_date: String!,
    $project_end_date: String!,
    $picture:String!,
    $organization_id:String!
    ) {
    addProject(
      _id: $_id,
      project_name: $project_name,
      project_description: $project_description,
      cancel:$cancel,
      project_start_date:$project_start_date,
      project_end_date:$project_end_date,
      picture:$picture,
      organization_id:$organization_id
      ) {
      _id
      project_name
      project_description
      cancel
      project_start_date
      project_end_date
      picture
      organization_id
    }
  }
`;

const ADD_DIVISION = gql`
  mutation addDivision(
    $_id: String!,
    $division_name: String!,
    $project_id: String!
    ) {
    addDivision(
      _id: $_id,
      division_name: $division_name,
      project_id: $project_id
      ) {
      _id
      division_name
      project_id
    }
  }
`;

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    marginTop: 0,
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

export default function AddProjectModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const initialFormState =
  {
    _id: uuid(),
    project_name: "",
    project_description: "",
    cancel: "false",
    project_start_date: new Date().toString(),
    project_end_date: new Date().toString(),
    picture: "null",
    organization_id: props.organization_id,
  };

  const divisionName = [
    'Core Comitee',
    'Program Subcomitee',
    'Secretariat Subcomitee',
    'Funding Subcomitee',
    'Food Subcomitee',
    'Security Subcomitee',
    'Publication and Documentation Subcomitee',
    'Equipment and Transportation Subcomitee',
  ]

  const [projects, setProjects] = useState(initialFormState);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);


  // console.log(data);
  const handleDate = e => {
    setDate([e.selection])
    projects.project_start_date = e.selection.startDate.toString();
    projects.project_end_date = e.selection.endDate.toString();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setProjects({ ...projects, [id]: value });
  };

  const [addProject] = useMutation(ADD_PROJECT);
  const [addDivision] = useMutation(ADD_DIVISION);

  const handleButton = e => {
    setTimeout(() => {
      props.addProject(projects);

      props.onCloseListener();
      // e.preventDefault();
      addProject(
        {
          variables:
          {
            _id: projects._id,
            project_name: projects.project_name,
            project_description: projects.project_description,
            cancel: projects.cancel,
            project_start_date: projects.project_start_date,
            project_end_date: projects.project_end_date,
            picture: projects.picture,
            organization_id: projects.organization_id,
          }
        });

      for (let i = 0; i < divisionName.length; i++) {
        addDivision(
          {
            variables:
            {
              _id: uuid(),
              division_name: divisionName[i],
              project_id: projects._id,
            }
          });
      }
      setProjects(initialFormState);
    }, 400);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.openListener}
      onClose={props.onCloseListener}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth={false}
    >
      <DialogTitle onClose={props.onCloseListener} title={"Add New Project"} />
      <DialogContent style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: 'row' }}>
          <div className={classes.form} style={fullScreen ? {} : { width: '50%' }}>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                id="project_name"
                label="Project Name"
                type="text"
                variant="outlined"
                value={projects.project_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                id="project_description"
                label="Description"
                type="text"
                variant="outlined"
                multiline
                // rows={8}
                value={projects.project_description}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
          <div>
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
        close={props.onCloseListener}
        validation={
          (
            projects.project_name === "" ||
            projects.project_description === "" ||
            projects.project_start_date === "" ||
            projects.project_end_date === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleButton()} />
    </Dialog>
  );
};

AddProjectModal.propTypes = {
  className: PropTypes.string
};



