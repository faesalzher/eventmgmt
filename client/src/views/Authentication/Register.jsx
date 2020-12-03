import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  CircularProgress,
  // FormHelperText,
  // Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import signInImage from "assets/planer_desk.jpg";
import logo from 'assets/image.png'
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import uuid from 'uuid/v1';
import { CHECK_STAFF, ADD_ORGANIZATION, ADD_COMMITTEE, ADD_STAFF, ADD_POSITION } from 'gql';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const committeeName = [
  { committee_name: 'Panitia Inti', core: true },
  { committee_name: 'Program Subcommittee', core: false },
  { committee_name: 'Secretariat Subcommittee', core: false },
  { committee_name: 'Funding Subcommittee', core: false },
  { committee_name: 'Food Subcommittee', core: false },
  { committee_name: 'Security Subcommittee', core: false },
  { committee_name: 'Publication and Documentation Subcommittee', core: false },
  { committee_name: 'Equipment and Transportation Subcommittee', core: false },
]

const positionName = [
  { position_name: 'Penanggung Jawab', core: true, order: '0' },
  { position_name: 'Head Of Project', core: true, order: '1' },
  { position_name: 'Vice Head of Project', core: true, order: '2' },
  { position_name: 'Secretary', core: true, order: '3' },
  { position_name: 'Treasurer', core: true, order: '4' },
  { position_name: 'Vice Treasurer', core: true, order: '5' },
  { position_name: 'Coordinator', core: false, order: '6' },
  { position_name: 'Vice Coordinator', core: false, order: '7' },
  { position_name: 'Member', core: false, order: '8' },
]

const schema = {
  organization_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 8
    }
  },
  confirm_password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${signInImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.black,
    // paddingTop: 100,
    // fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(0),
    color: theme.palette.black,
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  registerButton: {
    margin: theme.spacing(2, 0)
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Register = props => {
  const { history } = props;

  const initialFormState = {
    _id: uuid(), email: "", description: "", picture: "",
  }
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    isValid: false,
    values: initialFormState,
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(form.values, schema);
    if (form.values.password !== form.values.confirm_password) {
      setForm(form => ({
        ...form, isValid: false, errors: errors || {}
      }));
    } else {
      setForm(form => ({
        ...form, isValid: errors ? false : true, errors: errors || {}
      }));
    }
  }, [form.values]);

  const handleChange = event => {
    event.persist();
    // if (form.values.password === form.values.confirm_password) {
    //   setForm(form => ({
    //     ...form, isValid: true
    //   }));
    // }
    setForm(form => ({
      ...form, values: {
        ...form.values, [event.target.name]: event.target.value
      },
      touched: {
        ...form.touched, [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const [register] = useMutation(ADD_ORGANIZATION);
  const [addCommittee] = useMutation(ADD_COMMITTEE);
  const [addStaff] = useMutation(ADD_STAFF);
  const [addPosition] = useMutation(ADD_POSITION);

  const [staff, setStaff] = useState({});
  const { loading: loadingCheck, error, data, refetch } = useQuery(CHECK_STAFF,
    {
      variables: { email: form.values.email },
      // onCompleted: () => { setCheck_organization(data.check_organization) }
      // onCompleted: () => { setStaff(data.check_organization) }
    });
  React.useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (data) => { setStaff(data.check_staff) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loadingCheck && !error) {
        onCompleted(data);
      } else if (onError && !loadingCheck && error) {
        onError(error);
      }
    }
  }, [loadingCheck, data, error]);

  const refresh = () => {
    refetch();
  };

  const handleRegister = event => {
    refetch();
    // checkOrganization();
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (staff.length !== 0) {
        setLoading(false)
        handleError();
      } else {

        bcrypt.hash(form.values.password, saltRounds, function (err, hash) {
          addStaff({
            variables: {
              _id: uuid(),
              staff_name: "Super Admin",
              email: form.values.email,
              phone_number: "",
              is_admin: true,
              password: hash,
              picture: "",
              position_name: "",
              departement_id: "",
              departement_position_id: "",
              organization_id: form.values._id,
            },
          });
          register({
            // update(proxy, result) {
            //   // console.log(result)
            // },
            variables: {
              _id: form.values._id,
              organization_name: form.values.organization_name,
              email: "",
              phone_number: "",
              address: "",
              description: "",
              picture: "",
            },
          });
          committeeName.forEach((committee) => {
            addCommittee({
              variables: {
                _id: uuid(),
                committee_name: committee.committee_name,
                core: committee.core,
                organization_id: form.values._id
              }
            })
          })
          positionName.forEach((position) => {
            addPosition({
              variables: {
                _id: uuid(),
                position_name: position.position_name,
                core: position.core,
                order: position.order,
                organization_id: form.values._id
              }
            })
          })
          setLoading(false)
          setForm(form => ({
            values: initialFormState, touched: {}, errors: {}, isValid: false
          }));
          handleSucces();
        });

        // history.push('/');
      }

    }, 1000);
  };

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false);

  const handleError = () => {
    setOpenErrorMsg(true);
  };

  const [openSuccesMsg, setOpenSuccesMsg] = React.useState(false);

  const handleSucces = () => {
    setOpenSuccesMsg(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMsg(false);
    setOpenSuccesMsg(false);

  };

  const hasError = field =>
    form.touched[field] && form.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openErrorMsg}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Email already registered!
               </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openSuccesMsg}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Organization Succes Registered!
        </Alert>
      </Snackbar>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <img
                alt="Logo"
                src={logo}
                width='80'
                height='80'
              />
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Event Management
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Create your own organization to organize and manage an event
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            {loading ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '-webkit-fill-available' }}>
                <CircularProgress />
              </div>
              :
              <div>
                <div className={classes.contentHeader}>
                  <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.contentBody}>

                  <form
                    className={classes.form}
                    onSubmit={handleRegister}
                  >
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                      Create new account for Organization
                </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                    >
                      Use email to create new account
                </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasError('organization_name')}
                      fullWidth
                      helperText={
                        hasError('organization_name') ? form.errors.organization_name[0] : null
                      }
                      label="Organization Name"
                      name="organization_name"
                      onChange={handleChange}
                      type="text"
                      value={form.values.organization_name || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      helperText={
                        hasError('email') ? form.errors.email[0] : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={form.values.email || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={
                        hasError('password') ?
                          true :
                          (form.values.password !== form.values.confirm_password ?
                            form.touched.confirm_password === undefined ? false : true
                            : false
                          )
                      }
                      fullWidth
                      helperText={
                        hasError('password') ? form.errors.password[0] : null
                      }
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={form.values.password || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={
                        form.touched.confirm_password === undefined ?
                          false : hasError('confirm_password') ?
                            true : form.values.password !== form.values.confirm_password ?
                              true : false
                      }
                      fullWidth
                      helperText={
                        hasError('confirm_password') ?
                          form.errors.confirm_password[0] :
                          form.values.password !== form.values.confirm_password ?
                            form.touched.confirm_password === undefined ? null :
                              "Password did not match" : null
                      }
                      label="Confirm Password"
                      name="confirm_password"
                      onChange={handleChange}
                      type="password"
                      value={form.values.confirm_password || ''}
                      variant="outlined"
                    />
                    <Button
                      className={classes.registerButton}
                      color="primary"
                      disabled={!form.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Register now
                </Button>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Have an account?{' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        variant="h6"
                      >
                        Login
                  </Link>
                    </Typography>
                  </form>
                </div>
              </div>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.object
};


export default withRouter(Register);
