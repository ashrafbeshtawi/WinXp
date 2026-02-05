import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashraf OS - Portfolio",
  description: "Windows XP style portfolio of Ashraf Beshtawi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/xp.css@0.2.6/dist/XP.css" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
