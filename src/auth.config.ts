import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import Google from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google';

import { SignInSchema } from '@/schemas/auth';

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            },
          );

          const response = await res.json();

          if (res.ok && response.data) {
            return {
              id: response.data.auth.user_id,
              token: response.data.auth.token,
              onBoarding: response.data.user.onboarding,
            };
          }
          return null;
        }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ account }) {
  //     console.log('Account Data:', account);
  //   },
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user && 'id' in user) {
  //       token.id = user.id as string;
  //       token.token = user.token as string;
  //       token.onBoarding = user.onBoarding as boolean;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user = {
  //       id: token.id as string,
  //       onBoarding: token.onBoarding as boolean,
  //     };
  //     session.accessToken = token.token as string;
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
