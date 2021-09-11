import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
import typeDefs from '../../graphql/typeDefs';
import resolvers from '../../graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req });
    return { session };
  },
  plugins:
    process.env.NODE_ENV === 'production'
      ? [ApolloServerPluginLandingPageDisabled]
      : [],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const startServer = server.start();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  if (process.env.NODE_ENV !== 'production') {
    // enable cors for apollo studio to work
    await runMiddleware(
      req,
      res,
      cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      })
    );
  }

  await server.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
