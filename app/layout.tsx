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

export const metadata: Metadata = {
  title: "Constanza Schwartz",
  description: "Artist portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
