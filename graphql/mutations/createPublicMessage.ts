import { gql } from '@apollo/client';

const CREATE_PUBLIC_MESSAGE_MUTATION = gql`
  mutation CreatePublicMessage($message: String!) {
    createPublicMessage(message: $message) {
      id
      message
      author {
        id
        name
      }
    }
  }
`;

export default CREATE_PUBLIC_MESSAGE_MUTATION;
