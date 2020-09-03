import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import {
  PasswordChangeForm
} from '.';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const [values, setValues] = useState({
    firstName: 'Faesal',
    position_name: 'Staff',
    departement: 'Keuangan',
    email: 'faesal@student.ub.ac.id',
    phone: '081615627998',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <TextField
                fullWidth
                label="Position name"
                margin="dense"
                name="position"
                disabled
                onChange={handleChange}
                value={values.position}
                variant="outlined"
              /> */}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Position Name"
                margin="dense"
                name="position_name"
                onChange={handleChange}
                disabled
                value={values.position_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Departement"
                margin="dense"
                name="departement"
                onChange={handleChange}
                disabled
                value={values.departement}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions style={{display:'flex', justifyContent:'flex-end'}}>
          <Button
            color="primary"
            onClick={handleOpenEditModal}
          >
            Change Password
          </Button>
          <Button
            color="primary"
          >
            Save
          </Button>
          <PasswordChangeForm
            open={openEditModal}
            close={handleCloseEditModal}
          />
        </CardActions>
      </form>
    </Card>
  );
};

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
