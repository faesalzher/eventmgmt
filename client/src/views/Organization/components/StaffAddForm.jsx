

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';
import {
  useMutation,
} from '@apollo/react-hooks';
import validate from 'validate.js';
import { ADD_STAFF } from 'gql';


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

export default function StaffAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();


  const initialFormState = {
    _id: uuid(),
    staff_name: "",
    position_name: "",
    email: "",
    phone_number: "",
    password: "1234",
    picture: "",
    departement_id: "",
    organization_id: props.organization_id,
  }

  const defaultState = {
    isValid: false,
    values: initialFormState,
    touched: {},
    errors: {}
  };
  const [staffForm, setStaffForm] = useState(defaultState);
  const [departement_id, setDepartement_id] = useState("")
  const [addStaff] = useMutation(ADD_STAFF);

  const handleSaveButton = () => {
    props.handleSaveButton(staffForm.values)
    props.close();
    addStaff({
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
    setStaffForm(defaultState);
    setDepartement_id("");
  }

  useEffect(() => {
    const errors = validate(staffForm.values, schema);
    setStaffForm(staffForm => ({
      ...staffForm, isValid: errors ? false : true, errors: errors || {}
    }));
  }, [staffForm.values]);

  const handleInputChange = e => {
    const { id, value } = e.target;
    if (props.departement_id === "all") {

    } else {
      staffForm.values.departement_id = props.departement_id;
    }
    // setStaffForm({ ...staffForm, [id]: value })
    setStaffForm(staffForm => ({
      ...staffForm, values: {
        ...staffForm.values, [id]: value
      },
      touched: {
        ...staffForm.touched, [id]: true
      }
    }));
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    // staffForm.departement_id = event.target.value;
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
      <DialogTitle title="Add New Staff" onClose={props.close} />
      <DialogContent dividers >
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                
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
                props.departement_id === "all" ?
                  <TextField
                    id="departement_id"
                    select
                    size="small"
                    margin="dense"
                    
                    label="Departement"
                    value={departement_id}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                    // helperText="Please select your currency"
                    variant="outlined"
                  >
                    <option aria-label="None" value="" />
                    {props.departements.map((departement) => (
                      <option key={departement.departement_name} value={departement._id}>
                        {departement.departement_name}
                      </option>
                    ))}
                  </TextField>
                  :
                  <TextField
                    
                    margin="dense"
                    // id="departement"
                    label="Departement Name"
                    type="text"
                    variant="outlined"
                    disabled
                    value={props.departement_name[0].departement_name}
                  // onChange={handleInputChange}
                  />
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                
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
                
                margin="dense"
                id="password"
                disabled
                label="Password"
                type="text"
                variant="outlined"
                value={staffForm.values.password}
              // onChange={handleInputChange}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsAdd
        validation={
          (
            staffForm.values.staff_name === "" ||
            staffForm.values.departement_id === "" ||
            staffForm.values.position_name === "" ||
            staffForm.values.email === "" ||
            staffForm.values.phone_number === "" ||
            !staffForm.isValid
          ) ?
            ("invalid") : ("valid")
        }
        close={() => handleCloseModal()}
        submit={() => handleSaveButton()} />
    </Dialog>
  );
};

