import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Work_Sans({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeVibe",
  description: "CodeVibe- Leetcode Killer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} h-screen text-white bg-black max-w-full`}
      >
        {children}
      </body>
    </html>
  );
}
