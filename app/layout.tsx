import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Pulse — Presence, from the horizon.",
  description:
    "Pulse is the real-time ambient-presence SDK for the location-aware web. Show your users who's around — visible from miles away, beautiful from blocks away — in ten lines of code.",
  metadataBase: new URL("https://mypulse.city"),
  openGraph: {
    title: "Pulse — Presence, from the horizon.",
    description:
      "Real-time ambient-presence SDK for the location-aware web. Drop in 3D geo-presence in 10 lines of code.",
    url: "https://mypulse.city",
    siteName: "Pulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse — Presence, from the horizon.",
    description:
      "Real-time ambient-presence SDK for the location-aware web.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-bg text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
