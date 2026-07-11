import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "salon@portfolio:~ | Salon Raut — ASP.NET Core Developer",
  description:
    "Salon Raut — ASP.NET Core / full-stack developer. Clean Architecture, CQRS, RabbitMQ, Redis and SignalR. Based in Bhaktapur, Nepal.",
  keywords: [
    "Salon Raut",
    "ASP.NET Core",
    "Full-stack developer",
    "Clean Architecture",
    "CQRS",
    "SignalR",
    "Nepal",
  ],
  authors: [{ name: "Salon Raut" }],
  openGraph: {
    title: "Salon Raut — ASP.NET Core Developer",
    description:
      "Building scalable backend systems with Clean Architecture, CQRS and real-time features.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}
