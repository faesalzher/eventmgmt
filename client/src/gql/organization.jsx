import { gql } from "apollo-boost";

export const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      organization_name
      email
      description
      password
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
  $email: String!,
  $password: String!,
  $description: String!,
  $picture: String!,
  ){
  editOrganization(
    _id: $_id,
    organization_name: $organization_name,
    email: $email,
    password:$password,
    description:$description,
    picture:$picture
  ){
    _id
    organization_name
    email
    password
    description
    picture
  }
}
`;

export const CHECK_ORGANIZATION = gql`
  query check_organization($email: String!){
    check_organization(email:$email) {
      _id
      email
      password
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $_id: ID!,
    $organization_name: String!,
    $email: ID!,
    $password: String!,
    ) {
    register(
      _id:$_id,
      organization_name: $organization_name,
      email: $email,
      password: $password,
      ) {
      _id
      organization_name
      email
      password
    }
  }
`;

