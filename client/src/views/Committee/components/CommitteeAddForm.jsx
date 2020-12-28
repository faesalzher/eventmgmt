

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

export default function CommitteeAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    committee_name: "",
    core: false,
    organization_id: props.decodedToken.organization_id,
  }

  const [committeeForm, setCommitteeForm] = useState(intitialFormState);
  const [addCommittee] = useMutation(ADD_COMMITTEE);
  const handleSaveButton = () => {
    props.handleSaveButton(committeeForm)
    setCommitteeForm(intitialFormState);
    props.close();
    addCommittee(
      {
        variables:
        {
          _id: committeeForm._id,
          committee_name: committeeForm.committee_name,
          core: committeeForm.core,
          organization_id: committeeForm.organization_id,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setCommitteeForm({ ...committeeForm, [id]: value })
  }

  let error = false;
  props.committees.forEach((committee) => {
    if (committee.committee_name === committeeForm.committee_name) {
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
      <DialogTitle title={"Add New Committee"} onClose={props.close} />
      <DialogContent style={{}}>
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                error={error}
                helperText={error ? "Committee already created" : ""}
                margin="dense"
                id="committee_name"
                label="Committee Name"
                type="text"
                variant="outlined"
                value={committeeForm.committee_name}
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
            committeeForm.committee_name === "" ||
            error
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()} />
    </Dialog>
  );
};

