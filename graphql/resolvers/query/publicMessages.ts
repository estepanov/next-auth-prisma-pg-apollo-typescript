import prisma from '../../../prisma/client';

const publicMessages = (parent, args, context, info) =>
  prisma.publicMessage.findMany({
    take: 100,
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
