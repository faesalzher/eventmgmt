

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';
import { AvatarName } from 'components';

import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';
import {
  useMutation,
} from '@apollo/react-hooks';

import { ADD_PERSON_IN_CHARGE, COMMITTEES__QUERY } from 'gql';

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


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function PersonInChargeAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [committee_id, setCommittee_id] = useState("");
  const [committees, setCommittees] = useState(props.committees);
  React.useEffect(() => {
    setCommittees(props.committees)
  }, [setCommittees, props.committees])

  const [position_id, setPosition_id] = useState("");
  const [staff_id, setStaff_id] = useState("");
  const intitialFormState = {
    _id: uuid(),
    staff_id: "",
    position_id: "",
    committee_id: "",
    project_id: props.project_id,
  }

  const [personInChargeForm, setPersonInChargeForm] = useState(intitialFormState);
  const [addPersonInCharge] = useMutation(ADD_PERSON_IN_CHARGE);
  // React.useEffect(() => {
  //   if (props.committee_id !== "all") {
  //     personInChargeForm.committee_id = props.committee_id;
  //   }
  // }, [props.committee_id, personInChargeForm.committee_id]);

  const handleSaveButton = () => {
    props.handleSaveButton(personInChargeForm)
    props.close();
    addPersonInCharge({
      variables:
      {
        _id: personInChargeForm._id,
        staff_id: personInChargeForm.staff_id,
        committee_id: personInChargeForm.committee_id,
        position_id: personInChargeForm.position_id,
        project_id: personInChargeForm.project_id,
      }
    });
    setPersonInChargeForm(intitialFormState);
    setCommittee_id("");
    setPosition_id("");
    setStaff_id("");
  }

  const handleChangeCommittee = (event) => {
    personInChargeForm.committee_id = event.target.value;
    // setAgendaForm({ ...agendaForm, date: day.toString().slice(0, 16) })
    // setPersonInChargeForm({...personInChargeForm, committee_id: '1'})
    setCommittee_id(event.target.value);
    setPosition_id("");
    setPersonInChargeForm({ ...personInChargeForm, position_id: "" })
    // personInChargeForm.position_id = "";
  };

  const handleChangePosition = (event) => {
    personInChargeForm.position_id = event.target.value;
    setPosition_id(event.target.value);
  };

  const handleChangeStaff = (event) => {
    // personInChargeForm.staff_id = event.target.value;
    setPersonInChargeForm({ ...personInChargeForm, staff_id: event.target.value })
    setStaff_id(event.target.value);
  };

  const handleCloseModal = () => {
    props.close();
    setPersonInChargeForm(intitialFormState);
    setCommittee_id("");
    setPosition_id("");
    setStaff_id("");
  }

  let checkPersonInChargeStaffId = [];
  props.personInCharges.forEach((personInCharge) => {
    props.staffs.forEach((staff) => {
      if (staff._id === personInCharge.staff_id && props.project_id === personInCharge.project_id) {
        checkPersonInChargeStaffId.push(staff._id)
      }
    })
  }
  );

  let checkPersonInChargePositionId = [];
  props.personInCharges.forEach((personInCharge) => {
    props.positions.forEach((position) => {
      if (position._id === personInCharge.position_id
        && props.project_id === personInCharge.project_id
        && committee_id === personInCharge.committee_id
        && position._id !== "7"
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

  let checkCoreCommitteeId = [];
  committees.forEach((committee) => {
    if (committee_id === committee._id && committee.committee_name === "Core Committee")
      checkCoreCommitteeId.push(committee._id)
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle title={"Add New Person In Charge"} onClose={() => handleCloseModal()} />
      <DialogContent style={{}}>
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                id="staff_id"
                size="small"
                select
                margin="dense"
                style={{ backgroundColor: 'white' }}
                label="Person In Charge Name"
                value={staff_id}
                onChange={handleChangeStaff}
                variant="outlined"
              // MenuProps={MenuProps}
              >
                {
                  props.staffs.map((staff) => {
                    if (checkPersonInChargeStaffId.indexOf(staff._id) > -1) {
                      return <MenuItem key={staff.staff_name} disabled={true}>
                        <AvatarName
                          name={staff.staff_name}
                          picture={staff.picture}
                        />
                      </MenuItem>
                    } else {
                      return < MenuItem key={staff.staff_name} value={staff._id} >
                        <AvatarName
                          name={staff.staff_name}
                          picture={staff.picture}
                        />
                      </MenuItem>
                    }
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
                      || props.project_personInCharge.position_id === '1'
                      || props.project_personInCharge.position_id === '2'
                      || props.project_personInCharge.position_id === '3'
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
                personInChargeForm.committee_id === "" || personInChargeForm.committee_id === "all" ?
                  <TextField
                    style={{ backgroundColor: 'white' }}
                    margin="dense"
                    label="Position Name"
                    type="text"
                    variant="outlined"
                    disabled
                    value={""}
                  />
                  :
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
                      committee_id === checkCoreCommitteeId[0] ?
                        props.positions.map((position) => {
                          if (position.core === true)
                            if (checkPersonInChargePositionId.indexOf(position._id) > -1)
                              if (parseInt(props.project_personInCharge.position_id) >= parseInt(position._id)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                            else
                              if (parseInt(props.project_personInCharge.position_id) >= parseInt(position._id)
                                && props.decodedToken.user_type !== "organization")
                                return null
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
                              if (parseInt(props.project_personInCharge.position_id) >= parseInt(position._id)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else return <MenuItem key={position.position_name} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                            else
                              if (parseInt(props.project_personInCharge.position_id) >= parseInt(position._id)
                                && props.decodedToken.user_type !== "organization")
                                return null
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
      <DialogActionsAdd
        validation={
          (
            personInChargeForm._id === "" ||
            personInChargeForm.staff_id === "" ||
            personInChargeForm.position_id === "" || position_id === "" ||
            personInChargeForm.committee_id === "" || committee_id === ""
          ) ?
            ("invalid") : ("valid")
        }
        submit={() => handleSaveButton()}
        close={() => handleCloseModal()}
      />

    </Dialog >
  );
};

