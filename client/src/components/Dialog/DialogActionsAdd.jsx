import MuiDialogActions from '@material-ui/core/DialogActions';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import {
    Button,
    // IconButton,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const DialogActionsMui = withStyles(theme => ({
    root: {
        margin: 0,
        padding: '10px 16px',
    },
}))(MuiDialogActions);


export default function DialogActionsAdd(props) {
    const [save, setSave] = useState(false)

    const handleSaveButton = () => {
        setSave(true)
        setTimeout(() => {
            setSave(false)
        }, 400);
        props.submit()
    }


    return <DialogActionsMui  >
        {
            <div>
                <Button color="secondary" onClick={props.close}>
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
        }

    </DialogActionsMui>;
}