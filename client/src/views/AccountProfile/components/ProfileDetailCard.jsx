import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  Divider,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  ProfileEditForm,
  Profile
} from '.';
import { EditImageForm } from "components";

const useStyles = makeStyles(theme => ({
  root: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    marginBottom: 0,
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  uploadButton: {
    // marginRight: theme.spacing(2)
    fontSize: 10
  },
  [theme.breakpoints.down('xs')]: {
    header: {
      display: 'block'
    },
    avatarHeader: {
      display: 'flex',
      justifyContent: 'center'
    },
    title: {
      textAlign: 'center'
    }
  }
}));

const ProfileDetailCard = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [profileForm, setProfileForm] = useState(props.profile)
  useEffect(() => {
    setProfileForm(props.profile)
  }, [props.profile, profileForm]);

  const [openEditPage, setOpenEditPage] = useState(false)
  // const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditPage = () => {
    setOpenEditPage(true);
  };

  const handleCloseEditPage = () => {
    setOpenEditPage(false);
  };

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
      <CardHeader
        className={classes.header}
        subheader={
          <div>
            <Typography variant="body2" className={classes.title} color="textSecondary" component="p">
              {props.profile.position_name}{" of "}{props.departement_name}{" departement"}
            </Typography>
            <Typography
              className={[classes.organization, classes.title].join(" ")}
              color="textSecondary"
              variant="body1"
            >
              {props.organization_name}
            </Typography>
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              {props.profile.staff_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.title} style={{ color: "cornflowerblue" }} component="p">
              {props.profile.email}
            </Typography>
          </div>
        }
        action={
          openEditPage ?
            <div></div>
            :
            <div className={classes.title}>
              <Tooltip arrow title="Edit Profile" aria-label="confirm">
                <IconButton onClick={handleOpenEditPage}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
        }
        avatar={
          <div>
            <div className={classes.avatarHeader}>
              <Avatar
                className={classes.avatar}
                src={"profileForm.picture"}
              />
            </div>
            {openEditPage ?
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className={classes.uploadButton}
                  size="small"
                  color="primary"
                  variant="text"
                  onClick={() => handleEditImageModal()}
                >
                  Upload a picture
          </Button>
              </div> : <div></div>}
          </div>
        }
      >
      </CardHeader>
      <Divider />
      {
        openEditPage ?
          <ProfileEditForm
            profile={props.profile}
            departement_name={props.departement_name}
            organization_name={props.organization_name}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Profile
            profile={props.profile}
            organization_name={props.organization_name}
            departement_name={props.departement_name}
          />
      }
    </Card >
  );
};

ProfileDetailCard.propTypes = {
  className: PropTypes.string
};

export default ProfileDetailCard;
