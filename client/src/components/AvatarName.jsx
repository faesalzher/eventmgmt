import React from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Avatar,
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  avatar: {
    width: 30,
    height: 30
  },
  text: {
    display: 'flex', flexDirection: 'column', margin: "0px 10px", justifyContent: "center"
  },
}));

export default function AvatarName(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div style={{ display: 'flex' }}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Avatar style={props.style} className={classes.avatar} src={
        // (props.name !== null) ?
        props.picture
        // :
        // ""
      } />
      <Typography variant="body1"
        className={classes.text}
        style={props.style}>
        {(props.name !== null) ?
          props.name
          :
          "-"
        }
      </Typography>
    </div>
  );
}
