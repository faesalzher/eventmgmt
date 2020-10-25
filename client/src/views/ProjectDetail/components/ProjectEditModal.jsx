import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from "@material-ui/core/TextField";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Button,
  Dialog,
  Typography,
  Box,
  ButtonBase,
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
import AdjustIcon from "@material-ui/icons/Adjust";
import { Redirect } from "react-router";

import { CancelForm, EditImageForm } from "components";

import image from "assets/project.png";
// import imagesStyles from "assets/jss/material-kit-react/imagesStyles";

const EDIT_PROJECT = gql`
  mutation editProject(
    $_id: String!
    $project_name: String!
    $project_description: String!
    $cancel: String!
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
    // width: '50%',
    margin: theme.spacing(2),
    marginTop: 0,
    // marginRight: theme.spacing(0),
  },
  formControl: {
    // minWidth: 50
    width: "100%",
  },
  formDate: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(0),
    width: "100%",
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    width: "-webkit-fill-available",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 1
      }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function ProjectEditModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const today = new Date();

  const [projectForm, setProjectForm] = React.useState([]);
  const [openEditImageModal, setOpenEditImageModal] = useState(false);
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
    handleCloseModal();
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
    if (projectForm.cancel === "true") {
      setProjectForm({
        ...projectForm,
        cancel: "false",
      });
    } else {
      setProjectForm({
        ...projectForm,
        cancel: "true",
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

  const handleEditImageModal = () => {
    setOpenEditImageModal(true);
  };

  const handleCloseEditImageModal = () => {
    setOpenEditImageModal(false);
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
      picture: "null",
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
              <ButtonBase
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: image.width,
                }}
                component="span"
                onClick={handleEditImageModal}
              >
                <span
                  className={classes.imageSrc}
                  style={
                    projectForm.picture === 'null' ?
                      {
                        backgroundImage: `url(${image})`,
                      } :
                      {
                        backgroundImage: `url(${projectForm.picture})`,
                      }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    <PhotoCamera />
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <EditImageForm
                open={openEditImageModal}
                uploadImage={uploadImage}
                removeImage={removeImage}
                // handleDelete={handleDelete}
                close={handleCloseEditImageModal}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              style={{ display: "flex" }}
            >
              <div style={{ display: "flex", width: "100%", marginTop: 10 }}>
                <AdjustIcon className={classes.icon} />
                <div
                  className={classes.verticalAlign}
                  style={{ width: "100%" }}
                >
                  {projectForm.cancel === "true" ? (
                    <Box
                      borderRadius={4}
                      style={{
                        backgroundColor: "grey",
                        textAlign: "center",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <Typography variant="body2">Cancelled</Typography>
                    </Box>
                  ) : today < new Date(projectForm.project_start_date) ? (
                    <Box
                      borderRadius={4}
                      style={{
                        backgroundColor: "yellow",
                        textAlign: "center",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <Typography variant="body2">Planned</Typography>
                    </Box>
                  ) : today < new Date(projectForm.project_end_date) ? (
                    <Box
                      borderRadius={4}
                      style={{
                        backgroundColor: "green",
                        textAlign: "center",
                        width: "100%",
                        color: "white",
                      }}
                    >
                      <Typography variant="body2">Active</Typography>
                    </Box>
                  ) : (
                          <Box
                            borderRadius={4}
                            style={{
                              backgroundColor: "blue",
                              textAlign: "center",
                              width: "100%",
                              color: "white",
                            }}
                          >
                            <Typography variant="body2">Completed</Typography>
                          </Box>
                        )}
                </div>
              </div>
              {projectForm.cancel === "true" ? (
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
              <CancelForm
                title={projectForm.project_name}
                open={openCancelModal}
                handleCancel={handleCancel}
                close={handleCloseCancelModal}
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
        submit={() => handleButton()}
        delete={() => handleDelete()}
        close={()=>handleCloseModal()}
      />
    </Dialog>
  );
}
