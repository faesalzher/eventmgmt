import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/styles';
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

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  ProfileEditForm,
  Profile
} from '.';
import { EditImageForm } from "components";


const STAFFSBYID_QUERY = gql`
query staffById($staff_id: String!){
  staffById(_id:$staff_id) {
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
      organization_id
  }
}
`;

const DEPARTEMENT_QUERY = gql`
query departememt($departement_id: String!){
  departement(_id:$departement_id) {
      departement_name
  }
}
`;

const ORGANIZATION_QUERY = gql`
  query organization($_oid: String!) {
    organization(_id: $_oid) {
      organization_name
    }
  }
`;


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
      justifyContent: 'center'
    },
    center: {
      textAlign: 'center'
    }
  }
}));


const ProfileDetailCard = props => {
  const { className, decodedToken, ...rest } = props;
  const classes = useStyles();

  const initialFormState = {
    staff_name: '',
    position_name: '',
    departement_id: '',
    email: '',
    phone_number: '',
    organization_id: ""
  }

  const [profile, setProfile] = useState(initialFormState)
  const [departement, setDepartement] = useState({});
  const [organization, setOrganization] = useState({});

  const { data: staffsData } = useQuery(STAFFSBYID_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    onCompleted: () => {
      if (decodedToken.user_type === 'organization') {

      } else {
        setProfile(
          staffsData.staffById
        )
        org();
        dept();
      }
    }
  }
  );

  const [org, { data: dataOrganization }] = useLazyQuery(ORGANIZATION_QUERY, {
    variables: { _oid: profile.organization_id },
    onCompleted: () => {
      if (dataOrganization.organization !== null) {
        setOrganization(dataOrganization.organization);
      }
    },
  });

  const [dept, { data: departementData }] = useLazyQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: profile.departement_id },
    onCompleted: () => {
      if (departementData.departement !== null) {
        setDepartement(departementData.departement)
      }

    }
  }
  );

  useEffect(() => {
    org();
    dept();
  }, [org, dept]);

  // const refresh = () => {
  //   staffsRefetch();
  // };
  // console.log(organization)
  // console.log(dataOrganization)

  // useEffect(() => {
  //   setProfile(props.profile)
  // }, [props.profile, profile]);

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
    setProfile({
      ...profile,
      picture: e,
    });
  };

  const removeImage = (e) => {
    setProfile({
      ...profile,
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
            <Typography variant="body2" className={[classes.subheader, classes.center].join(" ")} color="textSecondary" component="p">
              {profile.position_name}{" of "}{departement.departement_name}{" departement"}
            </Typography>
            <Typography
              className={[classes.organization, classes.subheader, classes.center].join(" ")}
              color="textSecondary"
              variant="body1"
            >
              {organization.organization_name}
            </Typography>
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.center].join(" ")}>
              {profile.staff_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.center].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {profile.email}
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
                src={profile.picture}
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
            profile={profile}
            departement_name={departement.departement_name}
            organization_name={organization.organization_name}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Profile
            profile={profile}
            organization_name={organization.organization_name}
            departement_name={departement.departement_name}
          />
      }
    </Card >
  );
};

ProfileDetailCard.propTypes = {
  className: PropTypes.string
};

export default ProfileDetailCard;
