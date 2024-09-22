import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/db'
import { Prisma } from '@prisma/client'

// Store list of all users in some db somewhere
// PrismaAdapter create a new user record using appropriate schema for next-auth

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing Github OAuth Credentials')
}

// setup call to next auth object.
// returns properties that we destructure and export; github servers will call GET/POST request handlers
// 'auth' function checks if user is signed in or not in react component
// signOut/signIn are functions we can call
export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //fixing bug: 'user' doesnt get 'id' property assigned to them
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
