import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 // 1 day
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
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
        const profileCollection = client.db().collection('profile');

        const user = await profileCollection.findOne({
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

        console.log(user);

        client.close();
        return {
          id: user._id.toString(),
          email: user.email,
          bio: user.bio,
          name: user.name,
          phone: user.phone,
        };
      }
    })
  ],
  secret: process.env.JWT_SECRET,
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

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
