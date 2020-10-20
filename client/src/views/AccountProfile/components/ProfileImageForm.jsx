import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  // LinearProgress
} from '@material-ui/core';
import { EditImageForm } from "components";

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    marginBottom: 0,
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    // marginRight: theme.spacing(2)
    fontSize: 10
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [profileForm, setProfileForm] = useState(props.profile)
  useEffect(() => {
    setProfileForm(props.profile)
  }, [props.profile, profileForm]);
  const [openEditImageModal, setOpenEditImageModal] = useState(false);
  const handleEditImageModal = () => {
    setOpenEditImageModal(true);
  };

  const handleCloseEditImageModal = () => {
    setOpenEditImageModal(false);
  };

  const uploadImage = (e) => {
    setProfileForm({
      ...profileForm,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setProfileForm({
      ...profileForm,
      picture: 'null',
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <EditImageForm
        open={openEditImageModal}
        uploadImage={uploadImage}
        removeImage={removeImage}
        // handleDelete={handleDelete}
        close={handleCloseEditImageModal}
      />
      <CardContent>
        <div className={classes.details}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Avatar
              className={classes.avatar}
              src={profileForm.picture}
            />
            <Button
              className={classes.uploadButton}
              color="primary"
              variant="text"
              onClick={() => handleEditImageModal()}
            >
              Upload a picture
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Typography
              // gutterBottom
              variant="h4"
            >
              {profileForm.staff_name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profileForm.position_name} of
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {props.departement_name} at
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src={"/images/avatars/avatar_11.png"}
                className={classes.organization}
              />
              <Typography
                className={classes.organization}
                color="textSecondary"
                variant="body1"
              >
                {props.organization_name}
            </Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <Divider />
      {/* <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
