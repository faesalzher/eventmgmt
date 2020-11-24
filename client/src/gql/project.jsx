import { gql } from "apollo-boost";
export const PROJECTS_QUERY = gql`
  query projects($organization_id:String!){
    projects(organization_id: $organization_id){
      _id
      project_name
      project_description
      project_start_date
      project_end_date
      picture
      created_at
      organization_id
    }
  }
`;

export const PROJECT_QUERY = gql`
query project($project_id: String!){
  project(_id:$project_id) {
    _id
    project_name
    project_description
    project_start_date
    project_end_date
    picture
    created_at
    organization_id
  }
}
`;
export const DELETE_PROJECT = gql`
  mutation deleteProject($_id: String!) {
    deleteProject(_id: $_id) {
      _id
    }
  }
`;
export const ADD_PROJECT = gql`
  mutation addProject(
    $_id: String!,
    $project_name: String!,
    $project_description: String!,
    $project_start_date: String!,
    $project_end_date: String!,
    $picture:String!,
    $created_at:String!,
    $organization_id:String!
    ) {
    addProject(
      _id: $_id,
      project_name: $project_name,
      project_description: $project_description,
      project_start_date:$project_start_date,
      project_end_date:$project_end_date,
      picture:$picture,
      created_at: $created_at,
      organization_id:$organization_id
      ) {
      _id
      project_name
      project_description
      project_start_date
      project_end_date
      picture
      created_at
      organization_id
    }
  }
`;


export const EDIT_PROJECT = gql`
  mutation editProject(
    $_id: String!
    $project_name: String!
    $project_description: String!
    $project_start_date: String!
    $project_end_date: String!
    $picture: String!
    $created_at: String!
    $organization_id: String!
  ) {
    editProject(
      _id: $_id
      project_name: $project_name
      project_description: $project_description
      project_start_date: $project_start_date
      project_end_date: $project_end_date
      picture: $picture
      created_at: $created_at
      organization_id: $organization_id
    ) {
      _id
      project_name
      project_description
      project_start_date
      project_end_date
      picture
      created_at
      organization_id
    }
  }
`;