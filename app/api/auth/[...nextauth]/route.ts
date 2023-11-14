import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const user = await prisma.user.findFirst({
          where: {
            AND: [
              {
                OR: [
                  { username: credentials?.username },
                  { email: credentials?.username },
                ],
              },
              { password: credentials?.password },
            ],
          },
        });

        prisma.$disconnect();
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  console.log(req.body);
  return await NextAuth(req, res, authOptions);
}

export { auth as GET, auth as POST };
