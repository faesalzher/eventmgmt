import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import {
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BackupIcon from "@material-ui/icons/Backup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";


const useStyles = makeStyles(theme => ({
  removeBtn: {
    color: theme.palette.error.main,
    marginBottom: 5,
    width: "-webkit-fill-available",
  },
}));

export default function EditImageModal(props) {
  const classes = useStyles();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "oj5r0s34");

    axios.request({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/sime/image/upload",
      data: data,
      onUploadProgress: (p) => {
        setUploadPercentage((p.loaded / p.total) * 100);
      },
    })
      .then((data) => {
        props.uploadImage(data.data.secure_url);
        props.close();
        setUploadPercentage(0);
      });
  };

  const removeImage = () => {
    props.removeImage();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Choose Edit Picture Action
        </DialogTitle>
      <DialogContent style={{ display: "grid" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={uploadImage}
        />
        <label htmlFor="icon-button-file">
          {uploadPercentage === 0 ? (
            <div></div>
          ) : (
              <LinearProgress variant="determinate" value={uploadPercentage} />
            )}
          <Button
            color="primary"
            aria-label="upload picture"
            variant="outlined"
            style={{
              marginBottom: 5,
              marginTop: 5,
              width: "-webkit-fill-available",
            }}
            startIcon={<BackupIcon />}
            component="span"
          >
            Upload Image
            </Button>
        </label>
        {props.picture !== " "
          ?
          <Button
            color="secondary"
            className={classes.removeBtn}
            variant="outlined"
            startIcon={<HighlightOffIcon />}
            onClick={() => removeImage()}
          >
            Remove Picture
        </Button>
          :
          <div></div>
        }
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
