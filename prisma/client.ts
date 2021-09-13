import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const getUserFromSession = ({ accessToken }: { accessToken: string }) =>
  accessToken
    ? prisma.user.findFirst({
        where: {
          sessions: {
            some: {
              accessToken,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
    : null;

export default prisma;
