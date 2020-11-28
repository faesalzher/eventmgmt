import { gql } from "apollo-boost";

export const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      organization_name
      description
      picture
    }
  }
`;

export const ORGANIZATION_NAME_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      organization_name
      picture
    }
  }
`;

export const EDIT_ORGANIZATION = gql`
mutation editOrganization(
  $_id: String!,
  $organization_name: String!,
  $description: String!,
  $picture: String!,
  ){
  editOrganization(
    _id: $_id,
    organization_name: $organization_name,
    description:$description,
    picture:$picture
  ){
    _id
    organization_name
    password
    description
    picture
  }
}
`;

// export const CHECK_ORGANIZATION = gql`
//   query check_organization($email: String!){
//     check_organization(email:$email) {
//       _id
//       password
//     }
//   }
// `;

export const ADD_ORGANIZATION = gql`
  mutation addOrganization(
    $_id: ID!,
    $organization_name: String!,
    $description: String!,
    $picture: String!,
    ) {
      addOrganization(
      _id:$_id,
      organization_name: $organization_name,
      description: $description,
      picture: $picture,
      ) {
      _id
      organization_name
      password
      description,
      picture,
    }
  }
`;

