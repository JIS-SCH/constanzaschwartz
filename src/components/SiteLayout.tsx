/* eslint-disable @next/next/no-head-element -- Shared App Router root document, not a Pages Router component. */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { LanguageProvider } from "@/src/i18n/LanguageProvider";
import type { Locale } from "@/src/i18n/locale";
import { Cursor } from "@/src/components/layout/Cursor";
import { GsapProvider } from "@/src/components/GsapProvider";
import { ParallaxProvider } from "@/src/contexts/ParallaxContext";
import { AudioProvider } from "@/src/contexts/AudioContext";
import { TransitionProvider } from "@/src/contexts/TransitionContext";
import { TransitionOverlay } from "@/src/components/layout/TransitionOverlay";
import { NavController } from "@/src/components/layout/NavController";
import { WheelScrollFix } from "@/src/components/layout/WheelScrollFix";
import { LANGUAGE_TRANSITION_BOOTSTRAP, LANGUAGE_TRANSITION_STYLES } from '@/src/i18n/languageTransition';
import { PAGE_SEO, BASE_URL } from "@/src/data/seo";

const seo = PAGE_SEO.home;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F0F0F',
}

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: 'https://constanzaschwartz.com',
    languages: { es: '/', en: '/en', 'x-default': '/' },
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


export default function SiteLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: LANGUAGE_TRANSITION_STYLES }} />
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_TRANSITION_BOOTSTRAP }} />
      </head>
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
        <LanguageProvider locale={locale}>
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
        <WheelScrollFix />
        </LanguageProvider>

      </body>
    </html>
  );
}

