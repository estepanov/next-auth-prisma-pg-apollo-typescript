// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const helloHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  const session = await getSession({ req });
  if (session) {
    res.end(`${session?.user?.name || session?.user?.email}`);
  } else {
    res.statusCode = 403;
    res.end('Unauthorized');
  }
};

export default helloHandler;
