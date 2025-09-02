import gql from "graphql-tag";

const GetUser = gql`
  query GetUser {
    getMe {
      id
      firstName
      lastName
      email
      role
      favorites
    }
  }
`;

export default GetUser;
