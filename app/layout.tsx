import { ThemeProvider } from "@/components/providers/theme-provider";
import { Component } from "@/components/ui/component";
import { PropsWithChildren } from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Colored QR Code",
  description: "Generate and share colored QR codes with ease.",
  keywords: ["QR Code", "Color", "Colors", "Generator", "Share", "Link"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qr-color.vercel.app/",
    siteName: "Colored QR Code",
    title: "Colored QR Code",
    description: "Generate and share colored QR codes with ease.",
    images: [
      {
        url: "https://qr-color.vercel.app/og-image.png",
        alt: "Colored QR Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colored QR Code",
    description: "Generate and share colored QR codes with ease.",
    images: [
      {
        url: "https://qr-color.vercel.app/og-image.png",
        alt: "Colored QR Code",
      },
    ]
  }
};

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <script defer src="https://woyage.app/track.js" data-website-id="6e9ac9c6-fc6e-4100-ae66-e2ab6e4532e6"></script>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;