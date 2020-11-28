

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
import { ADD_DEPARTEMENT_POSITION } from 'gql';

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


export default function DepartementPositionAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    departement_position_name: "",
    organization_id: props.decodedToken.organization_id
  }
  const [departementPositionForm, setDepartementPositionForm] = useState(intitialFormState);
  const [addDepartementPosition] = useMutation(ADD_DEPARTEMENT_POSITION);

  const handleSaveButton = () => {
    props.handleSaveButton(departementPositionForm)
    setDepartementPositionForm(intitialFormState);
    props.close();
    addDepartementPosition(
      {
        variables:
        {
          _id: departementPositionForm._id,
          departement_position_name: departementPositionForm.departement_position_name,
          organization_id: departementPositionForm.organization_id,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDepartementPositionForm({ ...departementPositionForm, [id]: value })
  }

  const handleCloseModal = e => {
    props.close();
    setDepartementPositionForm(intitialFormState)
  }

console.log(departementPositionForm)
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title="Add New departementPosition" onClose={props.close} />
      <DialogContent dividers >
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="departement_position_name"
                label="Position Name"
                type="text"
                variant="outlined"
                value={departementPositionForm.departement_position_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsAdd
        validation={
          (
            departementPositionForm.departement_position_name === ""
          ) ?
            ("invalid") : ("valid")
        }
        close={() => handleCloseModal()}
        submit={() => handleSaveButton()} />
    </Dialog >
  );
};

