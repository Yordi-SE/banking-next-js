import type { Metadata } from "next";
import localFont from "next/font/local";
import {Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
