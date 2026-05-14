import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ComingSoon } from "@/src/components/home/ComingSoon";
import { Cursor } from "@/src/components/layout/Cursor";
import { GsapProvider } from "@/src/components/GsapProvider";
import { ParallaxProvider } from "@/src/contexts/ParallaxContext";
import { AudioProvider } from "@/src/contexts/AudioContext";
import { TransitionProvider } from "@/src/contexts/TransitionContext";
import { TransitionOverlay } from "@/src/components/layout/TransitionOverlay";
import { NavController } from "@/src/components/layout/NavController";
import { PAGE_SEO, BASE_URL } from "@/src/data/seo";
import { JsonLd } from "@/src/components/layout/JsonLd";

const seo = PAGE_SEO.home;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: 'https://constanzaschwartz.com',
  },
  icons: {
    icon: [
      { url: "/CONSTANZASCHWARTZ_48X48_Favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/CONSTANZASCHWARTZ_FAVICON_192X192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/CONSTANZASCHWARTZ_FAVICON_192X192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: BASE_URL,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LBHSXVNS1R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LBHSXVNS1R');
          `}
        </Script>
        {/* <ComingSoon /> */}
        <GsapProvider>
          <AudioProvider>
            <ParallaxProvider>
              <TransitionProvider>
                <NavController />
                {children}
                <TransitionOverlay />
              </TransitionProvider>
            </ParallaxProvider>
          </AudioProvider>
        </GsapProvider>
        <Cursor />

      </body>
    </html>
  );
}
