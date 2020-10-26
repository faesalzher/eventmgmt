import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";

import image from "assets/default-placeholder.png";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { EditImageModal } from "components";

const useStyles = makeStyles(theme => ({
  removeBtn: {
    color: theme.palette.error.main,
    marginBottom: 5,
    width: "-webkit-fill-available",
  },
  image: {
    position: "relative",
    // height: 200,
    // width: "-webkit-fill-available",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 200,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 1
      }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function EditAvatarForm(props) {
  const classes = useStyles();
  const [openEditImageModal, setOpenEditImageModal] = useState(false);

  const handleCloseEditImageModal = () => {
    setOpenEditImageModal(false);
  };

  const handleEditImageModal = () => {
    setOpenEditImageModal(true);
  }

  const removeImage = (e) => {
    props.removeImage();
    handleCloseEditImageModal();
  };

  const uploadImage = (e) => {
    props.uploadImage(e);
    handleCloseEditImageModal();
  };


  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <IconButton
        focusRipple
        focusVisibleClassName={classes.focusVisible}
        className={classes.image}
        style={{
          width: image.width,
          padding: 0
        }}
        onClick={handleEditImageModal}
      >
        <Avatar
          style={{
            margin: 0,
            width: props.size,
            height: props.size,
          }}
        >
          <span
            className={classes.imageSrc}
            style={
              props.picture === ' ' ?
                {
                  backgroundColor: '#e0e0e0',
                } :
                {
                  backgroundImage: `url(${props.picture})`,
                }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <PhotoCamera />
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </Avatar>
      </IconButton>
      <EditImageModal
        open={openEditImageModal}
        close={handleCloseEditImageModal}
        picture={props.picture}
        removeImage={removeImage}
        uploadImage={uploadImage}
      />
    </div>
  );
}
