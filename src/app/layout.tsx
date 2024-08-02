import Provider from "@/provider/Provider";
import { DehydratedState } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "test for AVK",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider dehydratedState={{} as DehydratedState}>{children}</Provider>
      </body>
    </html>
  );
}
