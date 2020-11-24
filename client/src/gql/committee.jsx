import { gql } from "apollo-boost";
export const COMMITTEES__QUERY = gql`
  query committees($organization_id: String!){
    committees(organization_id:$organization_id) {
      _id
      committee_name
      organization_id
    }
  }
`;

export const COMMITTEE_QUERY = gql`
  query committee($_id: String!){
    committee(_id:$_id) {
      _id
      committee_name
      organization_id
    }
  }
`;

export const EDIT_COMMITTEE = gql`
  mutation editCommittee($_id: String!,$committee_name: String!) {
    editCommittee(_id: $_id,committee_name: $committee_name) {
      _id
      committee_name
    }
  }
`;

export const ADD_COMMITTEE = gql`
mutation addCommittee(
  $_id: String!,
  $committee_name: String!
  $organization_id: String!
  ) {
  addCommittee(
    _id: $_id,
    committee_name: $committee_name
    organization_id: $organization_id
    ) {
    _id
    committee_name
    organization_id
  }
}
`;

export const DELETE_COMMITTEE = gql`
  mutation deleteCommittee($_id: String!) {
    deleteCommittee(_id: $_id) {
      _id
    }
  }
`;