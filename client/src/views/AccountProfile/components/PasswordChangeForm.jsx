

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

// import { useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';

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
    backgroundColor: theme.palette.primary.main,
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
      <Typography variant="h6" style={{ textAlign: "center", color:"white" }}>{children}</Typography>
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
    padding: '10px 16px',
  },
}))(MuiDialogActions);


export default function PasswordChangeForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: '1',
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  }
  const [passwordForm, setPasswordForm] = useState(intitialFormState);
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const handleSaveEditButton = () => {
    props.handleSaveEditButton(passwordForm)
    // setPasswordForm(intitialFormState);
    props.close();
    // editPassword(
    //   {
    //     variables:
    //     {
    //       _id: passwordForm._id,
    //       password: passwordForm.password,
    //     }
    //   });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setPasswordForm({ ...passwordForm, [id]: value })
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
        <DialogTitle id="customized-dialog-title" onClose={props.close}>
          Edit Password
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="old_password"
                  label="Old Password"
                  type="password"
                  variant="outlined"
                  value={passwordForm.old_password}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                {passwordForm.new_password === passwordForm.confirm_new_password ?
                  <TextField
                    style={{ backgroundColor: 'white' }}
                    margin="dense"
                    id="new_password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={passwordForm.new_password}
                    onChange={handleInputChange}
                  />
                  :
                  <TextField
                    style={{ backgroundColor: 'white' }}
                    margin="dense"
                    id="new_password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    error
                    value={passwordForm.new_password}
                    onChange={handleInputChange}
                  />
                }
              </FormControl>
              <FormControl className={classes.formControl}>
                {passwordForm.new_password === passwordForm.confirm_new_password ?
                  <TextField
                    style={{ backgroundColor: 'white' }}
                    margin="dense"
                    id="confirm_new_password"
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    value={passwordForm.confirm_new_password}
                    onChange={handleInputChange}
                  />
                  :
                  <TextField
                    style={{ backgroundColor: 'white' }}
                    margin="dense"
                    error
                    id="confirm_new_password"
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    value={passwordForm.confirm_new_password}
                    onChange={handleInputChange}
                    helperText="password did not match."
                  />
                }
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          {(true) ?
            < Button size="small" className={classes.iconbutton} disabled >Save</Button>
            :
            < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveEditButton()}>Save</Button>
          }
        </DialogActions>
      </Dialog>

    </div>
  );
};

