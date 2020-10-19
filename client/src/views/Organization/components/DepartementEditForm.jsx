

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

const DELETE_DEPARTEMENT = gql`
mutation deleteDepartement ($_id: String!) {
  deleteDepartement(_id:$_id){
    _id
  }
}
`;
const EDIT_DEPARTEMENT = gql`
  mutation editDepartement(
    $_id: String!,
    $departement_name: String!,
    $organization_id: String!
    ) {
    editDepartement(
      _id: $_id,
      departement_name: $departement_name
      organization_id: $organization_id
      ) {
      _id
      departement_name
      organization_id
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


export default function DepartementEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: props.departement._id,
    departement_name: props.departement.departement_name,
    organization_id: props.organization_id
  }
  const [departementForm, setDepartementForm] = useState(intitialFormState);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteDepartement] = useMutation(DELETE_DEPARTEMENT);
  const [editDepartement] = useMutation(EDIT_DEPARTEMENT);

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(departementForm)
    // setDepartementForm(intitialFormState);
    props.close();
    editDepartement(
      {
        variables:
        {
          _id: departementForm._id,
          departement_name: departementForm.departement_name,
          organization_id: departementForm.organization_id
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDepartementForm({ ...departementForm, [id]: value })
  }

  const handleDelete = () => {
    props.handleDeleteDepartement(props.departement._id, props.index);
    // setDepartementForm(intitialFormState);
    props.close();
    deleteDepartement({ variables: { _id: props.departement._id, } });
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
          Edit Departement
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  id="departement_name"
                  label="Departement Name"
                  type="text"
                  variant="outlined"
                  value={departementForm.departement_name}
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
          {(departementForm.departement_name === "" || departementForm.contact_person === "" || departementForm.info === "") ?
            < Button size="small" className={classes.iconbutton} disabled >Save</Button>
            :
            < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveEditButton()}>Save</Button>
          }
        </DialogActions>
      </Dialog>

    </div>
  );
};

