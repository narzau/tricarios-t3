"use client"
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
export function Providers(props: { children: React.ReactNode; serverSession: Session | null }) {
    return (
      <SessionProvider session={props.serverSession}>
              {props.children}
      </SessionProvider>
    );
  }
  