import React, { useState, 
    // useEffect
 } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
    // Button,
    // Typography,
    IconButton,
    Card,
    Tooltip
} from '@material-ui/core';
import { useMutation, 
    // useQuery
 } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
// import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
const EDIT_DEPARTEMENT = gql`
  mutation editDepartement($_id: String!,$departement_name: String!) {
    editDepartement(_id: $_id,departement_name: $departement_name) {
      _id
      departement_name
    }
  }
`;

// const mongoose = require('mongoose');

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditDepartementForm = (props) => {
    // const classes = useStyles();
    const initialFormState =
    {
        _id: props._id,
        departement_name: props.departement_name,
    };
    const [departements, setDepartements] = useState(initialFormState);

    const [save, setSave] = useState(false)
    const [open, setOpen] = React.useState(false);

    // const handleSucces = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const closeEditDialog = () => {
        props.closeEditDialog();
    }
    const handleInputChange = e => {
        const { id, value } = e.target;
        setDepartements({ ...departements, [id]: value });
    };

    console.log(departements)
    const [editDepartement] = useMutation(EDIT_DEPARTEMENT);
    const handleButton = () => {
        setSave(true);
        setTimeout(() => {
            closeEditDialog();
            setSave(false)
        }, 700);       
        setTimeout(() => {
            editDepartement(
                {
                    variables:
                    {
                        _id: departements._id,
                        departement_name: departements.departement_name,
                    }
                });
            setDepartements(initialFormState);
        }, 700);
        // setTimeout(() => {
        //     handleSucces();
        // }, 500);
    };
    console.log(departements);
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Succes!
               </Alert>
            </Snackbar>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <Card style={{ backgroundColor: 'white' }}>
                    <div style={{ display: "flex", padding: "0px 25px" }}>
                        <div>
                            <form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="departement_name"
                                    label="Departement Name"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={departements.departement_name}
                                    onChange={handleInputChange}
                                    style={{ color: "white" }}
                                />
                            </form>
                        </div>
                    </div>
                </Card>
                <div style={{ paddingLeft: 10, display: "flex", justifyContent: 'space-between' }}>
                    <Tooltip title="Confirm" aria-label="confirm">
                        <IconButton style={{ fontSize: 10 }}
                            onClick={handleButton}
                        >
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" aria-label="cancel">
                        <IconButton style={{ fontSize: 10 }}
                            onClick={() => closeEditDialog()}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                    {save ? <div style={{ paddingTop: 15 }}> <CircularProgress size={20} /></div> : <div></div>}
                </div>
            </div>
        </div>
    );
};
export default EditDepartementForm;