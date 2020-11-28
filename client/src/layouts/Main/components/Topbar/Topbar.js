import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Typography, useMediaQuery } from "@material-ui/core";

import { useAuth } from "context/auth.jsx";
import CustomizedMenus from "./components/CustomizedMenus/CustomizedMenus";
import jwtDecode from "jwt-decode";
import { useTheme } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";

// import { ORGANIZATION_QUERY } from "gql";

import { STAFF_QUERY } from "gql";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "white",
    flexGrow: 1,
    display: "flex",
    marginTop: theme.spacing(0.5),
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { setAuthTokens } = useAuth();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  function logOut() {
    setAuthTokens();
    localStorage.removeItem("jwtToken");
  }

  const classes = useStyles();

  // const [profileOrganization, setProfileOrganization] = useState({});
  const [profileStaff, setProfileStaff] = useState({});

  // const {
  //   data: dataOrganization,
  //   loading: loadingOrganization,
  //   error: organizationError,
  //   refetch: refetchOrganization,
  // } = useQuery(ORGANIZATION_QUERY, {
  //   variables: { _id: decodedToken.organization_id },
  //   // onCompleted: () => {
  //   //   setProfileOrganization(dataOrganization.organization);
  //   // },
  // });

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

  // useEffect(() => {
  //   const onCompleted = (dataOrganization) => {
  //     setProfileOrganization(dataOrganization.organization);
  //   };
  //   const onError = (error) => {
  //     /* magic */
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !loadingOrganization && !organizationError) {
  //       onCompleted(dataOrganization);
  //     } else if (onError && !loadingOrganization && organizationError) {
  //       onError(organizationError);
  //     }
  //   }
  // }, [loadingOrganization, dataOrganization, organizationError]);

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
    // refetchOrganization();
    refetchStaff();
  };

  // const [notifications] = useState([]);
  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <Typography variant="h6" style={xs ? { fontSize: 14 } : {}}>
          Event Management
          {/* {decodedToken.user_type === "organization" ? " (Admin)" : ""} */}
        </Typography>
      </div>
      <CustomizedMenus
        logOut={logOut}
        // profileOrganization={profileOrganization}
        profileStaff={profileStaff}
        decodedToken={decodedToken}
      />
    </div>
  );
};

export default Topbar;
