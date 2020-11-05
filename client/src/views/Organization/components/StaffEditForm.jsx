

import React, { useState,useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';

import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import validate from 'validate.js';

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
    $organization_id: String!,
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
      organization_id:$organization_id,
    ){
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
      organization_id
    }
  }
`;
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


const schema = {
  email: {
    // presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
};

export default function StaffEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const initialFormState = {
    _id: props.staff._id,
    staff_name: props.staff.staff_name,
    position_name: props.staff.position_name,
    email: props.staff.email,
    phone_number: props.staff.phone_number,
    password: props.staff.password,
    picture: props.staff.picture,
    departement_id: props.staff.departement_id,
    organization_id: props.organization_id
  }

  const defaultState = {
    isValid: false,
    values: initialFormState,
    touched: {},
    errors: {}
  };

  const [staffForm, setStaffForm] = useState(defaultState);
  const [departement_id, setDepartement_id] = useState(props.staff.departement_id)

  const [deleteStaff] = useMutation(DELETE_STAFF);
  const [editStaff] = useMutation(EDIT_STAFF);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(staffForm.values)
    // setStaffForm(intitialFormState);
    props.close();
    editStaff({
      variables:
      {
        _id: staffForm.values._id,
        staff_name: staffForm.values.staff_name,
        position_name: staffForm.values.position_name,
        email: staffForm.values.email,
        phone_number: staffForm.values.phone_number,
        password: staffForm.values.password,
        picture: staffForm.values.picture,
        departement_id: staffForm.values.departement_id,
        organization_id: staffForm.values.organization_id,
      }
    });
  }

  useEffect(() => {
    const errors = validate(staffForm.values, schema);
    setStaffForm(staffForm => ({
      ...staffForm, isValid: errors ? false : true, errors: errors || {}
    }));
  }, [staffForm.values]);

  const handleInputChange = e => {
    const { id, value } = e.target;
    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, [id]: value
      },
      touched: {
        ...staffForm.touched, [id]: true
      }
    }));
  }

  const handleDelete = () => {
    props.handleDeleteStaff(props.staff._id);
    // setDepartementForm(intitialFormState);
    props.close();
    deleteStaff({ variables: { _id: props.staff._id, } });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    setDepartement_id(event.target.value);
    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, [id]: value
      },
      touched: {
        ...staffForm.touched, [id]: true
      }
    }));
  };

  const handleCloseModal = e => {
    props.close();
    setStaffForm(defaultState)
  }

  console.log(staffForm.values)
  const hasError = field =>
  staffForm.touched[field] && staffForm.errors[field] ? true : false;

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title="Edit Staff" onClose={props.close} />
      <DialogContent dividers>
        <form noValidate >
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="staff_name"
                label="Staff Name"
                type="text"
                variant="outlined"
                value={staffForm.values.staff_name}
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
                value={staffForm.values.position_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="email"
                error={hasError('email')}
                helperText={
                  hasError('email') ? staffForm.errors.email[0] : null
                }
                label="Email"
                type="text"
                variant="outlined"
                value={staffForm.values.email || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="phone_number"
                label="Phone Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={staffForm.values.phone_number}
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
                value={staffForm.values.password}
                onChange={handleInputChange}
                type="password"
                autoComplete="current-password"
              />
              < Button size="small" variant="outlined" color="secondary">Reset Password</Button>
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            (staffForm.values.staff_name === "" ||
              staffForm.values.departement_id === "" ||
              staffForm.values.position_name === "" ||
              staffForm.values.email === "" ||
              staffForm.values.phone_number === ""||
              !staffForm.isValid
            )
          ) ?
            ("invalid") : ("valid")
        }
        content="Staff"
        name={staffForm.values.staff_name}
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
};

