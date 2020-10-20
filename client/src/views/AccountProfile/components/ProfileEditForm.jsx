import React, { useState } from 'react';
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

import {
  PasswordChangeForm
} from '.';

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

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const [profile, setProfile] = useState(props.profile);

  const handleChange = event => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <CardContent>
        <Grid
          container
          spacing={0.5}
        >

          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Name</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="staff_name"
              onChange={handleChange}
              value={profile.staff_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Email</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="email"
              onChange={handleChange}
              value={profile.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Phone Number</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="phone_number"
              onChange={handleChange}
              type="number"
              value={profile.phone_number}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Position Name</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="position_name"
              onChange={handleChange}
              disabled
              value={profile.position_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Departement</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="departement_id"
              onChange={handleChange}
              disabled
              value={props.departement_name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Organization</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="organization_id"
              onChange={handleChange}
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
                color="primary"
                onClick={() => props.handleCloseEditPage()}
              >
                Cancel
            </Button>
              <Button
                color="primary"
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
