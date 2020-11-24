import { gql } from "apollo-boost";

export const AGENDAS_QUERY_BY_PROJECT = gql`
query agendas($project_id:String!){
  agendas(project_id: $project_id){
    _id,
    project_id,
  }
}
`;

export const AGENDAS_QUERY = gql`
  query agendas($event_id:String!){
    agendas(event_id: $event_id){
      _id,
      agenda_name,
      date,
      start_time,
      end_time,
      details,
      event_id,
      project_id,
    }
  }
`;
export const ADD_AGENDA = gql`
  mutation addAgenda(
    $_id: String!,
    $agenda_name: String!,
    $date: String!,
    $start_time: String!,
    $end_time: String!,
    $details:String!,
    $event_id:String!
    $project_id:String!
    ) {
    addAgenda(
      _id: $_id,
      agenda_name: $agenda_name,
      date: $date,
      start_time:$start_time,
      end_time:$end_time,
      details:$details,
      event_id:$event_id
      project_id:$project_id
      ) {
      _id
      agenda_name
      date
      start_time
      end_time
      details
      event_id
      project_id
    }
  }
`;

export const EDIT_AGENDA = gql`
mutation editAgenda(
  $_id: String!
  $agenda_name: String!
  $date: String!
  $start_time: String!
  $end_time: String!
  $details: String!
  $event_id: String!
  $project_id: String!
) {
  editAgenda(
    _id: $_id
    agenda_name: $agenda_name
    date: $date
    start_time: $start_time
    end_time: $end_time
    details: $details
    event_id: $event_id
    project_id:$project_id
  ) {
    _id
    agenda_name
    date
    start_time
    end_time
    details
    event_id
    project_id
  }
}
`;

export const DELETE_AGENDA = gql`
mutation deleteAgenda ($_id: String!) {
  deleteAgenda(_id:$_id){
    _id
  }
}
`;