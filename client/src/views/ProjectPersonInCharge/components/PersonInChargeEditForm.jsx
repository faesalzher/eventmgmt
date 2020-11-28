

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsEdit } from 'components/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { DELETE_PERSON_IN_CHARGE, EDIT_PERSON_IN_CHARGE, DEPARTEMENT_POSITION_QUERY } from 'gql';

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


export default function PersonInChargeEditForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  const [committee_id, setCommittee_id] = useState(props.personInCharge.committee_id);
  const [position_id, setPosition_id] = useState(props.personInCharge.position_id);
  const [staff_id, setStaff_id] = useState(props.personInCharge.staff_id);

  const [committees, setCommittees] = useState(props.committees);
  React.useEffect(() => {
    setCommittees(props.committees)
  }, [setCommittees, props.committees])
  
  const intitialFormState = {
    _id: props.personInCharge._id,
    staff_id: props.personInCharge.staff_id,
    position_id: props.personInCharge.position_id,
    committee_id: props.personInCharge.committee_id,
    project_id: props.personInCharge.project_id,
  }

  const [personInChargeForm, setPersonInChargeForm] = useState(intitialFormState);
  const [deletePersonInCharge] = useMutation(DELETE_PERSON_IN_CHARGE);
  const [editPersonInCharge] = useMutation(EDIT_PERSON_IN_CHARGE);

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(personInChargeForm)
    // setPersonInChargeForm(intitialFormState);
    props.close();
    editPersonInCharge({
      variables:
      {
        _id: personInChargeForm._id,
        staff_id: personInChargeForm.staff_id,
        committee_id: personInChargeForm.committee_id,
        position_id: personInChargeForm.position_id,
        project_id: personInChargeForm.project_id,
      }
    });
  }

  const handleDelete = () => {
    props.handleDeletePersonInCharge(props.personInCharge._id);
    // setCommitteeForm(intitialFormState);
    props.close();
    deletePersonInCharge({ variables: { _id: props.personInCharge._id, } });
  }

  const handleChangeCommittee = (event) => {
    personInChargeForm.committee_id = event.target.value;
    setCommittee_id(event.target.value);
    setPosition_id("");
    personInChargeForm.position_id = "";
  };

  const handleChangePosition = (event) => {
    const position_value = event.target.value
    setPersonInChargeForm({ ...personInChargeForm, order: position_value.order, position_id: position_value._id })
    setPosition_id(event.target.value);
  };

  const handleCloseModal = () => {
    props.close();
    setPersonInChargeForm(intitialFormState);
    setCommittee_id(props.personInCharge.committee_id);
    setPosition_id(props.personInCharge.position_id);
    setStaff_id(props.personInCharge.staff_id);
  }

  let checkPersonInChargePositionId = [];
  props.personInCharges.forEach((personInCharge) => {
    props.positions.forEach((position) => {
      if (position._id === personInCharge.position_id
        && props.project_id === personInCharge.project_id
        && committee_id === personInCharge.committee_id
        && parseInt(position.order) > 7
      ) {
        checkPersonInChargePositionId.push(position._id)
      } else {
        return null
      }
      return null;
    })
    return null;
  }
  );

  let checkCommitteeCore = [];
  props.committees.map((committee) => {
    if (committee.core) {
      checkCommitteeCore.push(committee._id)
    }
    return null;
  }
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title={"Edit Person In Charge"} onClose={() => handleCloseModal()} />
      <DialogContent style={{}} >
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                id="staff_id"
                size="small"
                select
                margin="dense"
                style={{ backgroundColor: 'white' }}
                label="PersonInCharge Name"
                value={staff_id}
                disabled={true}
                variant="outlined"
              >
                {
                  props.staffs.map((staff) => {
                    return < MenuItem key={staff.staff_name} value={staff._id} >
                      <StaffName staff={staff} />
                    </MenuItem>
                  })
                }
              </TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="committee_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Committee"
                  value={committee_id}
                  onChange={handleChangeCommittee}
                  variant="outlined"
                >
                  {committees.map((committee) => {
                    if (committee._id === props.project_personInCharge.committee_id
                      || props.decodedToken.user_type === "organization"
                      || props.project_personInCharge.order === '1'
                      || props.project_personInCharge.order === '2'
                      || props.project_personInCharge.order === '3'
                    )
                      return (
                        <MenuItem key={committee.committee_name}
                          value={committee._id}
                        >
                          {committee.committee_name}
                        </MenuItem>)
                    return null
                  })}
                </TextField>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="position_id"
                  select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Position"
                  value={position_id}
                  onChange={handleChangePosition}
                  variant="outlined"
                >
                  {
                    committee_id === checkCommitteeCore[0] ?
                      props.positions.map((position) => {
                        if (position.core === true)
                          if (checkPersonInChargePositionId.indexOf(position._id) > -1)
                            if (props.personInCharge.position_id === position._id)
                              return <MenuItem key={position.position_name} value={position._id}>
                                {position.position_name}
                              </MenuItem>
                            else
                              return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                          else
                            return <MenuItem key={position.position_name} value={position._id}>
                              {position.position_name}
                            </MenuItem>
                        else return null;
                      })
                      :
                      props.positions.map((position) => {
                        if (position.core === false)
                          if (checkPersonInChargePositionId.indexOf(position._id) > -1)
                            if (props.personInCharge.position_id === position._id)
                              return <MenuItem key={position.position_name} value={position._id}>
                                {position.position_name}
                              </MenuItem>
                            else
                              return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                          else
                            return <MenuItem key={position.position_name} value={position._id}>
                              {position.position_name}
                            </MenuItem>
                        else return null;
                      })
                  }
                </TextField>
              }
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActionsEdit
        validation={
          (
            personInChargeForm._id === "" ||
            personInChargeForm.staff_id === "" ||
            personInChargeForm.position_id === "" ||
            personInChargeForm.committee_id === ""
          ) ?
            ("invalid") : ("valid")
        }
        content="PersonInCharge"
        // name={personInChargeForm.personInCharge_name}
        submit={() => handleSaveEditButton()}
        delete={() => handleDelete()}
        close={() => handleCloseModal()}
      />
    </Dialog>
  );
};

const StaffName = (props) => {
  return (
    <div style={{ padding: "0px 10px", display: 'flex' }}>
      <ListItemAvatar>
        <Avatar src={props.staff.picture} />
      </ListItemAvatar>
      <ListItemText
        style={{ margin: 0 }}
        primary={props.staff.staff_name}
        secondary={<DepartementPositionName departement_position_id={props.staff.departement_position_id} />}
      />
    </div>
  );
}

const DepartementPositionName = (props) => {
  const { data: departementPositionData } = useQuery(DEPARTEMENT_POSITION_QUERY, {
    variables: { _id: props.departement_position_id },
  }
  );
  if (!departementPositionData) {
    return (<></>)
  }

  return (
    <>
      {departementPositionData.departement_position === null ?
        "No Positions on Departement"
        :
        departementPositionData.departement_position.departement_position_name
      }
    </>
  );
}