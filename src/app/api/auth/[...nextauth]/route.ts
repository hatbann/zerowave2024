/** @format */

import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      // 로그인 실행
      async authorize(credentials, req) {
        const params = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const API_URL =
          process.env.NODE_ENV === "production"
            ? "/api"
            : process.env.NEXT_PUBLIC_API_URL!;

        const response = await fetch(`${API_URL}/user/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });

        const res = await response.json();
        /*    console.log(res); */

        if (res.message == "OK") {
          return res;
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
  /*   callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      console.log(session);
      session.user = token as any;
      return session;
    },
  }, */
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
