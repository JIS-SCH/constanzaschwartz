import type { Metadata } from "next";
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
        {children}
        <Cursor />
      </body>
    </html>
  );
}
