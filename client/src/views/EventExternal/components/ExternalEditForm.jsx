

import React, { useState } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  DeleteForm
} from 'components';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // width: '50%',
    margin: theme.spacing(2),
    marginTop: 0,
    // marginRight: theme.spacing(0),
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


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ textAlign: "center" }}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    // width: 700,
    // minWidth: 20
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



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
  }
  const [externalForm, setExternalForm] = useState(intitialFormState);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(externalForm)
    // setExternalForm(intitialFormState);
    props.close();
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setExternalForm({ ...externalForm, [id]: value })
  }

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    props.handleDelete(props.external._id);
    props.close();
    // deleteComitee({ variables: { _id: props.comitee._id, } });
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
      <DialogTitle id="customized-dialog-title" onClose={props.close}>
        Edit {props.type}
      </DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
        <form noValidate >
          <div >
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
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" size="small" color="secondary" onClick={handleDeleteModal}>
          Delete {props.type}
        </Button>
        <DeleteForm
          open={openDeleteModal}
          handleDelete={handleDelete}
          close={handleCloseDeleteModal}
        />
        {(externalForm.external_name === "" ||
          externalForm.email === "" ||
          externalForm.phone_number === "" ||
          externalForm.details === "") ?
          < Button size="small" className={classes.iconbutton} disabled >Save</Button>
          :
          < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveEditButton()}>Save</Button>
        }
      </DialogActions>
    </Dialog>
  );
};

