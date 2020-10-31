import React from "react";
// import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Avatar,
} from "@material-ui/core";


// const useStyles = makeStyles(theme => ({
//   popover: {
//     pointerEvents: 'none',
//   },
//   paper: {
//     padding: theme.spacing(1),
//   },
// }));

export default function AvatarName(props) {
  // const classes = useStyles();
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
      <Avatar style={{ width: 30, height: 30 }} src={
        // (props.name !== null) ?
        props.picture
        // :
        // ""
      } />
      <Typography variant="body1"
        style={{
          display: 'flex', flexDirection: 'column', margin: "0px 10px", justifyContent: "center"
        }}>
        {(props.name !== null) ?
          props.name
          :
          "-"
        }
      </Typography>
    </div>
  );
}
