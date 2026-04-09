import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ComingSoon } from "@/src/components/ComingSoon";
import { Cursor } from "@/src/components/Cursor";
import { GsapProvider } from "@/src/components/GsapProvider";
import { ParallaxProvider } from "@/src/contexts/ParallaxContext";
import { AudioProvider } from "@/src/contexts/AudioContext";
import { TransitionProvider } from "@/src/context/TransitionContext";
import { TransitionOverlay } from "@/src/components/TransitionOverlay";
import { NavController } from "@/src/components/NavController";

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
