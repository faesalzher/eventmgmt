

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  deleteBtn: {
    color: theme.palette.error.main
  }
}));


export default function DivisionEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [divisionForm, setDivisionForm] = useState(props.division);

  React.useEffect(() => {
    setDivisionForm(props.division)
  }, [setDivisionForm, props.division]);

  const [deleteDivision] = useMutation(DELETE_DIVISION);
  const [editDivision] = useMutation(EDIT_DIVISION);

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

  const handleClose = () => {
    setDivisionForm(props.division)
    props.close();
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle title="Edit Division" onClose={() => handleClose()} />
        <DialogContent style={{}}>
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
        <DialogActionsEdit
          validation={
            (
              divisionForm.division_name === ""
            ) ?
              ("invalid") : ("valid")
          }
          content="Division"
          name={divisionForm.division_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={props.close}
        />
      </Dialog>

    </div>
  );
};

