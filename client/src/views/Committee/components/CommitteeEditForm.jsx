

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


export default function CommitteeEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [committeeForm, setCommitteeForm] = useState(props.committee);

  React.useEffect(() => {
    setCommitteeForm(props.committee)
  }, [setCommitteeForm, props.committee]);

  const [deleteCommittee] = useMutation(DELETE_COMMITTEE);
  const [editCommittee] = useMutation(EDIT_COMMITTEE);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(committeeForm)
    // setCommitteeForm(intitialFormState);
    props.close();
    editCommittee(
      {
        variables:
        {
          _id: committeeForm._id,
          committee_name: committeeForm.committee_name,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setCommitteeForm({ ...committeeForm, [id]: value })
  }

  const handleDelete = () => {
    props.handleDeleteCommittee(props.committee._id, props.index);
    // setCommitteeForm(intitialFormState);
    props.close();
    deleteCommittee({ variables: { _id: props.committee._id, } });
  }

  const handleClose = () => {
    setCommitteeForm(props.committee)
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
        <DialogTitle title="Edit Committee" onClose={() => handleClose()} />
        <DialogContent style={{}}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
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
        <DialogActionsEdit
          validation={
            (
              committeeForm.committee_name === ""
            ) ?
              ("invalid") : ("valid")
          }
          content="Committee"
          name={committeeForm.committee_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={props.close}
        />
      </Dialog>

    </div>
  );
};

