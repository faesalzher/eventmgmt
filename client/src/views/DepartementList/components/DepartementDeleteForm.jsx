import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DepartementDeleteForm(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Content"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to Delete this Content?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>
            Cancel
          </Button>
          <Button onClick={props.close} color="secondary" variant="outlined" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}