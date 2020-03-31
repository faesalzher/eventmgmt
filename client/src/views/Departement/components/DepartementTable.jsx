import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar, MTableHeader } from 'material-table';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  IconButton,
  ButtonGroup,
  Card,
  Tooltip,
  // Box
} from '@material-ui/core';
// import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  EditDepartementForm,
} from './';

const STAFFSBYDEPARTEMENT_QUERY = gql`
  query staffsByDepartemet($departement_id: String!){
    staffsByDepartement(departement_id:$departement_id) {
      _id
      staff_name
      email
      phone_number
      address
    }
  }
`;

const ADD_STAFF = gql`
  mutation addStaff($_id: String!,$staff_name: String!,$email: String!,$phone_number: String!,$address: String!,$departement_id: String!) {
    addStaff(_id: $_id,staff_name: $staff_name,email:$email,phone_number:$phone_number,address:$address,departement_id:$departement_id,) {
      _id
      staff_name
      email
      phone_number
      address
      departement_id
    }
  }
`;

const EDIT_STAFF = gql`
  mutation editStaff($_id: String!,$staff_name: String!,$email: String!,$phone_number: String!,$address: String!,$departement_id: String!) {
    editStaff(_id: $_id,staff_name: $staff_name,email:$email,phone_number:$phone_number,address:$address,departement_id:$departement_id,) {
      _id
      staff_name
      email
      phone_number
      address
      departement_id
    }
  }
`;
const DELETE_STAFF = gql`
mutation deleteStaff ($_id: String!) {
  deleteStaff(_id:$_id){
    _id
  }
}
`;


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     transform: 'translateZ(0px)',
//     flexGrow: 1,
//   },
//   exampleWrapper: {
//     position: 'relative',
//     marginTop: theme.spacing(3),
//     height: 380,
//   },
//   radioGroup: {
//     margin: theme.spacing(1, 0),
//   },
//   speedDial: {
//     position: 'absolute',
//     '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
//       bottom: theme.spacing(2),
//       right: theme.spacing(2),
//     },
//     '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
//       top: theme.spacing(2),
//       left: theme.spacing(2),
//     },
//   },
// }));
export default function DepartementTable(departement) {
  // const classes = useStyles();
  const [staffs, setStaffs] = React.useState([]);
  const [settingsButton, setSettingsButton] = React.useState(false);
  const [handlerDelete, setHandlerDelete] = React.useState(false);
  const [handlerEdit, setHandlerEdit] = React.useState(false);
  const [save, setSave] = useState(false)


  const { loading, data, refetch } = useQuery(STAFFSBYDEPARTEMENT_QUERY,
    {
      variables: { departement_id: departement._id },
      onCompleted: () => {
        setStaffs({
          columns: [
            { title: 'Name', field: 'staff_name' },
            { title: 'Email', field: 'email' },
            { title: 'Phone Number', field: 'phone_number' },
            { title: 'Address', field: 'address' },
          ],
          data: data.staffsByDepartement
        })
      }
    });
  const refresh = () => {
    refetch();
  };
  const mongoose = require('mongoose');
  const [editStaff] = useMutation(EDIT_STAFF);

  const handleSettings = () => {
    setSettingsButton(true);
  };

  const handleDeleteConfirm = e => {
    setSave(true);
    if (staffs.data.length !== 0) {
      handleError();
    } else {
      setTimeout(() => {
        setHandlerDelete(false);
      }, 700);
      departement.handleDelete(e);
    }
    setSave(false)
  }
  const [open, setOpen] = React.useState(false);
  // const [editDepartement] = useMutation(EDIT_DEPARTEMENT);

  const handleError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const closeEditDialog = e => {
    setHandlerEdit(false)
  };
  const [addStaff] = useMutation(ADD_STAFF);
  const [deleteStaff] = useMutation(DELETE_STAFF);


  useEffect(() => {
    refresh();
  });
  if (loading) return <div style={{ paddingTop: 100, textAlign: 'center' }}><CircularProgress /></div>;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        {handlerEdit ? (
          <div><EditDepartementForm
            _id={departement._id}
            closeEditDialog={closeEditDialog}
            departement_name={departement.departement_name}
          /></div>
        ) : (
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
              <Card
                style={handlerDelete ?
                  { backgroundColor: 'Red', color: "white" }
                  :
                  { backgroundColor: '#3f51b5', color: "white" }
                }>
                <div
                  style={{ display: "flex", padding: "6px 25px" }}>
                  {(handlerDelete) ? (
                    <div>
                      <Typography fontWeight="fontWeightBold" m={1}>
                        Are you sure to delete this departement??
                    </Typography>
                    </div>
                  ) : (
                      <div>
                        {departement.departement_name}
                      </div>
                    )}
                </div>
              </Card>
              {(handlerDelete) ? (
                <div style={{ paddingTop: 5, paddingLeft: 10, display: 'flex' }}>
                  <Tooltip title="Confirm" aria-label="confirm">
                    <IconButton style={{ fontSize: 10, padding: "0px 7px" }}
                      onClick={() => { handleDeleteConfirm(departement._id) }} >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel" aria-label="cancel">
                    <IconButton style={{ fontSize: 10, padding: "0px 7px" }}
                      onClick={() => { setHandlerDelete(false) }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                  {save ? <div style={{ paddingBottom: 0 }}> <CircularProgress size={20} /></div> : <div></div>}
                </div>
              ) : (
                  <div></div>
                )}
            </div>
          )}
        <div>
          {(settingsButton) ? (
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
              <Tooltip title="Cancel" aria-label="cancel">
                <div style={{ paddingTop: 5, paddingRight: 5 }}>
                  <IconButton style={{ fontSize: 10, padding: 0 }} onClick={() => setSettingsButton(false)}>
                    <ClearIcon />
                  </IconButton>
                </div>
              </Tooltip>
              <ButtonGroup color="primary" variant="contained" aria-label="button-edit">
                <Tooltip title="Edit Departement Name" aria-label="edit">
                  <Button onClick={() => { setHandlerEdit(true); setHandlerDelete(false) }}><EditIcon /></Button>
                </Tooltip>
                <Tooltip title="Delete Departement" aria-label="edit">
                  <Button onClick={() => { setHandlerEdit(false); setHandlerDelete(true) }} ><DeleteIcon /></Button>
                </Tooltip>
              </ButtonGroup>
            </div>
          ) : (
              <Tooltip title="Cancel" aria-label="cancel">
                <ButtonGroup color="primary" variant="contained" aria-label="button-settings">
                  <Button onClick={handleSettings} ><SettingsIcon /></Button>
                </ButtonGroup>
              </Tooltip>
            )
          }
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Must Empty the Staff before deleting Departement
        </Alert>
      </Snackbar>
      <MaterialTable
        title={"List Staff of " + departement.departement_name}
        columns={staffs.columns}
        data={staffs.data}
        components={{
          Toolbar: props => (
            <div style={{ backgroundColor: 'orange', color: 'white' }}>
              <MTableToolbar {...props} />
            </div>
          ),
          Header: props => (
            <MTableHeader {...props} />
          )

        }}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}'
          },
          header: {
            actions: '',
            backgroundColor: 'red'
          },
        }}
        options={{
          actionsColumnIndex: -1
        }}
        onRowClick={(event, rowData) => console.log(rowData)}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              // if (!(newData.staff_name === undefined
              //   && newData.address === undefined
              // )) {
              setTimeout(() => {
                resolve();
                setStaffs(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });

                addStaff({
                  variables:
                  {
                    _id: mongoose.Types.ObjectId(),
                    staff_name: newData.staff_name,
                    email: newData.email,
                    phone_number: newData.phone_number,
                    address: newData.address,
                    departement_id: departement._id,
                  }
                });
              }, 100);
              // } else {
              //   setTimeout(() => {
              //     resolve();
              //   }, 500);
              // }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setStaffs(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
                editStaff({
                  variables:
                  {
                    _id: newData._id,
                    staff_name: newData.staff_name,
                    email: newData.email,
                    phone_number: newData.phone_number,
                    address: newData.address,
                    departement_id: departement._id,
                  }
                });
              }, 100);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setStaffs(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
                deleteStaff({
                  variables:
                  {
                    _id: oldData._id,
                  }
                });
              }, 400);
            }),
        }}
      />

    </div >

  );
}