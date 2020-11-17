import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Dialog,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import FormControl from "@material-ui/core/FormControl";

import "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StatusBox } from 'components';
import { Redirect } from "react-router";

import { ConfirmationDialog, EditImageForm } from "components";


const EDIT_PROJECT = gql`
  mutation editProject(
    $_id: String!
    $project_name: String!
    $project_description: String!
    $cancel: Boolean!
    $project_start_date: String!
    $project_end_date: String!
    $picture: String!
    $organization_id: String!
  ) {
    editProject(
      _id: $_id
      project_name: $project_name
      project_description: $project_description
      cancel: $cancel
      project_start_date: $project_start_date
      project_end_date: $project_end_date
      picture: $picture
      organization_id: $organization_id
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

const DELETE_PROJECT = gql`
  mutation deleteProject($_id: String!) {
    deleteProject(_id: $_id) {
      _id
    }
  }
`;

const DELETE_DIVISION = gql`
  mutation deleteDivision($_id: String!) {
    deleteDivision(_id: $_id) {
      _id
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  formControl: {
    width: "100%",
  },
  formDate: {
    width: "100%",
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  media: {
    height: 200,
  },
}));

export default function ProjectEditModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [projectForm, setProjectForm] = React.useState([]);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    setProjectForm(props.project);
  }, [setProjectForm, props.project]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  useEffect(() => {
    if (projectForm.project_start_date !== undefined) {
      setDate([
        {
          startDate: new Date(projectForm.project_start_date),
          endDate: new Date(projectForm.project_end_date),
          key: "selection",
        },
      ]);
    }
  }, [setDate, projectForm.project_start_date, projectForm.project_end_date]);

  const handleDate = (e) => {
    setDate([e.selection]);
    // projectForm.project_start_date = e.selection.startDate.toString();
    // projectForm.project_end_date = e.selection.endDate.toString();
    setProjectForm({
      ...projectForm,
      project_start_date: e.selection.startDate.toString(),
      project_end_date: e.selection.endDate.toString(),
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProjectForm({ ...projectForm, [id]: value });
  };

  const [editProject] = useMutation(EDIT_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [deleteDivision] = useMutation(DELETE_DIVISION);

  const handleButton = (e) => {
    props.handleSaveEditButton(projectForm);
    editProject({
      variables: {
        _id: projectForm._id,
        project_name: projectForm.project_name,
        project_description: projectForm.project_description,
        cancel: projectForm.cancel,
        project_start_date: projectForm.project_start_date,
        project_end_date: projectForm.project_end_date,
        picture: projectForm.picture,
        organization_id: props.organization_id,
      },
    });
    props.close();
  };

  const handleCloseModal = () => {
    props.close();
    setProjectForm(props.project);
  };

  const handleCancelModal = () => {
    setOpenCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handleCancel = () => {
    if (projectForm.cancel === true) {
      setProjectForm({
        ...projectForm,
        cancel: false,
      });
    } else {
      setProjectForm({
        ...projectForm,
        cancel: true,
      });
    }
  };

  const handleDelete = () => {
    deleteProject({ variables: { _id: props.project._id } });
    props.divisions.map((division) => {
      deleteDivision({ variables: { _id: division._id } });
      return null;
    });

    setNavigate(true);
  };

  const uploadImage = (e) => {
    setProjectForm({
      ...projectForm,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setProjectForm({
      ...projectForm,
      picture: " ",
    });
  };

  if (navigate) {
    return <Redirect push to="/project" />;
  }


  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="project-edit-modal"
      open={props.open}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth={false}
    >
      <DialogTitle title="Edit Project" onClose={() => handleCloseModal()} />
      <DialogContent style={fullScreen ? {} : { width: 700 }}>
        <form
          noValidate
          style={fullScreen ? {} : { display: "flex", flexDirection: "row" }}
        >
          <div
            className={classes.form}
            style={fullScreen ? {} : { width: "50%" }}
          >
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="project_name"
                label="Project Name"
                type="text"
                variant="outlined"
                value={projectForm.project_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="project_description"
                label="Description"
                type="text"
                variant="outlined"
                multiline
                rowsMax={9}
                value={projectForm.project_description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <EditImageForm
                uploadImage={uploadImage}
                removeImage={removeImage}
                picture={projectForm.picture}
                type="edit"
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              style={{ padding: '5px 0px' }}
            >
              <StatusBox
                style={{ width: 'auto' }}
                cancel={projectForm.cancel}
                start_date={projectForm.project_start_date}
                end_date={projectForm.project_end_date}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              style={{ display: "flex" }}
            >

              {projectForm.cancel === true ? (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCancelModal}
                >
                  Uncancel Project
                </Button>
              ) : (
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleCancelModal}
                  >
                    Cancel Project
                  </Button>
                )}
              <ConfirmationDialog
                type="Cancel"
                name={projectForm.project_name}
                content="Project"
                open={openCancelModal}
                handleConfirm={handleCancel}
                close={handleCloseCancelModal}
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
      <DialogActionsEdit
        validation={
          (
            projectForm.project_name === "" ||
            projectForm.project_description === "" ||
            projectForm.project_start_date === "" ||
            projectForm.project_end_date === ""
          ) ?
            ("invalid") : ("valid")
        }
        deleteButton={
          props.project_comitee.position_id === '1' ?
            false : true
        }
        content="Project"
        name={projectForm.project_name}
        submit={() => handleButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
}
