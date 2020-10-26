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

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  OrganizationEditForm,
  Organization
} from '.';
import { EditAvatarForm } from "components";


const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      organization_name
      email
      description
      password
      picture
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
    // margin: 10,
    // marginBottom: 0,
    height: 100,
    width: 100,
    // flexShrink: 0,
    // flexGrow: 0
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
    backgroundColor: theme.palette.primary.main
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


const OrganizationDetailCard = props => {
  const { className, decodedToken, ...rest } = props;

  const classes = useStyles();

  const initialFormState = {
    organization_name: '',
    description: '',
    picture: '',
    email: '',
  }

  const [organization, setOrganization] = useState(initialFormState)


  const { data: dataOrganization, refetch: organizationRefetch } = useQuery(ORGANIZATION_QUERY, {
    variables: { _id: decodedToken.organization_id },
    onCompleted: () => {
      if (dataOrganization.organization !== null) {
        setOrganization(dataOrganization.organization);
      }
    },
  });


  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    organizationRefetch();
  };
  // console.log(organization)
  // console.log(dataOrganization)

  // useEffect(() => {
  //   setOrganization(props.organization)
  // }, [props.organization, organization]);

  const [openEditPage, setOpenEditPage] = useState(false)
  // const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditPage = () => {
    setOpenEditPage(true);
  };

  const handleCloseEditPage = () => {
    setOpenEditPage(false);
  };

  const uploadImage = (e) => {
    setOrganization({
      ...organization,
      picture: e,
    });
  };
  console.log(organization.picture)

  const removeImage = (e) => {
    setOrganization({
      ...organization,
      picture: 'null',
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        subheader={
          <div>
            <Typography variant="body2" className={classes.title} style={{color:'white'}} component="p">
              {'Admin account '}
            </Typography>
            {/* <Typography
              className={[classes.organization, classes.title].join(" ")}
              color="textSecondary"
              variant="body1"
            >
              {organization.organization_name}
            </Typography> */}
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title} style={{color:'white'}}>
              {organization.organization_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.title} style={{ color: "cornflowerblue" }} component="p">
              {organization.email}
            </Typography>
          </div>
        }
        action={
          openEditPage ?
            <div></div>
            :
            <div className={classes.title}>
              <Tooltip arrow title="Edit Organization" aria-label="confirm">
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
                  picture={organization.picture}
                  removeImage={removeImage}
                  size={100}
                />
              </div>
              :
              <div className={classes.avatarHeader}>
                <Avatar
                  className={classes.avatar}
                  src={organization.picture}
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
          <OrganizationEditForm
            organization={organization}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Organization
            organization={organization}
          />
      }
    </Card >
  );
};

OrganizationDetailCard.propTypes = {
  className: PropTypes.string
};

export default OrganizationDetailCard;
