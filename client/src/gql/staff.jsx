import { gql } from "apollo-boost";

export const STAFF_QUERY = gql`
  query staff($staff_id: String!) {
    staff(_id: $staff_id) {
      _id
      staff_name
      departement_position_id
      email
      phone_number
      password
      picture
      is_admin
      departement_id
      organization_id
    }
  }
`;
export const CHECK_STAFF = gql`
  query check_staff($email: String!){
    check_staff(email:$email) {
      _id
      email
      password
      is_admin
      organization_id
    }
  }
`;

export const STAFFS_QUERY = gql`
query staffs($organization_id:String!){
  staffs(organization_id: $organization_id){
      _id
      staff_name
      departement_position_id
      email
      phone_number
      password
      picture
      is_admin
      departement_id
      organization_id
  }
}
`;


export const ADD_STAFF = gql`
  mutation addStaff(
    $_id: String!,
    $staff_name: String!,
    $departement_position_id: String!,
    $email: String!,
    $phone_number: String!,
    $password: String!,
    $picture: String!,
    $is_admin: Boolean!,
    $departement_id: String!,
    $organization_id: String!,
    ){
    addStaff(
      _id: $_id,
      staff_name: $staff_name,
      departement_position_id: $departement_position_id,
      email:$email,
      phone_number:$phone_number,
      password:$password,
      picture:$picture,
      is_admin:$is_admin,
      departement_id:$departement_id,
      organization_id:$organization_id,
    ){
      _id
      staff_name
      departement_position_id
      email
      phone_number
      password
      picture
      is_admin
      departement_id
      organization_id
    }
  }
`;

export const EDIT_STAFF = gql`
  mutation editStaff(
    $_id: String!,
    $staff_name: String!,
    $departement_position_id: String!,
    $email: String!,
    $phone_number: String!,
    $password: String!,
    $picture: String!,
    $is_admin: Boolean!,
    $departement_id: String!,
    $organization_id: String!,
    ){
    editStaff(
      _id: $_id,
      staff_name: $staff_name,
      departement_position_id: $departement_position_id,
      email:$email,
      phone_number:$phone_number,
      password:$password,
      picture:$picture,
      is_admin:$is_admin,
      departement_id:$departement_id,
      organization_id:$organization_id,
    ){
      _id
      staff_name
      departement_position_id
      email
      phone_number
      password
      picture
      is_admin,
      departement_id
      organization_id
    }
  }
`;

export const DELETE_STAFF = gql`
mutation deleteStaff ($_id: String!) {
  deleteStaff(_id:$_id){
    _id
  }
}
`;