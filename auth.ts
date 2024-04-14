import NextAuth, { DefaultSession, User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { DefaultContext } from "react-icons";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationById } from "./data/two-factor-confirmation";
import { getAccountByuserId } from "./data/account";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Alow Oauth without email verification
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationById(
          existingUser.id
        );
        console.log({ twoFactorConfirmation });
        if (!twoFactorConfirmation) return false;
        // delete two factor confirmation
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      // console.log({ Sessiontoken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      // for setting page
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        // for checking Oauth
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      console.log("I AM BEING CALLED AGAINs");
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      // for checking Oauth
      const existingAccount = await getAccountByuserId(existingUser.id);
      token.isOauth = !!existingAccount;
      // for checking Oauth
      //for seetting page
      token.name = existingUser.name;
      token.email = existingUser.email;
      //for seetting page
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
