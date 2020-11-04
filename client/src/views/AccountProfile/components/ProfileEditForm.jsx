import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  PasswordChangeForm
} from '.';

const EDIT_STAFF = gql`
  mutation editStaff(
    $_id: String!,
    $staff_name: String!,
    $position_name: String!,
    $email: String!,
    $phone_number: String!,
    $password: String!,
    $picture: String!,
    $departement_id: String!,
    $organization_id: String!,
    ){
    editStaff(
      _id: $_id,
      staff_name: $staff_name,
      position_name: $position_name,
      email:$email,
      phone_number:$phone_number,
      password:$password,
      picture:$picture,
      departement_id:$departement_id,
      organization_id:$organization_id,
    ){
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

const useStyles = makeStyles(() => ({
  root: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

const ProfileEditForm = props => {

  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [profileForm, setProfileForm] = useState(props.profileForm);
  const [editStaff] = useMutation(EDIT_STAFF);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };



  const handleSaveEditButton = () => {
    props.handleSaveEditButton(props.profileForm)
    // setOrganizationForm(intitialFormState);
    props.handleCloseEditPage();
    editStaff({
      variables:
      {
        _id: props.profileForm._id,
        staff_name: props.profileForm.staff_name,
        position_name: props.profileForm.position_name,
        email: props.profileForm.email,
        phone_number: props.profileForm.phone_number,
        password: props.profileForm.password,
        picture: props.profileForm.picture,
        departement_id: props.profileForm.departement_id,
        organization_id: props.profileForm.organization_id,
      }
    });
  }

  const handleCancel = () => {
    props.handleCancel()
  }

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <CardContent>
        <Grid
          container
          spacing={0}
        >

          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Name</Typography>
          </Grid>
          <Grid
            item
            sm={9}
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="staff_name"
              onChange={props.handleChange}
              value={props.profileForm.staff_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Email</Typography>
          </Grid>
          <Grid
            item
            md={9}
            sm={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="email"
              onChange={props.handleChange}
              value={props.profileForm.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Phone Number</Typography>
          </Grid>
          <Grid
            item
            md={9}
            sm={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="phone_number"
              onChange={props.handleChange}
              type="number"
              value={props.profileForm.phone_number}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Position Name</Typography>
          </Grid>
          <Grid
            item
            sm={9}
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="position_name"
              onChange={props.handleChange}
              disabled
              value={props.profileForm.position_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Departement</Typography>
          </Grid>
          <Grid
            item
            md={9}
            sm={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="departement_id"
              onChange={props.handleChange}
              disabled
              value={props.departement_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Organization</Typography>
          </Grid>
          <Grid
            item
            md={9}
            sm={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="organization_id"
              onChange={props.handleChange}
              disabled
              value={props.organization_name}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          color="primary"
          onClick={handleOpenEditModal}
        >
          Change Password
          </Button>

        <div style={{ display: 'flex' }}>
          {
            <div>
              <Button
                onClick={() => handleCancel()}
              >
                Cancel
               </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleSaveEditButton()}
              >
                Save
              </Button>
            </div>
          }
          <PasswordChangeForm
            open={openEditModal}
            close={handleCloseEditModal}
          />
        </div>
      </CardActions>
    </form>
  );
};

ProfileEditForm.propTypes = {
  className: PropTypes.string
};

export default ProfileEditForm;
