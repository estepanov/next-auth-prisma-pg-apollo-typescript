import { gql } from '@apollo/client';

const DELETE_PUBLIC_MESSAGE_MUTATION = gql`
  mutation DeletePublicMessage($id: String!) {
    deletePublicMessage(id: $id) {
      id
      message
      author {
        id
        name
      }
    }
  }
`;

export default DELETE_PUBLIC_MESSAGE_MUTATION;
