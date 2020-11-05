import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.main,
    color: 'white'
  },

}));

export default function DeleteForm(props) {
  const [save, setSave] = useState(false)
  const classes = useStyles();

  const handleDelete = () => {
    setSave(true)
    setTimeout(() => {
      setSave(false)
    }, 400);
    setTimeout(() => {
      props.handleDelete();
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
        <DialogTitle id="alert-dialog-title">{"Delete Content"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure to Delete this Content?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {save ? <CircularProgress size={20} /> : <div></div>}
          <Button onClick={props.close} color="secondary">
            Cancel
          </Button>
          <Button className={classes.error} variant="contained" onClick={handleDelete} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}