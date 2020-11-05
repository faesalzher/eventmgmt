import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    }
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
}));

export default function ConfirmationDialog(props) {
  const [save, setSave] = useState(false)
  const classes = useStyles();

  const handleConfirm = () => {
    if (props.type === "Log Out") {
      props.handleConfirm();
      props.close();
    } else {
      setSave(true)
      setTimeout(() => {
        setSave(false)
      }, 400);
      setTimeout(() => {
        props.handleConfirm();
        props.close();
      }, 400);
    }
  }

  const type = props.type;
  const name = props.name;
  const content = props.content;
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{type.charAt(0).toUpperCase() + type.slice(1)} {content}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to {type} {name === undefined ? "this item" : name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {save ? <CircularProgress size={20} /> : <div></div>}
          <Button onClick={props.close} color="secondary">
            Cancel
          </Button>
          <Button className={type === "delete" ? classes.error : classes.secondary} variant="contained" onClick={() => handleConfirm()} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}