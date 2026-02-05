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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
