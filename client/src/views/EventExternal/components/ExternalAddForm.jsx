

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
} from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';
import { EditImageForm,EditAvatarForm } from "components";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
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



export default function ExternalAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    external_name: "",
    external_type: props.type,
    event_id: props.event_id,
    email: "",
    phone_number: "",
    details: "",
    picture: " ",
  }

  const [externalForm, setExternalForm] = useState(intitialFormState);

  const handleSaveButton = () => {
    props.handleSaveButton(externalForm)
    setExternalForm(intitialFormState);
    props.close();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setExternalForm({ ...externalForm, [id]: value })
  }

  const uploadImage = (e) => {
    setExternalForm({
      ...externalForm,
      picture: e,
    });
  };

  const handleCloseModal = () => {
    props.close();
  }
  
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={false}
    >
      <DialogTitle title={"Add New " + props.type} onClose={() => handleCloseModal()} />
      <DialogContent style={fullScreen ? {} : { width: 700 }}>
        <form noValidate style={fullScreen ? {} : { display: "flex", flexDirection: "row" }}>
        {props.type === "Volunteer" || props.type === "Guest" ?
            <FormControl style={fullScreen ?
              { width: '100%', padding: 17} :
              { width: '50%', padding: 17, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              <EditAvatarForm
                uploadImage={uploadImage}
                picture={externalForm.picture}
                size={170}
              />
            </FormControl>
            :
            <FormControl style={fullScreen ? 
            { width: '100%', padding: 17} :
             { width: '50%', padding: 17 }}>
              <EditImageForm
                uploadImage={uploadImage}
                picture={externalForm.picture}
              // handleDelete={handleDelete}
              />
            </FormControl>
          }
          <div className={classes.form} style={fullScreen ? {} : { width: "50%" }} >
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
      <DialogActionsAdd
        validation={
          (
            externalForm.external_name === "" ||
            externalForm.email === "" ||
            externalForm.phone_number === "" ||
            externalForm.details === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
};

