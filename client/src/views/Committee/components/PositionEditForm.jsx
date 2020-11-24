

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
  EDIT_COMMITTEE,
  DELETE_COMMITTEE,
} from 'gql';


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
  deleteBtn: {
    color: theme.palette.error.main
  }
}));


export default function PositionEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [positionForm, setPositionForm] = useState(props.position);

  React.useEffect(() => {
    setPositionForm(props.position)
  }, [setPositionForm, props.position]);

  const [deletePosition] = useMutation(DELETE_COMMITTEE);
  const [editPosition] = useMutation(EDIT_COMMITTEE);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(positionForm)
    // setPositionForm(intitialFormState);
    props.close();
    editPosition(
      {
        variables:
        {
          _id: positionForm._id,
          position_name: positionForm.position_name,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setPositionForm({ ...positionForm, [id]: value })
  }

  const handleDelete = () => {
    props.handleDeletePosition(props.position._id, props.index);
    // setPositionForm(intitialFormState);
    props.close();
    deletePosition({ variables: { _id: props.position._id, } });
  }

  const handleClose = () => {
    setPositionForm(props.position)
    props.close();
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle title="Edit Position" onClose={() => handleClose()} />
        <DialogContent style={{}}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="position_name"
                  label="Position Name"
                  type="text"
                  variant="outlined"
                  value={positionForm.position_name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActionsEdit
          validation={
            (
              positionForm.position_name === ""
            ) ?
              ("invalid") : ("valid")
          }
          content="Position"
          name={positionForm.position_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={props.close}
        />
      </Dialog>

    </div>
  );
};

