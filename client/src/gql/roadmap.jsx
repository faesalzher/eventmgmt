import { gql } from "apollo-boost";

export const ROADMAPS_QUERY_BY_PROJECT = gql`
query roadmaps($project_id:String!){
  roadmaps(project_id: $project_id){
      _id
      project_id
  }
}
`;
export const ROADMAPS_QUERY = gql`
  query roadmaps($event_id: String!){
    roadmaps(event_id:$event_id) {
      _id
      roadmap_name
      start_date
      end_date
      color
      committee_id
      event_id
      project_id
    }
  }
`;

export const ROADMAP_QUERY = gql`
query roadmap($roadmap_id: String!){
  roadmap(_id:$roadmap_id) {
    _id
    roadmap_name
    start_date
    end_date
    color
    committee_id
    event_id
    project_id
  }
}
`;

export const ADD_ROADMAP = gql`
  mutation addRoadmap(
    $_id: String!,
    $roadmap_name: String!,
    $start_date: String!,
    $end_date: String!,
    $color:String!,
    $committee_id:String!
    $event_id:String!,
    $project_id:String!,
    ) {
    addRoadmap(
      _id: $_id,
      roadmap_name: $roadmap_name,
      start_date:$start_date,
      end_date:$end_date,
      color:$color,
      committee_id:$committee_id,
      event_id:$event_id,
      project_id:$project_id,
      ) {
      _id
      roadmap_name
      start_date
      end_date
      color
      committee_id
      event_id
      project_id
    }
  }
`;


export const EDIT_ROADMAP = gql`
  mutation editRoadmap(
    $_id: String!,
    $roadmap_name: String!,
    $start_date: String!,
    $end_date: String!,
    $color:String!,
    $committee_id:String!
    $event_id:String!,
    $project_id:String!,
    ) {
    editRoadmap(
      _id: $_id,
      roadmap_name: $roadmap_name,
      start_date:$start_date,
      end_date:$end_date,
      color:$color,
      committee_id:$committee_id,
      event_id:$event_id,
      project_id:$project_id,
      ) {
      _id
      roadmap_name
      start_date
      end_date
      color
      committee_id
      event_id
      project_id
    }
  }
`;

export const DELETE_ROADMAP = gql`
mutation deleteRoadmap ($_id: String!) {
  deleteRoadmap(_id:$_id){
    _id
  }
}
`;