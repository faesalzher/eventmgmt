import MuiDialogActions from '@material-ui/core/DialogActions';
import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
    Button,
    // IconButton,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    DeleteForm
} from 'components';

const DialogActionsMui = withStyles(theme => ({
    root: {
        margin: 0,
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    },
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
    deleteBtn: {
        color: theme.palette.error.main
    }
}));

export default function DialogActionsEdit(props) {
    const classes = useStyles();
    const [save, setSave] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleSaveButton = () => {
        setSave(true)
        setTimeout(() => {
            setSave(false)
            props.submit()
        }, 400);
    }

    const handleDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleDelete = () => {
        props.delete();
    }

    return <DialogActionsMui  >
        <Button
            variant="outlined"
            size="small"
            className={classes.deleteBtn}
            onClick={handleDeleteModal}>
            Delete
                    </Button>
        <DeleteForm
            open={openDeleteModal}
            handleDelete={handleDelete}
            close={handleCloseDeleteModal}
        />
        <div style={{ display: 'flex' }}>
            <Button size="small" color="secondary" onClick={props.close}>
                Cancel
                    </Button>
            <Button
                color="secondary"
                variant="contained"
                disabled={props.validation === "invalid" ? true : false}
                onClick={() => handleSaveButton()}>
                {save ? <CircularProgress style={{ color: 'white' }} size={20} /> : <div>Save</div>}
            </Button>
        </div>
    </DialogActionsMui>;
}