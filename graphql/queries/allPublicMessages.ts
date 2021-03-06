import { gql } from '@apollo/client';

const PUBLIC_MESSAGES_QUERY = gql`
  query AllPublicMessages {
    publicMessages {
      id
      message
      createdAt
      author {
        id
        name
      }
    }
  }
`;

export default PUBLIC_MESSAGES_QUERY;
