

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
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  DeleteForm
} from 'components';

const DELETE_STAFF = gql`
mutation deleteStaff ($_id: String!) {
  deleteStaff(_id:$_id){
    _id
  }
}
`;

const EDIT_STAFF = gql`
  mutation editStaff(
    $_id: String!,
    $staff_name: String!,
    $position_name: String!,
    $email: String!,
    $phone_number: String!,
    $password: String!,
    $picture: String!,
    $departement_id: String!,
    ){
    editStaff(
      _id: $_id,
      staff_name: $staff_name,
      position_name: $position_name,
      email:$email,
      phone_number:$phone_number,
      password:$password,
      picture:$picture,
      departement_id:$departement_id,
    ){
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
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



export default function StaffEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const intitialFormState = {
    _id: props.staff._id,
    staff_name: props.staff.staff_name,
    position_name: props.staff.position_name,
    email: props.staff.email,
    phone_number: props.staff.phone_number,
    password: props.staff.password,
    picture: props.staff.picture,
    departement_id: props.staff.departement_id,
  }
  const [staffForm, setStaffForm] = useState(intitialFormState);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [departement_id, setDepartement_id] = useState(props.staff.departement_id)

  const [deleteStaff] = useMutation(DELETE_STAFF);
  const [editStaff] = useMutation(EDIT_STAFF);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(staffForm)
    // setStaffForm(intitialFormState);
    props.close();
    editStaff({
      variables:
      {
        _id: staffForm._id,
        staff_name: staffForm.staff_name,
        position_name: staffForm.position_name,
        email: staffForm.email,
        phone_number: staffForm.phone_number,
        password: staffForm.password,
        picture: staffForm.picture,
        departement_id: staffForm.departement_id,
      }
    });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setStaffForm({ ...staffForm, [id]: value })
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    props.handleDeleteStaff(props.staff._id);
    // setDepartementForm(intitialFormState);
    props.close();
    deleteStaff({ variables: { _id: props.staff._id, } });
  }
  const handleChange = (event) => {
    staffForm.departement_id = event.target.value;
    setDepartement_id(event.target.value);
  };
  console.log(departement_id)

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.close}>
        Edit Staff
        </DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="staff_name"
                label="Staff Name"
                type="text"
                variant="outlined"
                value={staffForm.staff_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="departement_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Departement"
                  value={departement_id}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  // helperText="Please select your currency"
                  variant="outlined"
                >
                  {props.departements.map((departement) => (
                    <option key={departement.departement_name} value={departement._id}>
                      {departement.departement_name}
                    </option>
                  ))}
                </TextField>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="position_name"
                label="Position Name"
                type="text"
                variant="outlined"
                value={staffForm.position_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="email"
                label="Email"
                type="text"
                variant="outlined"
                value={staffForm.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="phone_number"
                label="Phone Number"
                type="text"
                variant="outlined"
                value={staffForm.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="password"
                label="Password"
                variant="outlined"
                disabled
                value={staffForm.password}
                onChange={handleInputChange}
                type="password"
                autoComplete="current-password"
              />
              < Button size="small" style={{ color: 'blue' }}>Reset Password</Button>
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
          (staffForm.staff_name === "" ||
            staffForm.departement_id === "" ||
            staffForm.position_name === "" ||
            staffForm.email === "" ||
            staffForm.phone_number === ""
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

