import { gql } from "apollo-boost";

export const DEPARTEMENT_QUERY = gql`
query departememt($departement_id: String!){
  departement(_id:$departement_id) {
      departement_name
  }
}
`;

export const ADD_DEPARTEMENT = gql`
mutation addDepartement(
  $_id: String!,
  $departement_name: String!,
  $organization_id: String!
  ) {
  addDepartement(
    _id: $_id,
    departement_name: $departement_name,
    organization_id:$organization_id
    ) {
    _id
    departement_name
    organization_id
  }
}
`;

export const DELETE_DEPARTEMENT = gql`
mutation deleteDepartement ($_id: String!) {
  deleteDepartement(_id:$_id){
    _id
  }
}
`;

export const EDIT_DEPARTEMENT = gql`
  mutation editDepartement(
    $_id: String!,
    $departement_name: String!,
    $organization_id: String!
    ) {
    editDepartement(
      _id: $_id,
      departement_name: $departement_name
      organization_id: $organization_id
      ) {
      _id
      departement_name
      organization_id
    }
  }
`;
