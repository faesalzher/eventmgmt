import { gql } from "apollo-boost";

export const DEPARTEMENT_POSITIONS_QUERY = gql`
query departement_positions($organization_id:String!){
  departement_positions(organization_id: $organization_id){
    _id
    departement_position_name
    organization_id
  }
}
`;

export const DEPARTEMENT_POSITION_QUERY = gql`
query departememt_position($_id: String!){
  departement_position(_id:$_id) {
    _id
    departement_position_name
    organization_id
  }
}
`;

export const ADD_DEPARTEMENT_POSITION = gql`
mutation addDepartement_position(
  $_id: String!,
  $departement_position_name: String!,
  $organization_id: String!,
  ) {
  addDepartement_position(
    _id: $_id,
    departement_position_name: $departement_position_name,
    organization_id:$organization_id,
    ) {
    _id
    departement_position_name
    organization_id
  }
}
`;

export const DELETE_DEPARTEMENT_POSITION = gql`
mutation deleteDepartement_position ($_id: String!) {
  deleteDepartement_position(_id:$_id){
    _id
  }
}
`;

export const EDIT_DEPARTEMENT_POSITION = gql`
  mutation editDepartement_position(
    $_id: String!,
    $departement_position_name: String!,
    $organization_id: String!,
    ) {
    editDepartement_position(
      _id: $_id,
      departement_position_name: $departement_position_name,
      organization_id: $organization_id,
      ) {
      _id
      departement_position_name
      organization_id
    }
  }
`;
