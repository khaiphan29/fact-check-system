import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const user = {
        //   id: "42",
        //   email: "admin",
        //   password: "123123",
        // };

        console.log(credentials);

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

        console.log(user);

        // If no error and we have user data, return it
        if (user) {
          return { ...user, id: user.id.toString };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
