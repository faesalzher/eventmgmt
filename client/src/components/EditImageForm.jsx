import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BackupIcon from "@material-ui/icons/Backup";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

export default function EditImageForm(props) {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadImages = async (e) => {
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

  const removeImages = (e) => {
    props.removeImage();
    props.close();
  };

  return (
    <div>
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
            onChange={uploadImages}
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
          <Button
            color="secondary"
            variant="outlined"
            style={{ marginBottom: 5, width: "-webkit-fill-available" }}
            startIcon={<HighlightOffIcon />}
            onClick={() => removeImages()}
          >
            Remove Picture
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
