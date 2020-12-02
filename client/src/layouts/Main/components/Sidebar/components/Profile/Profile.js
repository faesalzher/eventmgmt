import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
// import { useAuth } from "context/auth.jsx";
import { useQuery } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { AdminChip } from "components";

import {
  STAFF_QUERY,
  DEPARTEMENT_QUERY,
  DEPARTEMENT_POSITION_QUERY,
} from "gql";

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
    justifyContent: "center",
    fontWeight:500
  },
}));

export default function Profile(props) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  // const [profileOrganization, setProfileOrganization] = useState({});
  const [profileStaff, setProfileStaff] = useState({
    departement_position_id: "",
    departement_id: "",
  });

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
      if (dataStaff && dataStaff.staff !== null)
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
  console.log(dataStaff);
  console.log(profileStaff);

  const classes = useStyles();
  return (
    <div style={props.collapsed !== "true" ? {} : { display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          // alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={
            // decodedToken.user_type === "organization"
            //   ? profileOrganization.picture
            //   :
            profileStaff.picture
          }
          to="/account"
        />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="subtitle1" className={classes.name}>
            {
              // decodedToken.user_type === "organization"
              // ? profileOrganization.organization_name
              // :
              profileStaff.staff_name
            }
          </Typography>
        </div>
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          {decodedToken.user_type === "staff" ? (
            <PersonIcon style={{ padding: 0, fontSize: 18 }} />
          ) : (
            <div>
              <SupervisorAccountIcon style={{ padding: 0, fontSize: 18 }} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AdminChip />
              </div>
            </div>
          )}
          <Typography variant="body2" className={classes.name}>
            {
              // decodedToken.user_type === "organization"
              //   ? "Admin"
              //   :
            }
            <DepartementPositionName
              departement_position_id={profileStaff.departement_position_id}
            />
          </Typography>
          <Typography variant="body2" className={classes.name}>
            <DepartementName departement_id={profileStaff.departement_id} />
          </Typography>
        </div>
      </div>
    </div>
  );
}

function DepartementName(props) {
  const { data: departementData, refetch: departementRefetch } = useQuery(
    DEPARTEMENT_QUERY,
    {
      variables: { departement_id: props.departement_id },
    }
  );
  React.useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementRefetch();
  };

  if (!departementData || departementData.departement === null) return <></>;
  return <> {departementData.departement.departement_name} </>;
}

function DepartementPositionName(props) {
  const {
    data: departementPositionData,
    refetch: departementPositionRefetch,
  } = useQuery(DEPARTEMENT_POSITION_QUERY, {
    variables: { _id: props.departement_position_id },
  });
  React.useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementPositionRefetch();
  };

  if (
    !departementPositionData ||
    departementPositionData.departement_position === null
  )
    return <></>;

  return (
    <>
      {departementPositionData.departement_position.departement_position_name}
    </>
  );
}
