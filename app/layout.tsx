import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "TOPSYS IT: Technology modernization, AI and data, and engineering talent",
    template: "%s | TOPSYS IT",
  },
  description:
    "TOPSYS IT builds and runs critical systems for enterprises and state government agencies: modernization, AI and data, cloud, security, and specialized technology teams.",
  metadataBase: new URL("https://www.topsysit.com"),
};

export const viewport: Viewport = {
  themeColor: "#f4efe3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-control focus:bg-teal focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
