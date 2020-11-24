import { gql } from "apollo-boost";

export const POSITION_QUERY = gql`
  query position($_id: String!){
    position(_id:$_id) {
      _id
      position_name
      core
    }
  }
`;


export const POSITIONS_QUERY = gql`
{
  positions{
      _id
      position_name
      core
  }
}
`;