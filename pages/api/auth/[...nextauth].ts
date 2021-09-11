import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma/client';

const options = {
  // debug: true,
  providers: [
    Providers.Email({
      server: process.env.SMTP_SERVER,
      from: process.env.SMTP_FROM, // The "from" address that you want to use
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  cookies:
    process.env.NODE_ENV !== 'production'
      ? {
          sessionToken: {
            name: 'next-auth.session-token',
            options: {
              httpOnly: true,
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
          callbackUrl: {
            name: 'next-auth.callback-url',
            options: {
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
          csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
              httpOnly: true,
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
          pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
              httpOnly: true,
              sameSite: 'none',
              path: '/',
              secure: true,
            },
          },
        }
      : {},
};

export default NextAuth(options);
