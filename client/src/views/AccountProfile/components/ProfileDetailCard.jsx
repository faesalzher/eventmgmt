import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  // CardHeader,
  // Divider,
  // Tooltip,
  // IconButton,
  // Avatar,
  // Typography,
} from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
// import { useQuery } from '@apollo/react-hooks';

// import { EditAvatarForm } from 'components';
import {
  ProfileEditForm,
  Profile
} from '.';
// import { 
//   DEPARTEMENT_QUERY,
//   DEPARTEMENT_POSITION_QUERY,
// } from 'gql';


const useStyles = makeStyles(theme => ({

}));


const ProfileDetailCard = props => {
  const { className, decodedToken, profile, organization, handleSaveEditButton, ...rest } = props;
  const classes = useStyles();
  

  const [openEditPage, setOpenEditPage] = useState(false)
  // const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditPage = () => {
    setOpenEditPage(true);
  };

  const handleCloseEditPage = () => {
    setOpenEditPage(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
          {
        openEditPage ?
          <ProfileEditForm
            decodedToken={decodedToken}
            organization={props.organization}
            profile={props.profile}
            // departement={departement}
            handleOpenEditPage={handleOpenEditPage}
            handleSaveEditButton={props.handleSaveEditButton}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Profile
            profile={props.profile}
            decodedToken={decodedToken}
            organization={props.organization}
            handleOpenEditPage={handleOpenEditPage}
            // departement={departement}
            // departementPosition={departementPosition}
          />
      }
    </Card >
  );
};

ProfileDetailCard.propTypes = {
  className: PropTypes.string
};

export default ProfileDetailCard;
