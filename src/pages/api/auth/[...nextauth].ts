import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 // 1 day
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email'},
        password: {label: 'Password'}
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email
        });

        if (!user) {
          client.close();
          throw new Error('No user found');
        }

        const isPasswordValid = await verifyPassword(credentials.password, user.password);

        if (!isPasswordValid) {
          client.close();
          throw new Error('No user found');
        }

        client.close();
        return {
          id: user._id.toString(),
          email: user.email,
          bio: user.bio,
          name: user.name,
          phone: user.phone,
          avatar_url: user.avatar_url
        };
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user}) {
      return {
        ...user, ...token,
      };
    },
    async session({session, user, token}) {
      return {
        ...session,
        ...token,
        ...user
      };
    }
  }
};

export default NextAuth(authOptions);

// https://github.com/DawnMD/next-auth-credentials/tree/next-auth-v4/
