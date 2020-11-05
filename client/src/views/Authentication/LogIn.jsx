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
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import signInImage from "assets/planer_desk.jpg";
import logo from 'assets/image.png';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useAuth } from "context/auth.jsx";

import { SECRET_KEY } from '../../secret_key.js'
// const { SECRET_KEY } = require('../../secret_key');
const jwt = require('jsonwebtoken');


const CHECK_ORGANIZATION = gql`
  query check_organization($email: String!){
    check_organization(email:$email) {
      _id
      email
      password
    }
  }
`;

const CHECK_STAFF = gql`
  query check_staff($email: String!){
    check_staff(email:$email) {
      _id
      email
      password
      organization_id
    }
  }
`;
// const LOGIN = gql`
//   query login($email: String!){
//     login(email:$email) {
//       _id
//       organization_name
//       email
//       password
//     }
//   }
// `;

const schema = {
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
      maximum: 128
    }
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const LogIn = props => {
  const { history } = props;
  const { setAuthTokens } = useAuth();

  const classes = useStyles();

  const [loading, setLoading] = useState(false)
  const [loadingSucces, setLoadingSucces] = useState(false)

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: ""
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };


  React.useEffect(() => {
    refresh();
  });
  const [organization, setOrganization] = useState({});
  const [staff, setStaff] = useState({});

  const {
    data: dataOrganization,
    loading: loadingOrganization,
    error: errorOrganization,
    refetch: refetchOrganization
  } = useQuery(CHECK_ORGANIZATION,
    {
      variables: { email: formState.values.email, },
    });

  const {
    data: dataStaff,
    loading: loadingStaff,
    error: errorStaff,
    refetch: refetchStaff
  } = useQuery(CHECK_STAFF,
    {
      variables: { email: formState.values.email, },
    });

  useEffect(() => {
    const onCompleted = (data) => { setOrganization(data.check_organization) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loadingOrganization && !errorOrganization) {
        onCompleted(dataOrganization);
      } else if (onError && !loadingOrganization && errorOrganization) {
        onError(errorOrganization);
      }
    }
  }, [loadingOrganization, dataOrganization, errorOrganization]);

  useEffect(() => {
    const onCompleted = (data) => { setStaff(data.check_staff) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loadingStaff && !errorStaff) {
        onCompleted(dataStaff);
      } else if (onError && !loadingStaff && errorStaff) {
        onError(errorStaff);
      }
    }
  }, [loadingStaff, dataStaff, errorStaff]);


  const refresh = () => {
    refetchOrganization();
    refetchStaff();
  }

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false);

  const handleError = () => {
    setOpenErrorMsg(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMsg(false);
  };

  const handleLogIn = (event) => {
    // refetch();
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (organization.length === 0) {
        if (staff.length === 0) {
          setFormState(formState => ({
            ...formState,
            errors: {
              ...formState.errors, email: ["User Not Found"], password: [""]
            } || {}
          }));
          handleError();
        } else if (staff[0].password !== formState.values.password) {
          setFormState(formState => ({
            ...formState,
            errors: {
              ...formState.errors, password: ["The password you entered is incorrect"]
            } || {}
          }));
          handleError();
        } else {
          const token = generateTokenStaff(staff[0])
          setAuthTokens(token);
          setLoadingSucces(true);
          setTimeout(() => {
            history.push('/');
            setLoadingSucces(false);
          }, 500);
        }
      } else if (organization[0].password !== formState.values.password) {
        setFormState(formState => ({
          ...formState,
          errors: {
            ...formState.errors, password: ["The password you entered is incorrect"]
          } || {}
        }));
        handleError();
      } else {
        const token = generateTokenOrganization(organization[0])
        setAuthTokens(token);
        setLoadingSucces(true);
        setTimeout(() => {
          history.push('/');
          setLoadingSucces(false);
        }, 500);
      }
      setLoading(false)
    }, 1000);
  };

  function generateTokenOrganization(user) {
    return jwt.sign(
      {
        _id: user._id,
        staff_id: "",
        organization_id: user._id,
        user_type: "organization"
      },
      SECRET_KEY,
      { expiresIn: '10h' }
    );
  }

  function generateTokenStaff(user) {
    return jwt.sign(
      {
        // _id: user._id,
        staff_id: user._id,
        organization_id: user.organization_id,
        user_type: "staff"
      },
      SECRET_KEY,
      { expiresIn: '10h' }
    );
  }

  // if (data && data.check_organization) {
  //   setOrganization(data.check_organization);
  // }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  console.log(staff)

  return (
    <div className={classes.root}>
      {loadingSucces ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '-webkit-fill-available' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 100, justifyContent: 'space-around' }}>
            <CircularProgress />
            <Typography variant="h6" gutterBottom>
              Logging in
          </Typography>
          </div>
        </div>
        :
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
              Login Failed !
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
                      Create your own project to organize and manage an event
                </Typography>
                    {/* <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography> */}
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
                        onSubmit={handleLogIn}
                      >
                        <Typography
                          className={classes.title}
                          variant="h2"
                        >
                          Login
                </Typography>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                        >
                          Login using email address
                </Typography>
                        <TextField
                          className={classes.textField}
                          error={hasError('email')}
                          fullWidth
                          helperText={
                            hasError('email') ? formState.errors.email[0] : null
                          }
                          label="Email address"
                          name="email"
                          onChange={handleChange}
                          type="text"
                          value={formState.values.email || ''}
                          variant="outlined"
                        />
                        <TextField
                          className={classes.textField}
                          error={hasError('password')}
                          fullWidth
                          helperText={
                            hasError('password') ? formState.errors.password[0] : null
                          }
                          label="Password"
                          name="password"
                          onChange={handleChange}
                          type="password"
                          value={formState.values.password || ''}
                          variant="outlined"
                        />
                        <Button
                          className={classes.signInButton}
                          color="primary"
                          disabled={!formState.isValid}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Login
                       </Button>
                        <Typography
                          color="textSecondary"
                          variant="body1"
                        >
                          Don't have an account?{' '}
                          <Link
                            component={RouterLink}
                            to="/register"
                            variant="h6"
                          >
                            Register
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
      }
    </div>
  );
};

LogIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(LogIn);
