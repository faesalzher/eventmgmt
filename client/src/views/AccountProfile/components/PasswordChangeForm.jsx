

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import validate from 'validate.js';

const bcrypt = require('bcryptjs');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

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

const schema = {
  new_password: {
    // presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 8
    }
  },
  confirm_new_password: {
    // presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
};

export default function PasswordChangeForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    // _id: '1',
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  }

  const defaultState = {
    isValid: false,
    values: intitialFormState,
    touched: {},
    errors: {}
  };
  const [passwordForm, setPasswordForm] = useState(defaultState);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);


  useEffect(() => {
    const errors = validate(passwordForm.values, schema);

    bcrypt.compare(passwordForm.values.old_password, props.profile.password, function (err, result) {
      if (!result) {
        setPasswordForm(passwordForm => ({
          ...passwordForm, isValid: false, errors: { ...errors, ...passwordForm.errors, old_password: ["Did not match old password "] } || {}
        }));
      }
    });
    if (passwordForm.values.new_password !== passwordForm.values.confirm_new_password) {
      setPasswordForm(passwordForm => ({
        ...passwordForm, isValid: false, errors: { ...errors, confirm_new_password: ["Confirm password did not match "] } || {}
      }));
    } else {
      setPasswordForm(passwordForm => ({
        ...passwordForm, isValid: errors ? false : true, errors: errors || {}
      }));
    }
  }, [passwordForm.values, props.profile.password]);
  console.log(passwordForm)
  const handleInputChange = e => {
    const { id, value } = e.target;
    // setPasswordForm({ ...passwordForm.values, [id]: value })
    setPasswordForm(passwordForm => ({
      ...passwordForm, values: {
        ...passwordForm.values, [id]: value
      },
      touched: {
        ...passwordForm.touched, [id]: true
      }
    }));
  }

  const handleSaveEditButton = () => {
    bcrypt.hash(passwordForm.values.new_password, saltRounds, function (err, hash) {
      props.handleSaveEditPasswordButton(hash)
    });
    props.close();
  }
  const hasError = field =>
    passwordForm.touched[field] && passwordForm.errors[field] ? true : false;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle title="Change Password" onClose={props.close} />
        <DialogContent dividers style={{}}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="old_password"
                  label="Old Password"
                  type="password"
                  variant="outlined"
                  value={passwordForm.values.old_password}
                  onChange={handleInputChange}
                  error={hasError('old_password')}
                  helperText={
                    hasError('old_password') ? passwordForm.errors.old_password[0] : null
                  }
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="new_password"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={passwordForm.values.new_password}
                  onChange={handleInputChange}
                  error={hasError('new_password')}
                  helperText={hasError('new_password') ? passwordForm.errors.new_password[0] : null}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="confirm_new_password"
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  value={passwordForm.values.confirm_new_password}
                  onChange={handleInputChange}
                  error={hasError('confirm_new_password')}
                  helperText={
                    hasError('confirm_new_password') ? passwordForm.errors.confirm_new_password : null
                  }
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActionsAdd
          validation={
            // passwordForm.values.new_password !== passwordForm.values.confirm_new_password
            passwordForm.isValid
              ?
              ("valid") : ("invalid")
          }
          close={() => props.close()}
          submit={() => handleSaveEditButton()} />
      </Dialog>
    </div>
  );
};

