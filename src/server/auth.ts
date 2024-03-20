import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import * as bcrypt from 'bcrypt';
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  } 
}

export type User = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) { 
      if(account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) { 
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: '/login', //(4) custom signin page path
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials?.email
            }
          });
  
          if (user && credentials){
            const validPassword = await bcrypt.compare(credentials?.password, user.password); 
  
            if (validPassword){
              return {
                id: user.id,
                name: user.name,
              }
            }
          }
        } catch(error){
          console.log(error)
        }
        return null
      }
    })
  ],
};


export const getServerAuthSession = () => getServerSession(authOptions); //(6) 
