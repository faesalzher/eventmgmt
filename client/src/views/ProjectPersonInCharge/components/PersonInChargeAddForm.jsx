

import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { DialogTitle, DialogContent, DialogActionsAdd } from 'components/Dialog';

import TextField from '@material-ui/core/TextField';
import {
  Dialog,
  FormControl,
  MenuItem,
  Divider,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';

import { ADD_PERSON_IN_CHARGE, DEPARTEMENT_QUERY, DEPARTEMENT_POSITION_QUERY } from 'gql';

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
  formControlSelect: {
    width: "100%",
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


const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    order: "",
    staff_id: "",
    position_id: "",
    committee_id: "",
    project_id: props.project_id,
  }

  const [personInChargeForm, setPersonInChargeForm] = useState(intitialFormState);
  const [addPersonInCharge] = useMutation(ADD_PERSON_IN_CHARGE);


  const handleSaveButton = () => {
    props.handleSaveButton(personInChargeForm)
    addPersonInCharge({
      variables:
      {
        _id: personInChargeForm._id,
        staff_id: personInChargeForm.staff_id,
        order: personInChargeForm.order,
        committee_id: personInChargeForm.committee_id,
        position_id: personInChargeForm.position_id,
        project_id: personInChargeForm.project_id,
      }
    });
    setPersonInChargeForm(intitialFormState);
    setCommittee_id("");
    setPosition_id("");
    setStaff_id("");
    props.close();
  }

  const handleChangeCommittee = (event) => {
    personInChargeForm.committee_id = event.target.value;
    setCommittee_id(event.target.value);
    setPosition_id("");
    setPersonInChargeForm({ ...personInChargeForm, position_id: "" })
  };

  const handleChangePosition = (event) => {
    const position_value = event.target.value
    setPersonInChargeForm({ ...personInChargeForm, order: position_value.order, position_id: position_value._id })
    setPosition_id(event.target.value);
  };

  const handleChangeStaff = (event) => {
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

  //checking whether staff is assigned to person in charge and available
  const checkPersonInChargeStaffId = [];
  props.personInCharges.forEach((personInCharge) => {
    props.staffs.forEach((staff) => {
      if (staff._id === personInCharge.staff_id) {
        checkPersonInChargeStaffId.push(staff._id)
      }
    })
  }
  );

  //checking wheter position is taken
  let checkPersonInChargePositionId = [];
  props.personInCharges.forEach((personInCharge) => {
    props.positions.forEach((position) => {
      if (position._id === personInCharge.position_id
        // && props.project_id === personInCharge.project_id
        && committee_id === personInCharge.committee_id
        && parseInt(position.order) !== 8
        && parseInt(position.order) !== 9
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

  //checking wheter committee choosen is core
  let checkCoreCommitteeId = [];
  committees.forEach((committee) => {
    if (committee_id === committee._id && committee.core)
      checkCoreCommitteeId.push(committee._id)
  });


  //menuitem for staffs
  const menuItems = [];
  props.groupDepartements.forEach((groupDepartement) => {
    menuItems.push(
      <ListSubheader key={groupDepartement.departement_id} disableSticky color="primary" style={{ padding: "0px 25px" }}> <DepartementName departement_id={groupDepartement.departement_id} /></ListSubheader>
    )
    menuItems.push(
      <Divider key={groupDepartement.departement_id} />
    )
    groupDepartement.staffs.sort((a, b) => a.staff_name.localeCompare(b.staff_name)).forEach((staff) => {
      if (checkPersonInChargeStaffId.indexOf(staff._id) > -1) {
        menuItems.push(
          <MenuItem key={staff._id} disabled={true} style={{ padding: "5px 15px" }} >
            <StaffName staff={staff} />
          </MenuItem>)
      } else {
        menuItems.push(
          < MenuItem key={staff._id} value={staff._id || ''} style={{ padding: "5px 15px" }} >
            <StaffName staff={staff} />
          </MenuItem>
        )
      }
    })
  })

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
              {/* <InputLabel id="person-in-charge-name-label">Person In Charge Name</InputLabel> */}
              <TextField
                variant="outlined"
                id="staff_id"
                size="small"
                select
                margin="dense"
                style={{ backgroundColor: 'white' }}
                label="Person In Charge Name"
                value={staff_id}
                onChange={handleChangeStaff}
                SelectProps={{ MenuProps: MenuProps }}
              >
                {menuItems}
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
                  SelectProps={{ MenuProps: MenuProps }}
                >
                  {committees.map((committee) => {
                    if (committee._id === props.project_personInCharge.committee_id
                      || props.decodedToken.user_type === "organization"
                      || props.project_personInCharge.order === '1'
                      || props.project_personInCharge.order === '2'
                      || props.project_personInCharge.order === '3'
                    )
                      return (
                        <MenuItem key={committee._id}
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
                    SelectProps={{ MenuProps: MenuProps }}
                  >
                    {
                      committee_id === checkCoreCommitteeId[0] ?
                        props.positions.map((position) => {
                          if (position.core === true)
                            if (checkPersonInChargePositionId.indexOf(position._id) > -1)
                              if (parseInt(props.project_personInCharge.order) >= parseInt(position.order)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else return <MenuItem key={position._id} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                            else
                              if (parseInt(props.project_personInCharge.order) >= parseInt(position.order)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else
                                return <MenuItem key={position._id} value={position}>
                                  {position.position_name}
                                </MenuItem>
                          else return null;
                        })
                        :
                        props.positions.map((position) => {
                          if (position.core === false)
                            if (checkPersonInChargePositionId.indexOf(position._id) > -1)
                              if (parseInt(props.project_personInCharge.order) >= parseInt(position.order)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else return <MenuItem key={position._id} disabled={true}>
                                {position.position_name}
                              </MenuItem>
                            else
                              if (parseInt(props.project_personInCharge.order) >= parseInt(position.order)
                                && props.decodedToken.user_type !== "organization")
                                return null
                              else
                                return <MenuItem key={position._id} value={position}>
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


const DepartementName = (props) => {

  const { data: departementData } = useQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: props.departement_id },
  }
  );
  if (!departementData) {
    return (<></>)
  }

  return (
    <div>
      {departementData.departement === null ?
        "No Departements"
        :
        departementData.departement.departement_name
      }
    </div>
  );
}

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