

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
  DELETE_DEPARTEMENT_POSITION,
  EDIT_DEPARTEMENT_POSITION,
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

export default function DepartementPositionEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: props.departementPosition._id,
    departement_position_name: props.departementPosition.departement_position_name,
    organization_id:  props.departementPosition.organization_id
  }
  const [departementPositionForm, setDepartementPositionForm] = useState(intitialFormState);
  const [deleteDepartementPosition] = useMutation(DELETE_DEPARTEMENT_POSITION);
  const [editDepartementPosition] = useMutation(EDIT_DEPARTEMENT_POSITION);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(departementPositionForm)
    // setDepartementPositionForm(intitialFormState);
    props.close();
    editDepartementPosition(
      {
        variables:
        {
          _id: departementPositionForm._id,
          departement_position_name: departementPositionForm.departement_position_name,
          organization_id: departementPositionForm.organization_id
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDepartementPositionForm({ ...departementPositionForm, [id]: value })
  }


  const handleDelete = () => {
    props.handleDeleteDepartementPosition(departementPositionForm._id, props.index);
    // setDepartementPositionForm(intitialFormState);
    props.close();
    deleteDepartementPosition({ variables: { _id: departementPositionForm._id, } });
  }

  const handleCloseModal = e => {
    props.close();
    setDepartementPositionForm(intitialFormState)
  }

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
        <DialogTitle title="Edit DepartementPosition" onClose={props.close} />
        <DialogContent dividers>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="departement_position_name"
                  label="DepartementPosition Name"
                  type="text"
                  variant="outlined"
                  value={departementPositionForm.departement_position_name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActionsEdit
          validation={
            (
              departementPositionForm.departementPosition_name === ""
            ) ?
              ("invalid") : ("valid")
          }
          content="DepartementPosition"
          name={departementPositionForm.departement_position_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={() => handleCloseModal()}
        />
      </Dialog>

    </div>
  );
};

