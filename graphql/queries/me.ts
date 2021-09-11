import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      emailVerified
    }
  }
`;

export default ME_QUERY;
