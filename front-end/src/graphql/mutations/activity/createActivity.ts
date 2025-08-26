import gql from "graphql-tag";

const CreateActivity = gql`
  mutation CreateActivity($createActivityInput: CreateActivityInput!) {
    createActivity(createActivityInput: $createActivityInput) {
      id
      city
      description
      name
      price
      createdAt
      owner {
        firstName
        lastName
      }
    }
  }
`;

export default CreateActivity;
