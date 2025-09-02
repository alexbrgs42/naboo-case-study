import gql from "graphql-tag";

const ReorderFavorites = gql`
  mutation ReorderFavorites($favorites: [String!]!) {
    reorderFavorites(favorites: $favorites) {
      id
      favorites
    }
  }
`;

export default ReorderFavorites;
