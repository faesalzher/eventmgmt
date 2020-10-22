

import React, { useState } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
  Typography,
  IconButton,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { DateRange } from 'react-date-range';
import 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router';

import { DeleteForm } from "components";

const EDIT_ROADMAP = gql`
  mutation editRoadmap(
    $_id: String!,
    $roadmap_name: String!,
    $start_date: String!,
    $end_date: String!,
    $color:String!,
    $event_id:String!
    ) {
    editRoadmap(
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


const DELETE_ROADMAP = gql`
  mutation deleteRoadmap($_id: String!) {
    deleteRoadmap(_id: $_id) {
      _id
    }
  }
`;

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // width: '50%',
    margin: theme.spacing(2),
    marginTop: 0,
    // marginRight: theme.spacing(0),
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


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ textAlign: "center" }}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    // width: 700,
    // minWidth: 20
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



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

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [roadmapForm, setRoadmapForm] = useState({});
  const [navigate, setNavigate] = useState(false);

  React.useEffect(() => {
    setRoadmapForm(props.roadmap);
  }, [setRoadmapForm, props.roadmap]);

  const [date, setDate] = useState(initialDateRange);

  console.log(roadmapForm.start_date)
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

  const handleSaveButton = () => {
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
        }
      });
    // setRoadmapForm(intitialFormState);
    handleDeleteDate()
    props.close();
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    deleteRoadmap({ variables: { _id: roadmapForm._id } });
    setNavigate(true);
  };

  if (navigate) {
    return <Redirect push to={'/project/' + project_id + '/' + event_id} />;
  }


  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.onCloseListener}>
        Edit roadmap
        </DialogTitle>
      <DialogContent dividers style={fullScreen ? {} : { width: 700 }}>
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
      <DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={handleDeleteModal}
        >
          Delete Project
        </Button>
        <DeleteForm
          open={openDeleteModal}
          handleDelete={handleDelete}
          close={handleCloseDeleteModal}
        />
        {(roadmapForm.roadmap_name === "") ?
          < Button size="small" className={classes.iconbutton} disabled >Save</Button>
          :
          < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveButton()}>Save</Button>
        }
      </DialogActions>
    </Dialog>
  );
};

