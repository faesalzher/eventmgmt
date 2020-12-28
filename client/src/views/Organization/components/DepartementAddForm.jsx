

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';

import { useMutation } from '@apollo/react-hooks';
import { ADD_DEPARTEMENT } from 'gql';

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


export default function DepartementAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    departement_name: "",
    organization_id: props.organization_id
  }
  console.log(props.organization_id)

  const [departementForm, setDepartementForm] = useState(intitialFormState);
  const [addDepartement] = useMutation(ADD_DEPARTEMENT);

  const handleSaveButton = () => {
    props.handleSaveButton(departementForm)
    setDepartementForm(intitialFormState);
    props.close();
    addDepartement(
      {
        variables:
        {
          _id: departementForm._id,
          departement_name: departementForm.departement_name,
          organization_id: departementForm.organization_id,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDepartementForm({ ...departementForm, [id]: value })
  }

  const handleCloseModal = e => {
    props.close();
    setDepartementForm(intitialFormState)
  }

  let error = false;
  props.departements.forEach((departement) => {
    if (departement.departement_name === departementForm.departement_name) {
      error = true;
    }
  })

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title="Add New Departement" onClose={props.close} />
      <DialogContent dividers >
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                error={error}
                helperText={error ? "Departement already created" : ""}
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="departement_name"
                label="Departement Name"
                type="text"
                variant="outlined"
                value={departementForm.departement_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsAdd
        validation={
          (
            departementForm.departement_name === "" ||
            error
          ) ?
            ("invalid") : ("valid")
        }
        close={() => handleCloseModal()}
        submit={() => handleSaveButton()} />
    </Dialog >
  );
};

