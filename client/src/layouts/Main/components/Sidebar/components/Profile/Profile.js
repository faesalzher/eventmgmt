import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
// import { useAuth } from "context/auth.jsx";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import jwtDecode from "jwt-decode";

const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      email
      organization_name
      picture
    }
  }
`;

const STAFF_QUERY = gql`
  query staffById($staff_id: String!) {
    staffById(_id: $staff_id) {
      _id
      staff_name
      email
      position_name
      picture
    }
  }
`;

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
  },
}));

const Profile = (props) => {
  // const { className } = props;
  // const { _id } = useAuth();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const [profileOrganization, setProfileOrganization] = useState({});
  const [profileStaff, setProfileStaff] = useState({});

  const { data: dataOrganization, refetch: refetchOrganization } = useQuery(
    ORGANIZATION_QUERY,
    {
      variables: { _id: decodedToken.organization_id },
      onCompleted: () => {
        setProfileOrganization(dataOrganization.organization);
      },
    }
  );

  const { data: dataStaff, refetch: refetchStaff } = useQuery(STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    onCompleted: () => {
      setProfileStaff(dataStaff.staffById);
    },
  });

  useEffect(() => {
    refresh();
  });

  // useEffect(() => {
  //   const onCompleted = (data) => { setOrganization(data.check_organization) };
  //   const onError = (error) => { /* magic */ };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !loadingCheck && !error) {
  //       onCompleted(data);
  //     } else if (onError && !loadingCheck && error) {
  //       onError(error);
  //     }
  //   }
  // }, [loadingCheck, data, error]);

  const refresh = () => {
    refetchOrganization();
    refetchStaff();
  };


  const classes = useStyles();
  return (
    <div style={props.collapsed !== "true" ? {} : { display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={
            decodedToken.user_type === "organization"
              ? profileOrganization.picture
              : profileStaff.picture
          }
          to="/settings"
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
