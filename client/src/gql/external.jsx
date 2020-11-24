import { gql } from "apollo-boost";

export const DELETE_EXTERNAL = gql`
mutation deleteExternal ($_id: String!) {
  deleteExternal(_id:$_id){
    _id
  }
}
`;

export const EXTERNALS_QUERY_BY_PROJECT = gql`
  query externals($project_id:String!){
    externals(project_id: $project_id){
      _id,
      project_id,
    }
  }
`;

export const EXTERNALS_QUERY = gql`
  query externals($event_id:String!){
    externals(event_id: $event_id){
      _id,
      external_name,
      external_type,
      email,
      event_id,
      phone_number,
      details,
      picture,
      project_id
    }
  }
`;

export const ADD_EXTERNAL = gql`
  mutation addExternal(
    $_id: String!,
    $external_name: String!,
    $external_type: String!,
    $email: String!,
    $event_id: String!,
    $phone_number: String!,
    $picture:String!,
    $details:String!
    $project_id:String!
    ) {
    addExternal(
      _id: $_id,
      external_name: $external_name,
      external_type: $external_type,
      email:$email,
      event_id:$event_id,
      phone_number:$phone_number,
      picture:$picture,
      details:$details
      project_id:$project_id
      ) {
      _id
      external_name
      external_type
      email
      event_id
      phone_number
      picture
      details
      project_id
    }
  }
`;

export const EDIT_EXTERNAL = gql`
mutation editExternal(
  $_id: String!,
  $external_name: String!,
  $external_type: String!,
  $email: String!,
  $event_id: String!,
  $phone_number: String!,
  $picture:String!,
  $details:String!
  $project_id:String!
  ) {
  editExternal(
    _id: $_id,
    external_name: $external_name,
    external_type: $external_type,
    email:$email,
    event_id:$event_id,
    phone_number:$phone_number,
    picture:$picture,
    details:$details
    project_id:$project_id
    ) {
    _id
    external_name
    external_type
    email
    event_id
    phone_number
    picture
    details
    project_id
  }
}
`;
