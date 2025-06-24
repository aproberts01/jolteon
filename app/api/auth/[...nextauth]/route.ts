import NextAuth, { AuthOptions, DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/prisma"

export const runtime = 'nodejs';

interface Session {
  user: {
    id?: string 
  } & DefaultSession['user'];
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as Session['user']).id = token.sub;
      }
      return session;
    },
    async redirect({ baseUrl, url }: { baseUrl: string; url: string }) {
      return 'http://localhost:3000' + '/redirecting';
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };