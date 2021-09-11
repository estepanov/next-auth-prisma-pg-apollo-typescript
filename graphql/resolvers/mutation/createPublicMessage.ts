import prisma, { getUserFromSession } from '../../../prisma/client';

const createPublicMessage = async (parent, { message }, { session }, info) => {
  const user = await getUserFromSession(session || {});
  if (!user) return null;
  return prisma.publicMessage.create({
    data: {
      message,
      authorId: user.id,
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
};

export default createPublicMessage;
