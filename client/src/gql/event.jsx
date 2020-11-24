import { gql } from "apollo-boost";

export const EVENTS_QUERY = gql`
query events($project_id: String!){
  events(project_id:$project_id) {
    _id
    event_name
    event_description
    event_location
    event_start_date
    event_end_date
    picture
    project_id
  }
}
`;
export const EVENT_QUERY = gql`
  query event($event_id: String!){
    event(_id:$event_id) {
      _id
      event_name
      event_description
      event_location
      event_start_date
      event_end_date
      picture
      project_id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($_id: String!) {
    deleteEvent(_id: $_id) {
      _id
    }
  }
`;

export const ADD_EVENT = gql`
mutation addEvent(
  $_id: String!,
  $event_name: String!,
  $event_description: String!,
  $event_location: String!,
  $event_start_date: String!,
  $event_end_date: String!,
  $picture:String!,
  $project_id:String!
  ) {
  addEvent(
    _id: $_id,
    event_name: $event_name,
    event_description: $event_description,
    event_location: $event_location,
    event_start_date:$event_start_date,
    event_end_date:$event_end_date,
    picture:$picture,
    project_id:$project_id
    ) {
    _id
    event_name
    event_description
    event_location
    event_start_date
    event_end_date
    picture
    project_id
  }
}
`;



export const EDIT_EVENT = gql`
  mutation editEvent(
    $_id: String!,
    $event_name: String!,
    $event_description: String!,
    $event_location: String!,
    $event_start_date: String!,
    $event_end_date: String!,
    $picture:String!,
    $project_id:String!
    ) {
    editEvent(
      _id: $_id,
      event_name: $event_name,
      event_description: $event_description,
      event_location: $event_location,
      event_start_date:$event_start_date,
      event_end_date:$event_end_date,
      picture:$picture,
      project_id:$project_id
      ) {
      _id
      event_name
      event_description
      event_location
      event_start_date
      event_end_date
      picture
      project_id
    }
  }
`;
