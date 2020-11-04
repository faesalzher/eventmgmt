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
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { EditAvatarForm } from 'components';
import {
  ProfileEditForm,
  Profile
} from '.';



const useStyles = makeStyles(theme => ({
  root: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  avatar: {
    // margin: 10,
    // marginBottom: 0,
    height: 100,
    width: 100,
    // flexShrink: 0,
    // flexGrow: 0,
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.white
  },
  subheader: {
    color: theme.palette.divider
  },
  [theme.breakpoints.down('xs')]: {
    header: {
      display: 'block'
    },
    avatarHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 16
    },
    title: {
      textAlign: 'center'
    }
  }
}));


const ProfileDetailCard = props => {
  const { className, decodedToken,profile, departement, organization, handleSaveEditButton,...rest } = props;
  const classes = useStyles();

  const [profileForm, setProfileForm] = useState(props.profile);
  useEffect(() => {
    setProfileForm(props.profile)
  }, [setProfileForm, props.profile]);


  const [openEditPage, setOpenEditPage] = useState(false)
  // const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditPage = () => {
    setOpenEditPage(true);
  };

  const handleCloseEditPage = () => {
    setOpenEditPage(false);
  };

  const handleChange = event => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value
    });
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
      picture: ' ',
    });
  };

  const handleCancel = () => {
    handleCloseEditPage();
    setProfileForm(props.profile)
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        subheader={
          <div>
            <Typography variant="body2" className={[classes.subheader, classes.center].join(" ")} color="textSecondary" component="p">
              {profileForm.position_name}{" of "}{props.departement.departement_name}{" departement"}
            </Typography>
            <Typography
              className={[classes.organization, classes.subheader, classes.center].join(" ")}
              color="textSecondary"
              variant="body1"
            >
              {props.organization.organization_name}
            </Typography>
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.center].join(" ")}>
              {profileForm.staff_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.center].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {profileForm.email}
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
          <div style={{ padding: 10 }}>
            {openEditPage ?
              <div className={classes.avatarHeader}>
                <EditAvatarForm
                  uploadImage={uploadImage}
                  picture={profileForm.picture}
                  removeImage={removeImage}
                  size={100}
                />
              </div>
              :
              <div className={classes.avatarHeader}>
                <Avatar
                  className={classes.avatar}
                  src={profileForm.picture}
                />
              </div>
            }
          </div>
        }
      >
      </CardHeader>
      <Divider />
      {
        openEditPage ?
          <ProfileEditForm
            profileForm={profileForm}
            departement_name={props.departement.departement_name}
            organization_name={props.organization.organization_name}
            handleSaveEditButton={props.handleSaveEditButton}
            handleChange={handleChange}
            handleCancel={handleCancel}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Profile
            profile={profileForm}
            organization_name={props.organization.organization_name}
            departement_name={props.departement.departement_name}
          />
      }
    </Card >
  );
};

ProfileDetailCard.propTypes = {
  className: PropTypes.string
};

export default ProfileDetailCard;
