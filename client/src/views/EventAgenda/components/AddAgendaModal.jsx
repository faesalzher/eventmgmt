import React, {} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TimeKeeper from 'react-timekeeper';

import {
  TextField,
  FormControl,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2),
    marginTop: 0,
  },
  formControl: {
    width: "100%",
  },
  textField: {
    backgroundColor: "white"
  },
  formDate: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(0),
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
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
      <Typography variant="h6">{children}</Typography>
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
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function TaskDetailModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  // const [
  //   // agenda,
  //    setAgenda] = useState(props.agenda)

  // useEffect(() => {
  //   setAgenda(props.agenda)
  // }, [props.agenda,setAgenda])

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.close} style={{ textAlign: 'center' }}>
        Add New Agenda
        </DialogTitle>
      <DialogContent dividers style={
        fullScreen ?
          { backgroundColor: "#e6e8eb" } :
          { backgroundColor: "#e6e8eb", height: 600, flexDirection: 'row', display: 'flex' }}>
        <div className={classes.form} style={fullScreen ? {} : {}}>
          <FormControl className={classes.formControl}>
            <TextField
              className={classes.textField}
              autoFocus
              margin="dense"
              id="agenda_name"
              label="Agenda Name"
              type="text"
              variant="outlined"
            // value={projects.project_name}
            // onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              className={classes.textField}
              autoFocus
              margin="dense"
              multiline
              MaxRows="5"
              id="details"
              label="Details"
              type="text"
              variant="outlined"
            // value={projects.project_name}
            // onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className={classes.formDate} style={{}}>
            <div style={{ textAlign: 'center' }}>
              <Typography color="textSecondary" variant="subtitle2">Start Time</Typography>
              <TimeKeeper
                // time={agenda.start_time.slice(16, 21)}
                // onChange={(newTime) => onStartTimeChange(newTime.formatted24)}
                hour24Mode={true}
              />
            </div>
         -
         <div style={{ textAlign: 'center' }}>
              <Typography  color="textSecondary" variant="subtitle2">End Time</Typography>
              <TimeKeeper
                // time={agenda.end_time.slice(16, 21)}
                // onChange={(newTime) => onEndTimeChange(newTime.formatted24)}
                hour24Mode={true}
              />
            </div>
          </FormControl>
        </div>

      </DialogContent  >
      <DialogActions>
        <Button autoFocus onClick={props.close} color="primary">
          Save changes
          </Button>
      </DialogActions>
    </Dialog >
  );
}