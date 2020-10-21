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

const OrganizationEditForm = props => {

  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const [organization, setOrganization] = useState(props.organization);

  const handleChange = event => {
    setOrganization({
      ...organization,
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
          spacing={0}
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
              name="organization_name"
              onChange={handleChange}
              value={organization.organization_name}
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
              value={organization.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className={classes.center}
          >
            <Typography variant="subtitle2">Description</Typography>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField
              fullWidth
              margin="dense"
              name="description"
              onChange={handleChange}
              value={organization.description}
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

OrganizationEditForm.propTypes = {
  className: PropTypes.string
};

export default OrganizationEditForm;
