import prisma, { getUserFromSession } from '../../../prisma/client';

const deletePublicMessage = async (parent, { id }, { session }, info) => {
  const user = await getUserFromSession(session || {});
  if (!user) return null;
  const publicMessage = await prisma.publicMessage.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
  if (user.id !== publicMessage?.authorId) return null;
  return prisma.publicMessage.delete({
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
};

export default deletePublicMessage;
