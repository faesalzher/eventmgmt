import MuiDialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import { withStyles } from '@material-ui/styles';

const DialogContentMui = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        // width: 700,
        // minWidth: 20
    },
}))(MuiDialogContent);

export default function DialogContent(props) {
    return <DialogContentMui dividers style={props.style}>{props.children}</DialogContentMui>;
}