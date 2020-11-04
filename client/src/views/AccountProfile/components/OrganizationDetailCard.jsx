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


import {
  OrganizationEditForm,
  Organization
} from '.';
import { EditAvatarForm } from "components";




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
  const { className, decodedToken, handleSaveEditButton,...rest } = props;

  const classes = useStyles();

  // const initialFormState = {
  //   organization_name: '',
  //   description: '',
  //   picture: '',
  //   email: '',
  // }

  const [organizationForm, setOrganizationForm] = useState(props.organization);
  useEffect(() => {
    setOrganizationForm(props.organization)
  }, [setOrganizationForm, props.organization]);


  // const { data: dataOrganization, refetch: organizationRefetch } = useQuery(ORGANIZATION_QUERY, {
  //   variables: { _id: decodedToken.organization_id },
  //   onCompleted: () => {
  //     if (dataOrganization.organization !== null) {
  //       setOrganization(dataOrganization.organization);
  //     }
  //   },
  // });


  // useEffect(() => {
  //   refresh();
  // });

  // const refresh = () => {
  //   organizationRefetch();
  // };
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

  const handleChange = event => {
    setOrganizationForm({
      ...organizationForm,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = () => {
    handleCloseEditPage();
    setOrganizationForm(props.organization)
  }

  const uploadImage = (e) => {
    setOrganizationForm({
      ...organizationForm,
      picture: e,
    });
  };


  const removeImage = (e) => {
    setOrganizationForm({
      ...organizationForm,
      picture: ' ',
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
            <Typography variant="body2" className={classes.title} style={{ color: 'white' }} component="p">
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
            <Typography gutterBottom variant="h5" component="h2" className={classes.title} style={{ color: 'white' }}>
              {organizationForm.organization_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.title} style={{ color: "cornflowerblue" }} component="p">
              {organizationForm.email}
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
                  picture={organizationForm.picture}
                  removeImage={removeImage}
                  size={100}
                />
              </div>
              :
              <div className={classes.avatarHeader}>
                <Avatar
                  className={classes.avatar}
                  src={organizationForm.picture}
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
            handleSaveEditButton={props.handleSaveEditButton}
            handleChange={handleChange}
            handleCancel={handleCancel}
            organizationForm={organizationForm}
            handleCloseEditPage={handleCloseEditPage} />
          :
          <Organization
            organization={organizationForm}
          />
      }
    </Card >
  );
};

OrganizationDetailCard.propTypes = {
  className: PropTypes.string
};

export default OrganizationDetailCard;
