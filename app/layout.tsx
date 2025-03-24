import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResumeProvider from "@/providers/ResumeBuilder";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create a professional resume with our easy-to-use builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
