import { Inter } from 'next/font/google';
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Nexus 360",
};

import { CommandPalette } from "@/components/CommandPalette";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`bg-background text-on-background ${inter.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
