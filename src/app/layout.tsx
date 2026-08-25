import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kodium.dev"),
  title: "Kodium — AI Developer Command Center",
  description:
    "Kodium is an AI-native developer command center for understanding codebases, directing software agents, collaborating on projects, and shipping software from desktop or phone.",
  keywords: [
    "AI Developer Command Center",
    "Autonomous Software Agents",
    "Codebase Intelligence",
    "Developer Infrastructure",
    "Agentic IDE",
    "DevOps Automation",
    "Remote Development Control",
    "Kodium",
  ],
  authors: [{ name: "Kodium Core Systems" }],
  creator: "Kodium",
  publisher: "Kodium",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kodium.dev",
    title: "Kodium — AI Developer Command Center",
    description:
      "Your development environment, under control. Persistent codebase intelligence, autonomous agent orchestration, and remote ship control.",
    siteName: "Kodium",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kodium AI Developer Command Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodium — AI Developer Command Center",
    description:
      "Your development environment, under control. Understand, direct, verify, and ship from one command plane.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2308090B'/><defs><linearGradient id='k' x1='0%25' y1='100%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%2394A3B8'/><stop offset='35%25' stop-color='%23E2E8F0'/><stop offset='70%25' stop-color='%23FFFFFF'/><stop offset='100%25' stop-color='%23CBD5E1'/></linearGradient></defs><path d='M 28 80 V 27 L 44 14 V 42 L 37 49 L 44 56 V 80 H 28 Z' fill='url(%23k)'/><path d='M 40 44 L 78 26 V 40 L 48 57 L 40 44 Z' fill='url(%23k)'/><path d='M 48 57 L 78 78 H 63 L 40 54 L 48 57 Z' fill='url(%23k)'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-[100dvh] bg-[#08090b] dark:bg-[#08090b] light:bg-white text-[#f3f4f6] dark:text-[#f3f4f6] light:text-slate-900 font-sans selection:bg-white/20 selection:text-white relative transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

