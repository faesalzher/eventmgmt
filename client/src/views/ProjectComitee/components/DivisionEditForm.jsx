

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

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  DeleteForm
} from 'components';

const DELETE_DIVISION = gql`
mutation deleteDivision ($_id: String!) {
  deleteDivision(_id:$_id){
    _id
  }
}
`;
const EDIT_DIVISION = gql`
  mutation editDivision($_id: String!,$division_name: String!) {
    editDivision(_id: $_id,division_name: $division_name) {
      _id
      division_name
    }
  }
`;

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



export default function DivisionEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: props.division._id,
    division_name: props.division.division_name,
  }
  const [divisionForm, setDivisionForm] = useState(intitialFormState);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteDivision] = useMutation(DELETE_DIVISION);
  const [editDivision] = useMutation(EDIT_DIVISION);

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(divisionForm)
    // setDivisionForm(intitialFormState);
    props.close();
    editDivision(
      {
        variables:
        {
          _id: divisionForm._id,
          division_name: divisionForm.division_name,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDivisionForm({ ...divisionForm, [id]: value })
  }

  const handleDelete = () => {
    props.handleDeleteDivision(props.division._id, props.index);
    // setDivisionForm(intitialFormState);
    props.close();
    deleteDivision({ variables: { _id: props.division._id, } });
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
          Edit Division
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="division_name"
                  label="Division Name"
                  type="text"
                  variant="outlined"
                  value={divisionForm.division_name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" size="small" color="secondary" onClick={handleDeleteModal}>
            Delete
        </Button>
          <DeleteForm
            open={openDeleteModal}
            index={props.index}
            handleDelete={handleDelete}
            // handleSaveButton={handleSaveButton}
            close={handleCloseDeleteModal}
          />
          {(divisionForm.division_name === "" || divisionForm.contact_person === "" || divisionForm.info === "") ?
            < Button size="small" className={classes.iconbutton} disabled >Save</Button>
            :
            < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveEditButton()}>Save</Button>
          }
        </DialogActions>
      </Dialog>

    </div>
  );
};

