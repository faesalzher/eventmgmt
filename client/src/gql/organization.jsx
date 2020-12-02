import { gql } from "apollo-boost";

export const ORGANIZATION_QUERY = gql`
  query organization($_id: String!) {
    organization(_id: $_id) {
      _id
      organization_name
      description
      email
      phone_number
      address
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
      email
      phone_number
      address
    }
  }
`;

export const EDIT_ORGANIZATION = gql`
mutation editOrganization(
  $_id: String!,
  $organization_name: String!,
  $description: String!,
  $email: String!,
  $phone_number: String!,
  $address: String!,
  $picture: String!,
  ){
  editOrganization(
    _id: $_id,
    organization_name: $organization_name,
    description:$description,
    email:$email,
    phone_number:$phone_number,
    address:$address,
    picture:$picture
  ){
    _id
    organization_name
    description
    email
    phone_number
    address
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
    $email: String!,
    $phone_number: String!,
    $address: String!,
    $picture: String!,
    ) {
      addOrganization(
      _id:$_id,
      organization_name: $organization_name,
      description: $description,
      email:$email,
      phone_number:$phone_number,
      address:$address,
      picture: $picture,
      ) {
      _id
      organization_name
      password
      description,
      email
      phone_number
      address
      picture,
    }
  }
`;

