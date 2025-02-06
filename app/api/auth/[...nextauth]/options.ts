import directus from '@/lib/directus';
import tokendirectus from '@/lib/tokendirectus';
import { login, readMe } from '@directus/sdk';
import { Awaitable, NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

interface CustomSession extends Session {
  accessToken?: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        const auth = await directus.request(login(email, password));
        if (!auth) {
          throw new Error('Invalid email or password');
        }

        const apiAuth = tokendirectus(auth.access_tokens);
        const loggedInUser = await apiAuth.request(
          readMe({
            fields: ['id', 'email', 'fist_name', 'last_name'],
          })
        );

        const user: Awaitable<User> = {
          id: loggedInUser.id,
          email: loggedInUser.email ?? '',
          first_name: loggedInUser.first_name ?? '',
          last_name: loggedInUser.last_name ?? '',
          access_token: auth.access_token ?? '',
          refresh_token: auth.refresh_token ?? '',
          expires: Math.floor(Date.now() / 1000) + (auth.expires ?? 3600),
        };

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (user && account) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          expires_at: user.expires,
        };
      }
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        id: token.id,
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
      };
      return session;
    },
  },
};
