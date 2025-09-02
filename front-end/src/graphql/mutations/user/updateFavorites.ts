import gql from "graphql-tag";

const UpdateFavorite = gql`
  mutation UpdateFavorite($activityId: ID!) {
    updateFavorite(activityId: $activityId) {
      id
      favorites
    }
  }
`;

export default UpdateFavorite;
