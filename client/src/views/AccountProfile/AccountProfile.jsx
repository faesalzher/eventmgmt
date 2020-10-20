import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {  ProfileDetailCard } from './components';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import jwtDecode from "jwt-decode";


const STAFFSBYID_QUERY = gql`
query staffById($staff_id: String!){
  staffById(_id:$staff_id) {
      _id
      staff_name
      position_name
      email
      phone_number
      password
      picture
      departement_id
      organization_id
  }
}
`;

const DEPARTEMENT_QUERY = gql`
query departememt($departement_id: String!){
  departement(_id:$departement_id) {
      departement_name
  }
}
`;

const ORGANIZATION_QUERY = gql`
  query organization($_oid: String!) {
    organization(_id: $_oid) {
      organization_name
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AccountProfile = () => {
  const classes = useStyles();
  const initialFormState = {
    staff_name: '',
    position_name: '',
    departement_id: '',
    email: '',
    phone_number: '',
  }

  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const [profile, setProfile] = useState(initialFormState);
  const [departement, setDepartement] = useState(initialFormState);
  const [organization, setOrganization] = useState({});

  const {  data: staffsData, refetch: staffsRefetch } = useQuery(STAFFSBYID_QUERY, {
    variables: { staff_id: decodedToken.staff_id },
    onCompleted: () => {
      if (decodedToken.user_type === 'organization') {

      } else {
        setProfile(
          staffsData.staffById
        )
      }
    }
  }
  );

  const { data: dataOrganization } = useQuery(ORGANIZATION_QUERY, {
    variables: { _oid: "7b75bb90-11dd-11eb-a8ea-c143d07ffaa9" },
    onCompleted: () => {
      if (dataOrganization !== undefined) {
        setOrganization(dataOrganization.organization);
      }
    },
  });

  console.log(staffsData)
  console.log(profile)

  const { data: departementData, refetch: departementRefetch } = useQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: profile.departement_id },
    onCompleted: () => {
      if (departementData.departement !== null) {
        setDepartement(departementData.departement)
      }

    }
  }
  );




  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    staffsRefetch();
    departementRefetch();
  };
  console.log(organization)
  console.log(dataOrganization)

  return (decodedToken.user_type === "organization") ?
    (
      <div></div>
    )
    :
    (
      <div className={classes.root}>
        <Grid
          container
          spacing={1}
        >
          {/* <Grid
            item
            lg={4}
            md={4}
            xl={4}
            xs={12}
          >
            <ProfileImageForm
              profile={profile}
              departement_name={departement.departement_name}
              organization_name={organization.organization_name}
            />
          </Grid> */}
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <ProfileDetailCard
              profile={profile}
              departement_name={departement.departement_name}
              organization_name={organization.organization_name}
            />
          </Grid>
        </Grid>
      </div>
    );
};

export default AccountProfile;
