

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
  FormControl,
  MenuItem,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  DeleteForm
} from 'components';

const DELETE_COMITEE = gql`
mutation deleteComitee ($_id: String!) {
  deleteComitee(_id:$_id){
    _id
  }
}
`;

const EDIT_COMITEE = gql`
mutation editComitee(
  $_id: String!,
  $staff_id: String!,
  $division_id: String!,
  $position_id: String!,
  $project_id: String!,
  ){
  editComitee(
    _id: $_id,
    staff_id: $staff_id,
    division_id: $division_id,
    position_id:$position_id,
    project_id:$project_id,
  ){
    _id
    staff_id
    division_id
    position_id
    project_id
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



export default function ComiteeEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const [division_id, setDivision_id] = useState(props.comitee.division_id);
  const [position_id, setPosition_id] = useState(props.comitee.position_id);
  const [staff_id, setStaff_id] = useState(props.comitee.staff_id);

  const intitialFormState = {
    _id: props.comitee._id,
    staff_id: props.comitee.staff_id,
    position_id: props.comitee.position_id,
    division_id: props.comitee.division_id,
    project_id: props.comitee.project_id,
  }
  const [comiteeForm, setComiteeForm] = useState(intitialFormState);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteComitee] = useMutation(DELETE_COMITEE);
  const [editComitee] = useMutation(EDIT_COMITEE);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(comiteeForm)
    // setComiteeForm(intitialFormState);
    props.close();
    editComitee({
      variables:
      {
        _id: comiteeForm._id,
        staff_id: comiteeForm.staff_id,
        division_id: comiteeForm.division_id,
        position_id: comiteeForm.position_id,
        project_id: comiteeForm.project_id,
      }
    });
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    props.handleDeleteComitee(props.comitee._id);
    // setDivisionForm(intitialFormState);
    props.close();
    deleteComitee({ variables: { _id: props.comitee._id, } });
  }
  const handleChangeDivision = (event) => {
    comiteeForm.division_id = event.target.value;
    setDivision_id(event.target.value);
    setPosition_id("");
    comiteeForm.position_id = "";
  };

  const handleChangePosition = (event) => {
    comiteeForm.position_id = event.target.value;
    setPosition_id(event.target.value);
  };

  const handleCloseModal = () => {
    props.close();
    setComiteeForm(intitialFormState);
    setDivision_id(props.comitee.division_id);
    setPosition_id(props.comitee.position_id);
    setStaff_id(props.comitee.staff_id);
  }

  let checkComiteePositionId = [];
  props.comitees.map((comitee) =>
    props.positions.map((position) => {
      if (position._id === comitee.position_id
        && props.project_id === comitee.project_id
        && division_id === comitee.division_id
        && position._id !== "7"
      ) {
        checkComiteePositionId.push(position._id)
      } else {
        return null
      }
      return null
    })
  );

  let checkDivisionCore = [];
  props.divisions.map((division) => {
    if (division.division_name === "Core") {
      checkDivisionCore.push(division._id)
    }
    return null;
  }
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => handleCloseModal()}>
        Edit Comitee
        </DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                id="staff_id"
                size="small"
                select
                margin="dense"
                style={{ backgroundColor: 'white' }}
                label="Comitee Name"
                value={staff_id}
                disabled={true}
                variant="outlined"
              >
                {
                  props.staffs.map((staff) => {
                    return < MenuItem key={staff.staff_name} value={staff._id} >
                      {staff.staff_name}
                    </MenuItem>
                  })
                }
              </TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="division_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Division"
                  value={division_id}
                  onChange={handleChangeDivision}
                  variant="outlined"
                >
                  {props.divisions.map((division) => (
                    <MenuItem key={division.division_name} value={division._id}>
                      {division.division_name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="position_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Position"
                  value={position_id}
                  onChange={handleChangePosition}
                  variant="outlined"
                >
                  {
                    division_id === checkDivisionCore[0] ?
                      props.positions.map((position) => {
                        if (position.core === "true")
                          if (checkComiteePositionId.indexOf(position._id) > -1)
                            if (props.comitee.position_id === position._id)
                              return <MenuItem key={position.position_name} value={position._id}>
                                {position.position_name}
                              </MenuItem>
                            else
                              return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                          else
                            return <MenuItem key={position.position_name} value={position._id}>
                              {position.position_name}
                            </MenuItem>
                        else return null;
                      })
                      :
                      props.positions.map((position) => {
                        if (position.core === "false")
                          if (checkComiteePositionId.indexOf(position._id) > -1)
                            if (props.comitee.position_id === position._id)
                              return <MenuItem key={position.position_name} value={position._id}>
                                {position.position_name}
                              </MenuItem>
                            else
                              return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                          else
                            return <MenuItem key={position.position_name} value={position._id}>
                              {position.position_name}
                            </MenuItem>
                        else return null;
                      })
                  }
                </TextField>
              }
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" size="small" color="secondary" onClick={handleDeleteModal}>
          Delete
        </Button>
        <DeleteForm
          open={openDeleteModal}
          handleDelete={handleDelete}
          close={handleCloseDeleteModal}
        />
        {
          (comiteeForm._id === "" ||
            comiteeForm.staff_id === "" ||
            comiteeForm.position_id === "" ||
            comiteeForm.division_id === ""
          )
            ?
            < Button size="small" className={classes.iconbutton} disabled >Save</Button>
            :
            < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveEditButton()}>Save</Button>
        }
      </DialogActions>
    </Dialog>
  );
};

