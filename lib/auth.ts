import * as FIORENT_PORTAL_API from "@/contants/fiorentPortalApi";
import crypto from "crypto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // Default: 12 hours
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials: { email: string; password: string }) {
        try {
          // make request to fiorent api
          const response = await fetch(FIORENT_PORTAL_API.AUTHENTICATE, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userNameOrEmailAddress: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response?.ok) {
            const error = await response.json();
            throw new Error(error?.error?.message);
          }
          const loginData = await response.json();
          let userHash = null;
          const secretKey = process.env.INTERCOM_SECRET_KEY || ""; // an Identity Verification secret key (web)
          if (loginData?.result?.userId && secretKey) {
            const userIdentifier = loginData?.result?.userId.toString(); // a UUID to identify your user
            userHash = crypto
              .createHmac("sha256", secretKey)
              .update(userIdentifier)
              .digest("hex");
          }

          const user = {
            email: credentials.email,
            name: loginData?.result?.name,
            surname: loginData?.result?.surname,
            accessToken: loginData?.result?.accessToken,
            // refreshToken: loginData?.result?.refreshToken,
            userId: loginData?.result?.userId,
            tenantId: loginData?.result?.tenantId,
            userType: loginData?.result?.userType,
            userHash: userHash,
            expireTime: loginData?.result?.loginExpireInSeconds,
            // encryptedAccessToken: loginData?.result?.encryptedAccessToken,
          };
          return user;
        } catch (error: any) {
          throw new Error(error?.message as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      if (token?.expireTime) {
        //@ts-ignore
        authOptions.session.maxAge = token.expireTime;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.userId as string;
      session.user.name = token.name;
      session.user.surname = token.surname;
      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      session.user.tenantId = token.tenantId;
      session.user.userType = token.userType;
      session.user.userHash = token.userHash;
      // session.user.encryptedAccessToken = token.encryptedAccessToken;
      if (token.maxAge) {
        //@ts-ignore
        session.maxAge = token.maxAge;
      }

      return session;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};
