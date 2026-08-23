import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import MainLayout from "./layouts/MainLayout";
import ExtensionGuard from "./components/system/ExtensionGuard";
import { SITE } from "@/app/constants/site";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: "/images/venom-viper-icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/app/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/venom-viper-icon.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <head>
        <ExtensionGuard />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
