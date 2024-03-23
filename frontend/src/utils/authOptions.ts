import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { JWT } from "next-auth/jwt";

import { BACKEND_URL } from "./constants";

type BodyType = {
  email: string;
  password: string;
};

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token?.backendTokens?.refreshToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw Error("RefreshTokenError");
  }

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const body: BodyType = {
          email,
          password,
        };

        let res;

        try {
          res = await fetch(BACKEND_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          throw Error("FetchError");
        }

        if (res.status === 401) {
          throw Error("EmailOrPasswordAreIncorrect");
        }

        if (res.status === 403) {
          throw Error("EmailNotVerfied");
        }

        const result = await res.json();

        return result;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() < token?.backendTokens?.expiresIn) return token;

      const newToken = await refreshToken(token);
      return {
        user: newToken.user,
        backendTokens: {
          ...token.backendTokens,
          ...newToken.backendTokens,
        },
      };
    },
    async session({ token, session }) {
      session.user = token?.user;
      session.backendTokens = token?.backendTokens;

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/404",
    error: "/404",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
