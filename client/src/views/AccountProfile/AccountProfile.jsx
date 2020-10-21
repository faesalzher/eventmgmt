import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProfileDetailCard, OrganizationDetailCard } from './components';

import jwtDecode from "jwt-decode";



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AccountProfile = () => {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));


  return (decodedToken.user_type === "organization") ?
    (
      <div className={classes.root}>
          <OrganizationDetailCard
          decodedToken={decodedToken}
        />
      </div>
    )
    :
    (
      <div className={classes.root}>
        <ProfileDetailCard
          decodedToken={decodedToken}
        />
      </div>
    );
};

export default AccountProfile;
