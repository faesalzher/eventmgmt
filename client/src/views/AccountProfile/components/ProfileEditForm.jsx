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
  MenuItem,
  // Avatar,
  CardHeader,

} from '@material-ui/core';

import { useMutation, useQuery } from '@apollo/react-hooks';

import { EditAvatarForm } from 'components';
import {
  PasswordChangeForm
} from '.';
import validate from 'validate.js';

import {
  EDIT_STAFF,
  DEPARTEMENTS_QUERY,
  DEPARTEMENT_POSITIONS_QUERY,
  DEPARTEMENT_QUERY,
  DEPARTEMENT_POSITION_QUERY,
  CHECK_STAFF,
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

const schema = {
  email: {
    // presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
};

const ProfileEditForm = props => {

  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [profileForm, setProfileForm] = useState(profileForm);
  const [editStaff] = useMutation(EDIT_STAFF);

  const [departement, setDepartement] = useState([]);
  const [departementPosition, setDepartementPosition] = useState([]);
  const [profile, setProfile] = useState(props.profile);
  useEffect(() => {
    setProfile(props.profile)
  }, [setProfile, props.profile]);

  const defaultState = {
    isValid: false,
    values: profile,
    touched: {},
    errors: {}
  };

  const [profileForm, setProfileForm] = useState(defaultState);


  const { data: departementData, refetch: departementRefetch } = useQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: profileForm.values.departement_id },
    onCompleted: () => {
      if (departementData !== undefined && departementData.departement !== null) {
        setDepartement(departementData.departement)
      }

    }
  }
  );

  const { data: departementPositionData, refetch: departementPositionRefetch } = useQuery(DEPARTEMENT_POSITION_QUERY, {
    variables: { _id: profileForm.values.departement_position_id },
    onCompleted: () => {
      if (departementPositionData && departementPositionData.departement_position !== null) {
        setDepartementPosition(departementPositionData.departement_position)
      }

    }
  }
  );

  const [departements, setDepartements] = useState([]);
  const { data: departementsData, refetch: departementsRefetch } = useQuery(DEPARTEMENTS_QUERY, {
    variables: { organization_id: props.decodedToken.organization_id },
    onCompleted: () => {
      setDepartements(
        departementsData.departements
      )
    }
  }
  );

  const [departementPositions, setDepartementPositions] = useState([]);
  const { data: departementPositionsData, refetch: departementPositionsRefetch } = useQuery(DEPARTEMENT_POSITIONS_QUERY, {
    variables: { organization_id: props.decodedToken.organization_id },
    onCompleted: () => {
      setDepartementPositions(
        departementPositionsData.departement_positions
      )
    }
  }
  );


  const [staff, setStaff] = useState([])
  const { data: dataStaff, loading: loadingStaff, error: errorStaff, refetch: refetchStaff } = useQuery(CHECK_STAFF,
    {
      variables: { email: profileForm.values.email, },
    });

  useEffect(() => {
    const onCompleted = (dataStaff) => { setStaff(dataStaff.check_staff) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loadingStaff && !errorStaff) {
        onCompleted(dataStaff);
      } else if (onError && !loadingStaff && errorStaff) {
        onError(errorStaff);
      }
    }
  }, [loadingStaff, dataStaff, errorStaff]);


  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementsRefetch();
    departementPositionsRefetch();
    departementRefetch();
    departementPositionRefetch();
    refetchStaff();
  };


  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    const errors = validate(profileForm.values, schema);
    if (staff.length !== 0 && profileForm.values.email !== props.profile.email) {
      setProfileForm(profileForm => ({
        ...profileForm, isValid: false, errors: { ...profileForm.errors, email: ["Email already registered"] } || {}
      }));
      // handleError();
    } else {
      setProfileForm(profileForm => ({
        ...profileForm, isValid: errors ? false : true, errors: errors || {}
      }));
    }
  }, [profileForm.values, staff.length, props.profile.email]);

  const handleChangeProfile = event => {
    // setProfileForm({
    //   ...profileForm.values,
    //   [event.target.name]: event.target.value
    // });
    const { name, value } = event.target;
    setProfileForm(profileForm => ({
      ...profileForm, values: {
        ...profileForm.values, [name]: value
      },
      touched: {
        ...profileForm.touched, [name]: true
      }
    }));
  };


  const handleCancel = () => {
    props.handleCloseEditPage();
    setProfileForm(props.profile)
  }



  const uploadImage = (e) => {
    setProfileForm(profileForm => ({
      ...profileForm, values: {
        ...profileForm.values, picture: e
      },
    }));
  };

  const removeImage = (e) => {
    setProfileForm(profileForm => ({
      ...profileForm, values: {
        ...profileForm.values, picture: ' '
      },
    }));
  };

  const handleSaveEditButton = () => {
    props.handleSaveEditButton(profileForm.values);
    // setOrganizationForm(intitialFormState);
    props.handleCloseEditPage();
    editStaff({
      variables:
      {
        _id: profileForm.values._id,
        staff_name: profileForm.values.staff_name,
        position_name: profileForm.values.position_name,
        email: profileForm.values.email,
        phone_number: profileForm.values.phone_number,
        password: profileForm.values.password,
        picture: profileForm.values.picture,
        is_admin: profileForm.values.is_admin,
        departement_position_id: profileForm.values.departement_position_id,
        departement_id: profileForm.values.departement_id,
        organization_id: profileForm.values.organization_id,
      }
    });
  }

  const handleSaveEditPasswordButton = e => {
    setProfileForm(profileForm => ({
      ...profileForm, values: {
        ...profileForm.values, password: e
      },
    }));
  }

  const hasError = field =>
    profileForm.touched[field] && profileForm.errors[field] ? true : false;

  return (

    <form
      autoComplete="off"
      noValidate
    >
      <CardHeader
        className={classes.header}
        subheader={
          <div>
            <Typography variant="body2" className={[classes.subheader, classes.centerHeader].join(" ")} color="textSecondary" component="p">
              {profileForm.values.departement_position_id !== "" || profileForm.values.departement_id !== "" ?
                departementPosition.departement_position_name + " " + departement.departement_name
                :
                ""
              }
            </Typography>
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.centerHeader].join(" ")}>
              {profileForm.values.staff_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.centerHeader].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {profileForm.values.email}
            </Typography>
          </div>
        }
        avatar={
          <div style={{ padding: 10 }}>
            <div className={classes.avatarHeader}>
              <EditAvatarForm
                uploadImage={uploadImage}
                picture={profileForm.values.picture}
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
            <Typography variant="subtitle2">Name</Typography>
          </Grid>
          <Grid item sm={9} md={9} xs={12}          >
            <TextField
              fullWidth
              margin="dense"
              name="staff_name"
              onChange={handleChangeProfile}
              value={profileForm.values.staff_name}
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
              error={hasError('email')}
              helperText={
                hasError('email') ? profileForm.errors.email[0] : null
              }
              label="Email"
              type="text"
              value={profileForm.values.email || ''}
              onChange={handleChangeProfile}
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
              onChange={handleChangeProfile}
              type="number"
              value={profileForm.values.phone_number}
              variant="outlined"
            />
          </Grid>
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Position</Typography>
          </Grid>
          <Grid item sm={9} md={9} xs={12}          >
            {/* <TextField
              fullWidth
              margin="dense"
              name="position_name"
              onChange={handleChangeProfile}
              disabled
              value={profileForm.values.position_name}
              variant="outlined"
            /> */}
            <TextField
              margin="dense"
              fullWidth
              name="departement_position_id"
              label="Position"
              select
              disabled={props.decodedToken.user_type === "organization" ? false : true}
              variant="outlined"
              value={profileForm.values.departement_position_id}
              onChange={handleChangeProfile}
            >
              {departementPositions.map((departementPosition) => (
                <MenuItem key={departementPosition.departement_position_name} value={departementPosition._id}>
                  {departementPosition.departement_position_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={3} sm={3} xs={12} className={classes.center}          >
            <Typography variant="subtitle2">Departement</Typography>
          </Grid>
          <Grid item md={9} sm={9} xs={12}          >
            <TextField
              fullWidth
              name="departement_id"
              select
              size="small"
              margin="dense"
              style={{ backgroundColor: 'white' }}
              label="Departement"
              disabled={props.decodedToken.user_type === "organization" ? false : true}
              value={profileForm.values.departement_id}
              onChange={handleChangeProfile}
              // helperText="Please select your currency"
              variant="outlined"
            >
              {departements.map((departement) => (
                <MenuItem key={departement.departement_name} value={departement._id}>
                  {departement.departement_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
        <Button
          color="secondary"
          variant="outlined"
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
                disabled={
                  props.decodedToken.user_type === "staff" ?
                    (profileForm.values.staff_name === "" ||
                      profileForm.values.email === "" ||
                      profileForm.values.phone_number === "") ||
                      !profileForm.isValid ? true : false
                    :
                    ((
                      profileForm.values.staff_name === "" ||
                      profileForm.values.departement_id === "" ||
                      profileForm.values.departement_position_id === "" ||
                      profileForm.values.email === "" ||
                      profileForm.values.phone_number === "") ||
                      !profileForm.isValid ?
                      true : false
                    )
                }
                onClick={() => handleSaveEditButton()}
              >
                Save
              </Button>
            </div>
          }
          <PasswordChangeForm
            open={openEditModal}
            profile={profile}
            handleSaveEditPasswordButton={handleSaveEditPasswordButton}
            close={handleCloseEditModal}
          />
        </div>
      </CardActions>
    </form >
  );
};

ProfileEditForm.propTypes = {
  className: PropTypes.string
};

export default ProfileEditForm;
