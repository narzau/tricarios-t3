import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/app/providers/providers";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sistema - Tricarios Growshop ",
  description: "El mejor growshop que vas a encontrar",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerAuthSession();
  
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Providers serverSession={serverSession}>
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
