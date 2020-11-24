import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Dialog,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import FormControl from "@material-ui/core/FormControl";
import {
  EDIT_PROJECT,
  EXTERNALS_QUERY_BY_PROJECT,
  AGENDAS_QUERY_BY_PROJECT,
  ROADMAPS_QUERY_BY_PROJECT,
  TASKS_QUERY_BY_PROJECT,
  TASK_ASSIGNED_TOS_QUERY_BY_PROJECT,
  DELETE_PROJECT,
  DELETE_EVENT,
  DELETE_PERSON_IN_CHARGE,
  DELETE_ROADMAP,
  DELETE_EXTERNAL,
  DELETE_AGENDA,
  DELETE_TASK,
  DELETE_TASK_ASSIGNED_TO,
} from 'gql';
import "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StatusBox } from 'components';
import { Redirect } from "react-router";

import { ConfirmationDialog, EditImageForm } from "components";

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
  const [deletePersonInCharge] = useMutation(DELETE_PERSON_IN_CHARGE);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [deleteRoadmap] = useMutation(DELETE_ROADMAP);
  const [deleteExternal] = useMutation(DELETE_EXTERNAL);
  const [deleteAgenda] = useMutation(DELETE_AGENDA);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [deleteTaskAssignedTo] = useMutation(DELETE_TASK_ASSIGNED_TO);


  const handleButton = (e) => {
    props.handleSaveEditButton(projectForm);
    editProject({
      variables: {
        _id: projectForm._id,
        project_name: projectForm.project_name,
        project_description: projectForm.project_description,
        project_start_date: projectForm.project_start_date,
        project_end_date: projectForm.project_end_date,
        picture: projectForm.picture,
        created_at: projectForm.created_at,
        organization_id: props.organization_id,
      },
    });
    props.close();
  };

  const handleCloseModal = () => {
    props.close();
    setProjectForm(props.project);
  };

  const { data: roadmapsData, refetch: roadmapsRefetch } = useQuery(ROADMAPS_QUERY_BY_PROJECT,
    { variables: { project_id: props.project_id }, }
  )
  const { data: externalsData, refetch: externalsRefetch } = useQuery(EXTERNALS_QUERY_BY_PROJECT,
    { variables: { project_id: props.project_id }, }
  )
  const { data: agendasData, refetch: agendasRefetch } = useQuery(AGENDAS_QUERY_BY_PROJECT,
    { variables: { project_id: props.project_id }, }
  )

  const { data: tasksData, refetch: tasksRefetch } = useQuery(TASKS_QUERY_BY_PROJECT,
    { variables: { project_id: props.project_id }, }
  )

  const { data: taskAssignedTosData, refetch: taskAssignedTosRefetch } = useQuery(TASK_ASSIGNED_TOS_QUERY_BY_PROJECT,
    { variables: { project_id: props.project_id }, }
  )

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    roadmapsRefetch();
    externalsRefetch();
    agendasRefetch();
    tasksRefetch();
    taskAssignedTosRefetch();
  };


  const handleDelete = () => {

    //delete task_assogned_to
    taskAssignedTosData.task_assigned_tos.forEach((taskAssignedTo) => {
      deleteTaskAssignedTo({ variables: { _id: taskAssignedTo._id } })
    })

    //delete task
    tasksData.tasks.forEach((task) => {
      deleteTask({ variables: { _id: task._id } })
    })

    //delete agenda
    agendasData.agendas.forEach((agenda) => {
      deleteAgenda({ variables: { _id: agenda._id } })
    })
    //delete external
    externalsData.externals.forEach((external) => {
      deleteExternal({ variables: { _id: external._id } })
    })

    //delete roadmaps
    roadmapsData.roadmaps.forEach((roadmap) => {
      deleteRoadmap({ variables: { _id: roadmap._id } })
    })

    //delete event
    props.events.forEach((event) => {
      deleteEvent({ variables: { _id: event._id, } });
    })

    //delete Person In Charge
    props.personInCharges.forEach((personInCharge) => {
      deletePersonInCharge({ variables: { _id: personInCharge._id, } });
    })

    //delete project
    deleteProject({ variables: { _id: props.project._id } });

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
                start_date={projectForm.project_start_date}
                end_date={projectForm.project_end_date}
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
          props.project_personInCharge.position_id === '1'
            || props.decodedToken.user_type === 'organization' ?
            true : false
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
