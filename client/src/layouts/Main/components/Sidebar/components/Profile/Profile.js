import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
// import { useAuth } from "context/auth.jsx";
import { useQuery } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { ORGANIZATION_QUERY } from 'gql';


import { STAFF_QUERY } from "gql";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    minHeight: "fit-content",
    marginBottom: -70,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: 15,
    marginBottom: 5,
  },
  name: {
    marginTop: theme.spacing(1),
    display: "flex",
    textAlign: "center",
  },
}));

const Profile = (props) => {
  // const { className } = props;
  // const { _id } = useAuth();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const [profileOrganization, setProfileOrganization] = useState({});
  const [profileStaff, setProfileStaff] = useState({});

  const {
    data: dataOrganization,
    loading: loadingOrganization,
    error: organizationError,
    refetch: refetchOrganization,
  } = useQuery(ORGANIZATION_QUERY, {
    variables: { _id: decodedToken.organization_id },
    // onCompleted: () => {
    //   setProfileOrganization(dataOrganization.organization);
    // },
  });

  const {
    data: dataStaff,
    loading: loadingStaff,
    error: staffError,
    refetch: refetchStaff,
  } = useQuery(STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    // onCompleted: () => {
    //   setProfileStaff(dataStaff.staff);
    // },
  });

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (dataOrganization) => {
      setProfileOrganization(dataOrganization.organization);
    };
    const onError = (error) => {
      /* magic */
    };
    if (onCompleted || onError) {
      if (onCompleted && !loadingOrganization && !organizationError) {
        onCompleted(dataOrganization);
      } else if (onError && !loadingOrganization && organizationError) {
        onError(organizationError);
      }
    }
  }, [loadingOrganization, dataOrganization, organizationError]);

  useEffect(() => {
    const onCompleted = (dataStaff) => {
      setProfileStaff(dataStaff.staff);
    };
    const onError = (error) => {
      /* magic */
    };
    if (onCompleted || onError) {
      if (onCompleted && !loadingStaff && !staffError) {
        onCompleted(dataStaff);
      } else if (onError && !loadingStaff && staffError) {
        onError(staffError);
      }
    }
  }, [loadingStaff, dataStaff, staffError]);

  const refresh = () => {
    refetchOrganization();
    refetchStaff();
  };

  const classes = useStyles();
  return (
    <div style={props.collapsed !== "true" ? {} : { display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          // alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={
            decodedToken.user_type === "organization"
              ? profileOrganization.picture
              : profileStaff.picture
          }
          to="/account"
        />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" className={classes.name}>
            {decodedToken.user_type === "organization"
              ? profileOrganization.organization_name
              : profileStaff.staff_name}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {decodedToken.user_type === "staff" ? (
            <PersonIcon style={{ padding: "8px 2px", fontSize: 18 }} />
          ) : (
            <SupervisorAccountIcon
              style={{ padding: "8px 2px", fontSize: 18 }}
            />
          )}
          <Typography variant="body2" className={classes.name}>
            {decodedToken.user_type === "organization"
              ? "Admin"
              : profileStaff.position_name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
