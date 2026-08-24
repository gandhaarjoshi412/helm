import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://helm.dev"),
  title: "HELM — AI Developer Command Center",
  description:
    "HELM is an AI-native developer command center for understanding codebases, directing software agents, collaborating on projects, and shipping software from desktop or phone.",
  keywords: [
    "AI Developer Command Center",
    "Autonomous Software Agents",
    "Codebase Intelligence",
    "Developer Infrastructure",
    "Agentic IDE",
    "DevOps Automation",
    "Remote Development Control",
    "HELM",
  ],
  authors: [{ name: "HELM Core Systems" }],
  creator: "HELM",
  publisher: "HELM",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helm.dev",
    title: "HELM — AI Developer Command Center",
    description:
      "Your development environment, under control. Persistent codebase intelligence, autonomous agent orchestration, and remote ship control.",
    siteName: "HELM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HELM AI Developer Command Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HELM — AI Developer Command Center",
    description:
      "Your development environment, under control. Understand, direct, verify, and ship from one command plane.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2308090B'/><circle cx='16' cy='16' r='10' stroke='%2338BDF8' stroke-width='2' fill='none'/><circle cx='16' cy='16' r='4' fill='%2338BDF8'/><line x1='16' y1='6' x2='16' y2='10' stroke='%2338BDF8' stroke-width='2' stroke-linecap='round'/><line x1='16' y1='22' x2='16' y2='26' stroke='%2338BDF8' stroke-width='2' stroke-linecap='round'/><line x1='6' y1='16' x2='10' y2='16' stroke='%2338BDF8' stroke-width='2' stroke-linecap='round'/><line x1='22' y1='16' x2='26' y2='16' stroke='%2338BDF8' stroke-width='2' stroke-linecap='round'/></svg>",
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
      <body className="min-h-[100dvh] bg-[#08090b] text-[#f3f4f6] font-sans selection:bg-sky-500/25 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
