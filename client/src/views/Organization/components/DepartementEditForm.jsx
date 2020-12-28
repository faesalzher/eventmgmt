

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_DEPARTEMENT,
  EDIT_DEPARTEMENT,
} from 'gql';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  formControl: {
    width: "100%"
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function DepartementEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: props.departement._id,
    departement_name: props.departement.departement_name,
    organization_id: props.organization_id
  }

  const [departementForm, setDepartementForm] = useState(intitialFormState);
  const [deleteDepartement] = useMutation(DELETE_DEPARTEMENT);
  const [editDepartement] = useMutation(EDIT_DEPARTEMENT);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(departementForm)
    // setDepartementForm(intitialFormState);
    props.close();
    editDepartement(
      {
        variables:
        {
          _id: departementForm._id,
          departement_name: departementForm.departement_name,
          organization_id: departementForm.organization_id
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDepartementForm({ ...departementForm, [id]: value })
  }
  console.log(departementForm)

  const handleDelete = () => {
    props.handleDeleteDepartement(props.departement._id, props.index);
    // setDepartementForm(intitialFormState);
    props.close();
    deleteDepartement({ variables: { _id: props.departement._id, } });
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
    if (props.departement.departement_name === departementForm.departement_name) {
      error = false;
    }
  })

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
        <DialogTitle title="Edit Departement" onClose={props.close} />
        <DialogContent dividers>
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
        <DialogActionsEdit
          validation={
            (
              departementForm.departement_name === "" ||
              error
            ) ?
              ("invalid") : ("valid")
          }
          content="Departement"
          name={departementForm.departement_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={() => handleCloseModal()}
        />
      </Dialog>

    </div>
  );
};

