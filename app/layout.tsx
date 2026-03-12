import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Cursor } from "@/src/components/Cursor";

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
        {children}
        <Cursor />
      </body>
    </html>
  );
}
