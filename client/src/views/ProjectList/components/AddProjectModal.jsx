

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { StatusBox, EditImageForm } from "components";

import uuid from 'uuid/v1';
import { ADD_PROJECT } from 'gql';


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

export default function AddProjectModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const initialFormState =
  {
    _id: uuid(),
    project_name: "",
    project_description: "",
    project_start_date: new Date().toString(),
    project_end_date: new Date().toString(),
    picture: " ",
    created_at: new Date().toString(),
    organization_id: props.organization_id,
  };

  // const committeeName = [
  //   'Core Committee',
  //   'Program Subcommittee',
  //   'Secretariat Subcommittee',
  //   'Funding Subcommittee',
  //   'Food Subcommittee',
  //   'Security Subcommittee',
  //   'Publication and Documentation Subcommittee',
  //   'Equipment and Transportation Subcommittee',
  // ]

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
            project_start_date: projects.project_start_date,
            project_end_date: projects.project_end_date,
            picture: projects.picture,
            created_at: projects.created_at,
            organization_id: projects.organization_id,
          }
        });

      setProjects(initialFormState);
    }, 400);
  };

  const uploadImage = (e) => {
    setProjects({
      ...projects,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setProjects({
      ...projects,
      picture: " ",
    });
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
            <FormControl className={classes.formControl}>
              <EditImageForm
                uploadImage={uploadImage}
                removeImage={removeImage}
                picture={projects.picture}
                type="edit"
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              style={{ padding: '5px 0px' }}
            >
              <StatusBox
                style={{ width: 'auto' }}
                start_date={projects.project_start_date}
                end_date={projects.project_end_date}
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



