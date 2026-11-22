import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#FAF5EF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <div id="app">
            <AnnouncementBar />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
