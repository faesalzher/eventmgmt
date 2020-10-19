import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
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
    }
  }
`;

const STAFF_QUERY = gql`
  query staffById($_id: String!) {
    staffById(_id: $_id) {
      _id
      staff_name
      email
      position_name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "fit-content",
    marginBottom: -70,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: 15,
  },
  name: {
    marginTop: theme.spacing(1),
    display: "flex",
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;
  // const { _id } = useAuth();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const [profileOrganization, setProfileOrganization] = useState({});
  const [profileStaff, setProfileStaff] = useState({});

  const { data: dataOrganization,refetch:refetchOrganization } = useQuery(ORGANIZATION_QUERY, {
    variables: { _id: decodedToken.organization_id },
    onCompleted: () => {
      setProfileOrganization(dataOrganization.organization);
    },
  });

  const { data: dataStaff,refetch:refetchStaff } = useQuery(STAFF_QUERY, {
    variables: { _id: decodedToken._id },
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

  // console.log(decodedToken._id)
  // console.log(profileOrganization);
  console.log(decodedToken);
  const classes = useStyles();
  console.log(decodedToken);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={"/images/avatars/avatar_11.png"}
        to="/settings"
      />
      <div>
        <Typography variant="h6" className={classes.name}>
          {decodedToken.user_type === "organization"
            ? profileOrganization.organization_name
            : profileStaff.staff_name}
        </Typography>
        <Typography variant="body2" className={classes.name}>
          {decodedToken.user_type === "organization"
            ? "Admin"
            : profileStaff.position_name}
        </Typography>
      </div>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
