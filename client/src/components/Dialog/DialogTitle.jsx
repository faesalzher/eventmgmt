import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
    Typography,
    IconButton,
  } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const DialogTitleMui = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{ textAlign: "center", color: "white" }}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function DialogTitle(props) {
    return <DialogTitleMui onClose={props.onClose} id={props.title}>{props.title}</DialogTitleMui>;
}