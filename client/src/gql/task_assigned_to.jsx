import { gql } from "apollo-boost";

export const TASK_ASSIGNED_TOS_QUERY = gql`
query task_assigned_tos($task_id:String!){
  task_assigned_tos(task_id: $task_id){
      _id
      task_id
      person_in_charge_id
      roadmap_id
      event_id
      project_id
      staff_id
      created_at
  }
}
`;

export const TASK_ASSIGNED_TOS_QUERY_BY_PROJECT = gql`
query task_assigned_tos($project_id:String!){
  task_assigned_tos(project_id: $project_id){
      _id
      project_id
  }
}
`;

export const TASK_ASSIGNED_TOS_QUERY_BY_EVENT = gql`
query task_assigned_tos($event_id:String!){
  task_assigned_tos(event_id: $event_id){
      _id
      event_id
  }
}
`;

export const TASK_ASSIGNED_TOS_QUERY_BY_ROADMAP = gql`
query task_assigned_tos($roadmap_id:String!){
  task_assigned_tos(roadmap_id: $roadmap_id){
      _id
      roadmap_id
  }
}
`;

export const TASK_ASSIGNED_TOS_BY_STAFF_QUERY = gql`
query task_assigned_tos($staff_id:String!){
  task_assigned_tos(staff_id: $staff_id){
    _id
    task_id
    person_in_charge_id
    roadmap_id
    event_id
    project_id
    staff_id
    created_at
  }
}
`;
export const TASK_ASSIGNED_TOS_BY_PERSON_IN_CHARGE_QUERY = gql`
query task_assigned_tos($person_in_charge_id:String!){
  task_assigned_tos(person_in_charge_id: $person_in_charge_id){
    _id
    task_id
    person_in_charge_id
    roadmap_id
    event_id
    project_id
    staff_id
    created_at
  }
}
`;

export const ADD_TASK_ASSIGNED_TO = gql`
  mutation addTaskAssignedTo(
    $_id: String!,
    $task_id: String!,
    $person_in_charge_id: String!,
    $roadmap_id: String!,
    $event_id: String!,
    $project_id: String!,
    $staff_id: String!,
    $created_at: String!,
    ){
    addTask_assigned_to(
      _id: $_id,
      task_id: $task_id,
      person_in_charge_id: $person_in_charge_id,
      roadmap_id:$roadmap_id,
      event_id:$event_id,
      project_id:$project_id,
      staff_id:$staff_id,
      created_at:$created_at,
    ){
      _id
      task_id
      person_in_charge_id
      roadmap_id
      event_id
      project_id
      staff_id
      created_at
    }
  }
`;

export const EDIT_TASK_ASSIGNED_TO = gql`
  mutation editTaskAssignedTo(
    $person_in_charge_id: String!,
    $staff_id: String!,
    ){
      editTask_assigned_to(
      person_in_charge_id:$person_in_charge_id,
      staff_id:$staff_id,
    ){
      person_in_charge_id
      staff_id
    }
  }
`;

export const DELETE_TASK_ASSIGNED_TO = gql`
mutation delete_task_assigned_to ($_id: String!) {
  delete_task_assigned_to(_id:$_id){
    _id
  }
}
`;
