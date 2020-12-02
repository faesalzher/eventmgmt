import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  // Avatar,
  CardHeader,

} from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';

import { EditAvatarForm } from 'components';


import {
  EDIT_ORGANIZATION,
} from 'gql';

const useStyles = makeStyles((theme) => ({
  root: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centerHeader: {
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


const OrganizationEditForm = props => {

  const classes = useStyles();
  // const [organizationForm, setOrganizationForm] = useState(organizationForm);
  const [editOrganization] = useMutation(EDIT_ORGANIZATION);


  const [organizationForm, setOrganizationForm] = useState(props.organization);
  useEffect(() => {
    setOrganizationForm(props.organization)
  }, [setOrganizationForm, props.organization]);

  const handleChangeOrganization = event => {
    setOrganizationForm({
      ...organizationForm,
      [event.target.name]: event.target.value
    });
  }

  const handleCancel = () => {
    props.handleCloseEditPage();
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

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(organizationForm);
    // setOrganizationForm(intitialFormState);
    props.handleCloseEditPage();
    editOrganization({
      variables:
      {
        _id: organizationForm._id,
        organization_name: organizationForm.organization_name,
        description: organizationForm.description,
        email: organizationForm.email,
        phone_number: organizationForm.phone_number,
        address: organizationForm.address,
        picture: organizationForm.picture,
      }
    });
  }

console.log(organizationForm)
  return (

    <form
      autoComplete="off"
      noValidate
    >
      <CardHeader
        className={classes.header}
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.centerHeader].join(" ")}>
              {organizationForm.organization_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.centerHeader].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {organizationForm.email}
            </Typography>
          </div>
        }
        avatar={
          <div style={{ padding: 10 }}>
            <div className={classes.avatarHeader}>
              <EditAvatarForm
                uploadImage={uploadImage}
                picture={organizationForm.picture}
                removeImage={removeImage}
                size={100}
              />
            </div>
          </div>
        }
      >
      </CardHeader>
      <CardContent style={{ backgroundColor: 'white' }}>
        <Grid
          container
          spacing={0}
        >
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Organization Name</Typography>
          </Grid>
          <Grid item md={9} sm={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="organization_name"
              onChange={handleChangeOrganization}
              value={organizationForm.organization_name}
              variant="outlined"
            />
          </Grid>

          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Organization Description</Typography>
          </Grid>
          <Grid item md={9} sm={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="description"
              onChange={handleChangeOrganization}
              value={organizationForm.description}
              variant="outlined"
            />
          </Grid>        
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Email</Typography>
          </Grid>
          <Grid item md={9} sm={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="email"
              label="Email"
              type="text"
              value={organizationForm.email || ''}
              onChange={handleChangeOrganization}
              variant="outlined"
            />
          </Grid>
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Phone Number</Typography>
          </Grid>
          <Grid item md={9} sm={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="phone_number"
              label="Phone Number"
              onChange={handleChangeOrganization}
              type="number"
              value={organizationForm.phone_number|| ''}
              variant="outlined"
            />
          </Grid>
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Address</Typography>
          </Grid>
          <Grid item sm={9} md={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="address"
              label="Address"
              onChange={handleChangeOrganization}
              value={organizationForm.address|| ''}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white' }}>
        <div>
          <Button
            onClick={() => handleCancel()}
          >
            Cancel
               </Button>
          <Button
            color="secondary"
            variant="contained"
            disabled={
              organizationForm.organization_name === "" ?
                true : false

            }
            onClick={() => handleSaveEditButton()}
          >
            Save
              </Button>
        </div>
      </CardActions>
    </form >
  );
};

OrganizationEditForm.propTypes = {
  className: PropTypes.string
};

export default OrganizationEditForm;
