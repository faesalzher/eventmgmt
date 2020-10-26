

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_DIVISION = gql`
  mutation addDivision(
    $_id: String!,
    $division_name: String!
    $project_id: String!
    ) {
    addDivision(
      _id: $_id,
      division_name: $division_name
      project_id: $project_id
      ) {
      _id
      division_name
      project_id
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
}));

export default function DivisionAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const intitialFormState = {
    _id: uuid(),
    division_name: "",
    project_id: props.project_id,
  }

  const [divisionForm, setDivisionForm] = useState(intitialFormState);
  const [addDivision] = useMutation(ADD_DIVISION);
  console.log(props.project_id)
  const handleSaveButton = () => {
    props.handleSaveButton(divisionForm)
    setDivisionForm(intitialFormState);
    props.close();
    addDivision(
      {
        variables:
        {
          _id: divisionForm._id,
          division_name: divisionForm.division_name,
          project_id: divisionForm.project_id,
        }
      });
  }
  const handleInputChange = e => {
    const { id, value } = e.target;
    setDivisionForm({ ...divisionForm, [id]: value })
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
      <DialogTitle title={"Add New Division"} onClose={props.close} />
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
      <DialogActionsAdd
        close={props.close}
        validation={
          (
            divisionForm.division_name === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()} />
    </Dialog>
  );
};

