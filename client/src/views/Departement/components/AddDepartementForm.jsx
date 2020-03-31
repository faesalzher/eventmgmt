import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import {
    Button,
    IconButton,
} from '@material-ui/core';
import { useMutation, 
} from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';


const ADD_DEPARTEMENT = gql`
  mutation addDepartement($_id: String!,$departement_name: String!) {
    addDepartement(_id: $_id,departement_name: $departement_name) {
      _id
      departement_name
    }
  }
`;

const mongoose = require('mongoose');
const AddDepartementForm = (props) => {
    // const classes = useStyles();
    const initialFormState =
    {
        _id: mongoose.Types.ObjectId(),
        departement_name: "",
    };

    const [departements, setDepartements] = useState(initialFormState);
    const [addButton, setAddButton] = useState(true);

    const handleAddButton = () => {
        setAddButton(false);
    }
    const handleInputChange = e => {
        const { id, value } = e.target;
        setDepartements({ ...departements, [id]: value });
    };

    const [addDepartement] = useMutation(ADD_DEPARTEMENT);
    const handleButton = e => {
        // setSave(true)
        // setTimeout(() => {
        props.addDepartement(departements);
        e.preventDefault();
        addDepartement(
            {
                variables:
                {
                    _id: departements._id,
                    departement_name: departements.departement_name,
                }
            });
        setDepartements(initialFormState);
        setAddButton(true);
        // }, 400);
        // setTimeout(() => {
        //     setSave(false)
        // }, 400);
    };

    return (
        <div>
            {(addButton) ? (
                <div style={{ display: 'flex', height:46 ,backgroundColor:'orange'}}>
                    <Button onClick={handleAddButton}>
                        <AddIcon style={{ fontSize: 25 }}></AddIcon>
                    </Button>
                </div>
            ) : (
                    <div style={{ display: 'flex' }}>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="departement_name"
                                label="Departement Name"
                                type="text"
                                variant="outlined"
                                value={departements.departement_name}
                                onChange={handleInputChange}
                            />
                        </form>
                        <IconButton onClick={handleButton}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={() => setAddButton(true)}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                )}
        </div>
    );
};
export default AddDepartementForm;