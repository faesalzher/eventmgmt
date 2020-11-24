import { gql } from "apollo-boost";
export const PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY = gql`
query person_in_charges_by_staff_and_project($staff_id: String!,$project_id: String!){
  person_in_charges_by_staff_and_project(staff_id:$staff_id,project_id:$project_id) {
    _id
    staff_id
    position_id
    committee_id
    project_id
  }
}
`;
export const PERSON_IN_CHARGES_BY_STAFF_QUERY = gql`
  query person_in_charges($staff_id: String!){
    person_in_charges(staff_id:$staff_id) {
      _id
      staff_id
      position_id
      committee_id
      project_id
    }
  }
`;

export const PERSON_IN_CHARGES_BY_PROJECT_QUERY = gql`
  query person_in_charges($project_id: String!){
     person_in_charges(project_id:$project_id) {
      _id
      staff_id
      position_id
      committee_id
      project_id
    }
  }
`;

export const PERSON_IN_CHARGES_BY_COMMITTEE_QUERY = gql`
  query person_in_charges($committee_id: String!){
     person_in_charges(committee_id:$committee_id) {
      _id
      staff_id
      position_id
      committee_id
      project_id
    }
  }
`;

export const PERSON_IN_CHARGE_BY_PROJECT_AND_POSITION = gql`
query person_in_charges_by_project_and_position($project_id: String!,$position_id: String!){
  person_in_charges_by_project_and_position(project_id:$project_id,position_id:$position_id) {
     _id
    staff_id
    }
}
`;


export const PERSON_IN_CHARGE_QUERY = gql`
  query person_in_charge($_id: String!){
    person_in_charge(_id:$_id) {
      _id
      staff_id
    }
  }
`;

export const DELETE_PERSON_IN_CHARGE = gql`
mutation deletePerson_in_charge ($_id: String!) {
  deletePerson_in_charge(_id:$_id){
    _id
  }
}
`;

export const ADD_PERSON_IN_CHARGE = gql`
  mutation addPerson_in_charge(
    $_id: String!,
    $staff_id: String!,
    $committee_id: String!,
    $position_id: String!,
    $project_id: String!,
    ){
    addPerson_in_charge(
      _id: $_id,
      staff_id: $staff_id,
      committee_id: $committee_id,
      position_id:$position_id,
      project_id:$project_id,
    ){
      _id
      staff_id
      committee_id
      position_id
      project_id
    }
  }
`;

export const EDIT_PERSON_IN_CHARGE = gql`
mutation editPerson_in_charge(
  $_id: String!,
  $staff_id: String!,
  $committee_id: String!,
  $position_id: String!,
  $project_id: String!,
  ){
  editPerson_in_charge(
    _id: $_id,
    staff_id: $staff_id,
    committee_id: $committee_id,
    position_id:$position_id,
    project_id:$project_id,
  ){
    _id
    staff_id
    committee_id
    position_id
    project_id
  }
}
`;
