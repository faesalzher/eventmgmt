

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';

import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { EditAvatarForm, ConfirmationDialog } from "components";

import validate from 'validate.js';
import { DELETE_STAFF, EDIT_STAFF, CHECK_STAFF } from 'gql';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

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
    email: props.staff.email,
    phone_number: props.staff.phone_number,
    password: props.staff.password,
    picture: props.staff.picture,
    is_admin: props.staff.is_admin,
    departement_position_id: props.staff.departement_position_id,
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
  const [staff, setStaff] = useState([])
  const [deleteStaff] = useMutation(DELETE_STAFF);
  const [editStaff] = useMutation(EDIT_STAFF);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const { data: dataStaff, loading: loadingStaff, error: errorStaff, refetch: refetchStaff } = useQuery(CHECK_STAFF,
    {
      variables: { email: staffForm.values.email, },
    });

  useEffect(() => {
    const onCompleted = (dataStaff) => { setStaff(dataStaff.check_staff) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loadingStaff && !errorStaff) {
        onCompleted(dataStaff);
      } else if (onError && !loadingStaff && errorStaff) {
        onError(errorStaff);
      }
    }
  }, [loadingStaff, dataStaff, errorStaff]);

  React.useEffect(() => {
    refresh();
  });
  const refresh = () => {
    refetchStaff();
  };

  const handleConfirmationModal = () => {
    setOpenConfirmationModal(true);
  }

  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };



  useEffect(() => {
    const errors = validate(staffForm.values, schema);
    if (staff.length !== 0 && staffForm.values.email !== props.staff.email) {
      setStaffForm(staffForm => ({
        ...staffForm, isValid: false, errors: { ...staffForm.errors, email: ["Email already registered"] } || {}
      }));
      // handleError();
    } else {
      setStaffForm(staffForm => ({
        ...staffForm, isValid: errors ? false : true, errors: errors || {}
      }));
    }
  }, [staffForm.values, staff.length, props.staff.email]);

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
    const { name, value } = event.target;

    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, [name]: value
      },
      touched: {
        ...staffForm.touched, [name]: true
      }
    }));
  };

  const uploadImage = (e) => {
    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, picture: e
      },
    }));
  };


  const removeImage = (e) => {
    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, picture: " "
      },
    }));
  };

  const handleCloseModal = e => {
    props.close();
    setStaffForm(defaultState)
  }

  const handleReset = e => {
    const password = '12345678'
    bcrypt.hash(password, saltRounds, function (err, hash) {
      setStaffForm(staffForm => ({
        ...staffForm, values: {
          ...staffForm.values, password: hash
        },
      }));
    });
  }

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(staffForm.values)
    // setStaffForm(intitialFormState);
    props.close();
    editStaff({
      variables:
      {
        _id: staffForm.values._id,
        staff_name: staffForm.values.staff_name,
        departement_position_id: staffForm.values.departement_position_id,
        email: staffForm.values.email,
        phone_number: staffForm.values.phone_number,
        password: staffForm.values.password,
        picture: staffForm.values.picture,
        is_admin: staffForm.values.is_admin,
        departement_id: staffForm.values.departement_id,
        organization_id: staffForm.values.organization_id,
      }
    });
  }

  const hasError = field =>
    staffForm.touched[field] && staffForm.errors[field] ? true : false;

  const isDepartementNull = props.departements.length === 0 ? true : false;
  const isDepartementPositionsNull = props.departementPositions.length === 0 ? true : false;
  const isMeIsAdmin = staffForm.values._id === props.decodedToken.staff_id ? true : false;

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title="Edit Staff" onClose={props.close} />
      <DialogContent dividers style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: "row" }} >
          <FormControl style={fullScreen ?
            { width: '100%', padding: 17 } :
            { width: '50%', padding: 17, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <EditAvatarForm
              uploadImage={uploadImage}
              picture={staffForm.values.picture}
              removeImage={removeImage}
              size={200}
            />
          </FormControl>
          <div className={classes.form} style={fullScreen ? {} : { width: "50%" }} >
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
                  name="departement_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Departement"
                  disabled={isDepartementNull}
                  value={staffForm.values.departement_id}
                  onChange={handleChange}
                  helperText={isDepartementNull ? "there is no departements yet, please add one" : ""}
                  variant="outlined"
                >

                  {props.departements.map((departement) => (
                    <MenuItem key={departement.departement_name} value={departement._id}>
                      {departement.departement_name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="departement_position_id"
                label="Position Name"
                select
                variant="outlined"
                disabled={isDepartementPositionsNull}
                value={staffForm.values.departement_position_id}
                helperText={isDepartementPositionsNull ? "there is no positions yet, please add one" : ""}
                onChange={handleChange}
              >
                {props.departementPositions.map((departementPosition) => (
                  <MenuItem key={departementPosition.departement_position_name} value={departementPosition._id}>
                    {departementPosition.departement_position_name}
                  </MenuItem>
                ))}
              </TextField>
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
                name="is_admin"
                select
                size="small"
                margin="dense"
                label="Admin"
                disabled={isMeIsAdmin}
                value={staffForm.values.is_admin}
                onChange={handleChange}
                helperText={isMeIsAdmin ? "" : "Choose wheter this staff is going to be an admin or not"}
                variant="outlined"
              >
                <MenuItem key={0} value={false}>
                  No
                  </MenuItem>
                <MenuItem key={1} value={true}>
                  Yes
                  </MenuItem>
              </TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
              {/* <TextField
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
              /> */}
              < Button size="small" variant="outlined" color="secondary" onClick={handleConfirmationModal}>Reset Password</Button>
              <ConfirmationDialog
                content={"Password"}
                type="reset"
                name={"password of " + staffForm.values.staff_name}
                open={openConfirmationModal}
                handleConfirm={handleReset}
                close={handleCloseConfirmationModal}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            (staffForm.values.staff_name === "" ||
              staffForm.values.departement_id === "" ||
              staffForm.values.departement_position_id === "" ||
              staffForm.values.email === "" ||
              staffForm.values.phone_number === "" ||
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
        deleteButton={!isMeIsAdmin}
      />
    </Dialog >
  );
};

