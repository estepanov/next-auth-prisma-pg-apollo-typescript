import prisma from '../../../prisma/client';

const publicMessages = (parent, { page }, context, info) =>
  prisma.publicMessage.findMany({
    take: 5,
    skip: page ? page - 1 : undefined,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

export default publicMessages;
