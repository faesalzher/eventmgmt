

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
  EditImageForm,
  EditAvatarForm,
} from 'components';
import { EDIT_EXTERNAL, DELETE_EXTERNAL } from 'gql';

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


export default function ExternalEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const intitialFormState = {
    _id: props.external._id,
    external_name: props.external.external_name,
    external_type: props.external.external_type,
    event_id: props.external.event_id,
    email: props.external.email,
    phone_number: props.external.phone_number,
    details: props.external.phone_number,
    picture: props.external.picture,
    project_id: props.external.project_id,
  }
  const [externalForm, setExternalForm] = useState(intitialFormState);

  const [editExternal] = useMutation(EDIT_EXTERNAL);
  const [deleteExternal] = useMutation(DELETE_EXTERNAL);

  const handleSaveEditButton = () => {
    // setExternalForm(intitialFormState);
    setTimeout(() => {
      props.handleSaveEditButton(externalForm)
      props.close();
      editExternal(
        {
          variables:
          {
            _id: externalForm._id,
            external_name: externalForm.external_name,
            external_type: externalForm.external_type,
            email: externalForm.email,
            phone_number: externalForm.phone_number,
            details: externalForm.details,
            picture: externalForm.picture,
            event_id: externalForm.event_id,
            project_id: externalForm.project_id,
          }
        });
      // setExternalForm(initialFormState);
    }, 400);
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setExternalForm({ ...externalForm, [id]: value })
  }

  const handleDelete = () => {
    props.handleDelete(props.external._id);
    deleteExternal({ variables: { _id: props.external._id } });
    props.close();
  }

  const uploadImage = (e) => {
    setExternalForm({
      ...externalForm,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setExternalForm({
      ...externalForm,
      picture: ' ',
    });
  };

  const handleCloseModal = () => {
    props.close();
  }
  console.log(externalForm)
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title={"Edit " + props.type} onClose={() => handleCloseModal()} />
      <DialogContent style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: "row" }}>
          {props.type === "Volunteer" || props.type === "Guest" ?
            <FormControl style={fullScreen ?
              { width: '100%', padding: 17 } :
              { width: '50%', padding: '0px 17px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <EditAvatarForm
                uploadImage={uploadImage}
                picture={externalForm.picture}
                removeImage={removeImage}
                size={170}
              />
            </FormControl>
            :
            <FormControl style={fullScreen ? { width: '100%', padding: 17, } : { width: '50%', padding: 17 }}>
              <EditImageForm
                uploadImage={uploadImage}
                picture={externalForm.picture}
                removeImage={removeImage}
              // handleDelete={handleDelete}
              />
            </FormControl>
          }
          <div className={classes.form} style={fullScreen ? {} : { width: "50%" }}  >
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="external_name"
                label={props.type + " Name"}
                type="text"
                variant="outlined"
                value={externalForm.external_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="email"
                label="Email"
                type="text"
                variant="outlined"
                value={externalForm.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="phone_number"
                label="Phone Number"
                type="text"
                variant="outlined"
                value={externalForm.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                style={{ backgroundColor: 'white' }}
                margin="dense"
                id="details"
                label="Details"
                type="text"
                variant="outlined"
                value={externalForm.details}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>

        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            externalForm.external_name === "" ||
            externalForm.email === "" ||
            externalForm.phone_number === "" ||
            externalForm.details === ""
          ) ?
            ("invalid") : ("valid")
        }
        content="External"
        name={externalForm.external_name}
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
};

