

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation } from '@apollo/react-hooks';

import {
  EDIT_POSITION,
  DELETE_POSITION,
} from 'gql';


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


const positionName = [
  { position_name: 'Penanggung Jawab', core: true, order: '0' },
  { position_name: 'Head Of Project', core: true, order: '1' },
  { position_name: 'Vice Head of Project', core: true, order: '2' },
  { position_name: 'Secretary', core: true, order: '3' },
  { position_name: 'Treasurer', core: true, order: '4' },
  { position_name: 'Vice Treasurer', core: true, order: '5' },
  { position_name: 'Coordinator', core: false, order: '6' },
  { position_name: 'Vice Coordinator', core: false, order: '7' },
  { position_name: 'Member', core: false, order: '8' },
]

export default function PositionEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [positionForm, setPositionForm] = useState(props.position);

  React.useEffect(() => {
    setPositionForm(props.position)
  }, [setPositionForm, props.position]);

  const [deletePosition] = useMutation(DELETE_POSITION);
  const [editPosition] = useMutation(EDIT_POSITION);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(positionForm)
    // setPositionForm(intitialFormState);
    props.close();
    editPosition(
      {
        variables:
        {
          _id: positionForm._id,
          position_name: positionForm.position_name,
          organization_id: positionForm.organization_id,
          core: positionForm.core,
          order: positionForm.order,
        }
      });
  }
  const handleInputChange = e => {
    const { name, value } = e.target;
    setPositionForm({ ...positionForm, [name]: value })
  }

  const handleDelete = () => {
    props.handleDeletePosition(props.position._id, props.index);
    // setPositionForm(intitialFormState);
    props.close();
    deletePosition({ variables: { _id: props.position._id, } });
  }

  const handleClose = () => {
    setPositionForm(props.position)
    props.close();
  }

  const templatePosition = parseInt(positionForm.order) > 8 ? false : true;
  const helperTemplatePosition = [];

  positionName.forEach((position) => {
    if (positionForm.order === position.order)
      helperTemplatePosition.push(position.position_name)
  })

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
        <DialogTitle title="Edit Position" onClose={() => handleClose()} />
        <DialogContent style={{}}>
          <form noValidate >
            <div >
              <FormControl className={classes.formControl}>
                <TextField
                  style={{ backgroundColor: 'white' }}
                  margin="dense"
                  name="position_name"
                  label={templatePosition ? "Position Name for " + helperTemplatePosition : "Position Name"}
                  type="text"
                  variant="outlined"
                  // helperText={helperTemplatePosition}
                  value={positionForm.position_name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  fullWidth
                  name="core"
                  select
                  size="small"
                  margin="dense"
                  label="Committe Type"
                  value={positionForm.core}
                  disabled={!templatePosition}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  <MenuItem key={0} value={true}>
                    {props.coreCommittee.committee_name}
                  </MenuItem>
                  <MenuItem key={1} value={false}>
                    Non {props.coreCommittee.committee_name}
                  </MenuItem>
                </TextField>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActionsEdit
          validation={
            (
              positionForm.position_name === ""
            ) ?
              ("invalid") : ("valid")
          }
          deleteButton={!templatePosition}
          content="Position"
          name={positionForm.position_name}
          submit={() => handleSaveEditButton()}
          delete={() => handleDelete()}
          close={props.close}
        />
      </Dialog>

    </div>
  );
};

