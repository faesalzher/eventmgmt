import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SaveConfirm(props) {
  const [save, setSave] = useState(false)

  const handleConfirm = () => {
    setSave(true)
    setTimeout(() => {
      setSave(false)
    }, 400);
    setTimeout(() => {
      props.handleConfirm();
      props.close();
    }, 400);
  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Save Content"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to Save this ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {save ? <CircularProgress size={20} /> : <div></div>}
          <Button onClick={props.close}>
            Cancel
          </Button>
          <Button color="secondary" variant="outlined" onClick={handleConfirm} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}