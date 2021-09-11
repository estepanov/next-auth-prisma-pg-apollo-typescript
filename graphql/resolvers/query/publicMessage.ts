import prisma from '../../../prisma/client';

const publicMessage = (parent, { id }, context, info) =>
  prisma.publicMessage.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      message: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
export default publicMessage;
