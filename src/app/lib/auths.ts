import {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const user = {
          id: "0",
          name: process.env.ADMIN_PANEL_LOGIN,
          password: process.env.ADMIN_PANEL_PASSWORD
        };

        if (
          credentials?.username !== user.name ||
          credentials?.password !== user.password
        ) {
          return null;
        } else {
          return user;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
