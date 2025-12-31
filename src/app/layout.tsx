import DefaultLayout from "@/components/layout/DefaultLayout";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "xyZRY1YzJDbEqdqb44ambRQciD4W_VvfcNMOmtpC0uk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add custom styles here */}
        <style>{`
          html {
            overflow: auto !important;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
