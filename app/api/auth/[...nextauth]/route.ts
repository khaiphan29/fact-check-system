import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
//   secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "42",
          email: "admin",
          password: "123123",
        };

        // If no error and we have user data, return it
        if (
          credentials?.username === user.email &&
          credentials.password === user.password
        ) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
