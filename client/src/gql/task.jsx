import { gql } from "apollo-boost";

export const TASKS_QUERY = gql`
query tasks($roadmap_id:String!){
  tasks(roadmap_id: $roadmap_id){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
      project_id
      event_id
  }
}
`;

export const TASKS_QUERY_BY_CREATOR = gql`
  query tasks($created_by: String!){
    tasks(created_by:$created_by) {
        _id,
        task_name,
        priority,
        completed,
        task_description,
        due_date,
        completed_date,
        created_at,
        created_by,
        roadmap_id,
        event_id,
        project_id,
    }
  }
`;

export const TASKS_QUERY_BY_PROJECT = gql`
query tasks($project_id:String!){
  tasks(project_id: $project_id){
      _id
      project_id
  }
}
`;

export const TASK_QUERY = gql`
  query task($task_id: String!){
    task(_id:$task_id) {
        _id,
        task_name,
        priority,
        completed,
        task_description,
        due_date,
        completed_date,
        created_at,
        created_by,
        roadmap_id,
        event_id,
        project_id,
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask(
    $_id: String!,
    $task_name: String!,
    $priority: String!,
    $completed: Boolean!,
    $task_description: String!,
    $due_date: String!,
    $completed_date: String!,
    $created_at: String!,
    $created_by: String!,
    $roadmap_id: String!,
    $event_id: String!,
    $project_id: String!,
    ){
    addTask(
      _id: $_id,
      task_name: $task_name,
      priority: $priority,
      completed:$completed,
      task_description:$task_description,
      due_date:$due_date,
      completed_date:$completed_date,
      created_at:$created_at,
      created_by:$created_by,
      roadmap_id:$roadmap_id,
      event_id:$event_id,
      project_id:$project_id,
    ){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
      event_id
      project_id
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $_id: String!,
    $task_name: String!,
    $priority: String!,
    $completed: Boolean!,
    $task_description: String!,
    $due_date: String!,
    $completed_date: String!,
    $created_at: String!,
    $created_by: String!,
    $roadmap_id: String!,
    $event_id: String!,
    $project_id: String!,
    ){
    editTask(
      _id: $_id,
      task_name: $task_name,
      priority: $priority,
      completed:$completed,
      task_description:$task_description,
      due_date:$due_date,
      completed_date:$completed_date,
      created_at:$created_at,
      created_by:$created_by,
      roadmap_id:$roadmap_id,
      event_id:$event_id,
      project_id:$project_id,
    ){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
      event_id
      project_id
    }
  }
`;


export const DELETE_TASK = gql`
mutation deleteTask ($_id: String!) {
  deleteTask(_id:$_id){
    _id
  }
}
`;
