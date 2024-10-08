import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Component } from "@/components/ui/component";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

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
};

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
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