

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
  FormControl,
  MenuItem,
  // Select,
  // InputLabel,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import uuid from 'uuid/v1';
import {
  useMutation,
} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const ADD_COMITEE = gql`
  mutation addComitee(
    $_id: String!,
    $staff_id: String!,
    $division_id: String!,
    $position_id: String!,
    $project_id: String!,
    ){
    addComitee(
      _id: $_id,
      staff_id: $staff_id,
      division_id: $division_id,
      position_id:$position_id,
      project_id:$project_id,
    ){
      _id
      staff_id
      division_id
      position_id
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

export default function ComiteeAddForm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [division_id, setDivision_id] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [staff_id, setStaff_id] = useState("");

  const intitialFormState = {
    _id: uuid(),
    staff_id: staff_id,
    position_id: position_id,
    division_id: division_id,
    project_id: props.project_id,
  }
  const [comiteeForm, setComiteeForm] = useState(intitialFormState);


  const [addComitee] = useMutation(ADD_COMITEE);
  // React.useEffect(() => {
  //   if (props.division_id !== "all") {
  //     comiteeForm.division_id = props.division_id;
  //   }
  // }, [props.division_id, comiteeForm.division_id]);

  const handleSaveButton = () => {
    props.handleSaveButton(comiteeForm)
    props.close();
    addComitee({
      variables:
      {
        _id: comiteeForm._id,
        staff_id: comiteeForm.staff_id,
        division_id: comiteeForm.division_id,
        position_id: comiteeForm.position_id,
        project_id: comiteeForm.project_id,
      }
    });
    setComiteeForm(intitialFormState);
    setDivision_id("");
    setPosition_id("");
    setStaff_id("");
  }

  const handleChangeDivision = (event) => {
    comiteeForm.division_id = event.target.value;
    setDivision_id(event.target.value);
    setPosition_id("");
    comiteeForm.position_id = "";
  };

  const handleChangePosition = (event) => {
    comiteeForm.position_id = event.target.value;
    setPosition_id(event.target.value);
  };

  const handleChangeStaff = (event) => {
    comiteeForm.staff_id = event.target.value;
    setStaff_id(event.target.value);
  };

  const handleCloseModal = () => {
    props.close();
    setComiteeForm(intitialFormState);
    setDivision_id("");
    setPosition_id("");
    setStaff_id("");
  }
  let checkComiteeStaffId = [];
  props.comitees.map((comitee) =>
    props.staffs.map((staff) => {
      if (staff._id === comitee.staff_id && props.project_id === comitee.project_id) {
        checkComiteeStaffId.push(staff._id)
      } else {
        return null;
      }
      return null;
    })
  );

  let checkComiteePositionId = [];
  props.comitees.map((comitee) =>
    props.positions.map((position) => {
      if (position._id === comitee.position_id
        && props.project_id === comitee.project_id
        && division_id === comitee.division_id
        && position._id !== "7"
      ) {
        checkComiteePositionId.push(position._id)
      } else {
        return null
      }
      return null;
    })
  );

  let checkCoreDivisionId = [];
  props.divisions.map((division) => {
    if (division_id === division._id && division.division_name === "Core Comitee")
      checkCoreDivisionId.push(division._id)
    return null;
  });
  // console.log(checkCoreDivisionId[0])
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleCloseModal()}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => handleCloseModal()}>
        Add New Comitee
        </DialogTitle>
      <DialogContent dividers style={{ backgroundColor: '#d8dce3' }}>
        <form noValidate >
          <div >
            <FormControl className={classes.formControl}>
              <TextField
                id="staff_id"
                size="small"
                select
                margin="dense"
                style={{ backgroundColor: 'white' }}
                label="Comitee Name"
                value={staff_id}
                onChange={handleChangeStaff}
                variant="outlined"
              // MenuProps={MenuProps}
              >
                {
                  props.staffs.map((staff) => {
                    if (checkComiteeStaffId.indexOf(staff._id) > -1) {
                      return <MenuItem key={staff.staff_name} disabled={true}>
                        {staff.staff_name}
                      </MenuItem>
                    } else {
                      return < MenuItem key={staff.staff_name} value={staff._id} >
                        {staff.staff_name}
                      </MenuItem>
                    }
                  })
                }
              </TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                <TextField
                  id="division_id"
                  multiple select
                  size="small"
                  margin="dense"
                  style={{ backgroundColor: 'white' }}
                  label="Division"
                  value={division_id}
                  onChange={handleChangeDivision}
                  variant="outlined"
                >
                  {props.divisions.map((division) => (
                    <MenuItem key={division.division_name}
                      value={division._id}
                    >
                      {division.division_name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              {
                comiteeForm.division_id === "" ?
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
                      division_id === checkCoreDivisionId[0] ?
                        props.positions.map((position) => {
                          if (position.core === "true")
                            if (checkComiteePositionId.indexOf(position._id) > -1)
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
                          if (position.core === "false")
                            if (checkComiteePositionId.indexOf(position._id) > -1)
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
      <DialogActions>
        {/* <Button size="small" className={classes.iconbutton} onClick={() => props.setAddRoadmapForm(false)} style={{ color: 'grey' }}>Cancel</Button> */}
        {(comiteeForm._id === "" ||
          comiteeForm.staff_id === "" ||
          comiteeForm.position_id === "" ||
          comiteeForm.division_id === ""
        ) ?
          < Button size="small" className={classes.iconbutton} disabled >Save</Button>
          :
          < Button size="small" style={{ color: 'blue' }} onClick={() => handleSaveButton()}>Save</Button>
        }
      </DialogActions>
    </Dialog >
  );
};

