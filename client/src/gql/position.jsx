import { gql } from "apollo-boost";
export const POSITIONS_QUERY = gql`
  query positions($organization_id: String!){
    positions(organization_id:$organization_id) {
      _id
      position_name
      core
      order
      organization_id
    }
  }
`;

export const POSITION_QUERY = gql`
  query position($_id: String!){
    position(_id:$_id) {
      _id
      position_name
      core
      order
      organization_id
    }
  }
`;

export const EDIT_POSITION = gql`
  mutation editPosition(
    $_id: String!,
    $position_name: String!
    $core: Boolean!
    $order: String!
    $organization_id: String!
    ) {
    editPosition(
      _id: $_id,
      position_name: $position_name
      core :$core
      order :$order
      organization_id: $organization_id
      ) {
      _id
      position_name
      core
      order
      organization_id
    }
  }
`;

export const ADD_POSITION = gql`
mutation addPosition(
  $_id: String!,
  $position_name: String!
  $core: Boolean!
  $order: String!
  $organization_id: String!
  ) {
  addPosition(
    _id: $_id,
    position_name: $position_name
    core :$core
    order :$order
    organization_id: $organization_id
    ) {
    _id
    position_name
    core
    order
    organization_id
  }
}
`;

export const DELETE_POSITION = gql`
  mutation deletePosition($_id: String!) {
    deletePosition(_id: $_id) {
      _id
    }
  }
`;