

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
import { ADD_COMMITTEE } from 'gql';

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

export default function PositionAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    position_name: "",
    organization_id: props.decodedToken.organization_id,
  }

  const [positionForm, setPositionForm] = useState(intitialFormState);
  const [addPosition] = useMutation(ADD_COMMITTEE);
  const handleSaveButton = () => {
    props.handleSaveButton(positionForm)
    setPositionForm(intitialFormState);
    props.close();
    addPosition(
      {
        variables:
        {
          _id: positionForm._id,
          position_name: positionForm.position_name,
          organization_id: positionForm.organization_id,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setPositionForm({ ...positionForm, [id]: value })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title={"Add New Position"} onClose={props.close} />
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
      <DialogActionsAdd
        close={props.close}
        validation={
          (
            positionForm.position_name === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()} />
    </Dialog>
  );
};
