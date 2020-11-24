import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProfileDetailCard, OrganizationDetailCard } from './components';

import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import jwtDecode from "jwt-decode";

import { ORGANIZATION_QUERY,ORGANIZATION_NAME_QUERY,STAFF_QUERY,DEPARTEMENT_QUERY } from 'gql';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AccountProfile = () => {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const initialFormState = {
    staff_name: '',
    position_name: '',
    departement_id: '',
    email: '',
    phone_number: '',
    organization_id: ""
  }

  const [profile, setProfile] = useState(initialFormState)
  const [departement, setDepartement] = useState({});
  const [organization, setOrganization] = useState({});

  const { data: dataStaff, refetch: refetchProfile } = useQuery(STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    onCompleted: () => {
      if (decodedToken.user_type === 'staff') {
        console.log('jalanin')
        setProfile(
          dataStaff.staff
        )
        org();
        dept();
      }
    }
  }
  );


  const [org, { data: dataOrganizationName }] = useLazyQuery(ORGANIZATION_NAME_QUERY, {
    variables: { _id: profile.organization_id },
    onCompleted: () => {
      if (dataOrganizationName.organization !== null) {
        setOrganization(dataOrganizationName.organization);
      }
    },
  });

  const [dept, { data: departementData }] = useLazyQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: profile.departement_id },
    onCompleted: () => {
      if (departementData.departement !== null) {
        setDepartement(departementData.departement)
      }

    }
  }
  );

  const { data: dataOrganization, refetch: organizationRefetch } = useQuery(ORGANIZATION_QUERY, {
    variables: { _id: decodedToken.organization_id },
    onCompleted: () => {
      if (dataOrganization.organization !== null) {
        setOrganization(dataOrganization.organization);
      }
    },
  });


  useEffect(() => {
    org();
    dept();
  }, [org, dept]);

  useEffect(() => {
    refresh();
  });

  // useEffect(() => {
  //   const onCompleted = (dataStaff) => {
  //     setProfile(
  //       dataStaff.staff
  //     )
  //   };
  //   const onError = (error) => {
  //     /* magic */
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !loadingProfile && !errorProfile) {
  //       onCompleted(dataStaff);
  //     } else if (onError && !loadingProfile && errorProfile) {
  //       onError(errorProfile);
  //     }
  //   }
  // }, [loadingProfile, dataStaff, errorProfile]);

  const refresh = () => {
    refetchProfile();
    organizationRefetch();
  }

  const handleSaveEditProfileButton = e => {
    setProfile(e)
  }

  const handleSaveEditOrganizationButton = e => {
    setOrganization(e)
  }

  return (decodedToken.user_type === "organization") ?
    (
      <div className={classes.root}>
        <OrganizationDetailCard
          decodedToken={decodedToken}
          handleSaveEditButton={handleSaveEditOrganizationButton}
          organization={organization}
        />
      </div>
    )
    :
    (
      <div className={classes.root}>
        <ProfileDetailCard
          handleSaveEditButton={handleSaveEditProfileButton}
          profile={profile}
          organization={organization}
          departement={departement}
          decodedToken={decodedToken}
        />
      </div>
    );
};

export default AccountProfile;
