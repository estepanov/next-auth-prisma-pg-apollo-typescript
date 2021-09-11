import prisma from '../../../prisma/client';

const publicMessages = (parent, args, context, info) =>
  prisma.publicMessage.findMany({
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
  }) || [];

export default publicMessages;
