import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "6ixKar - Your Canadian Car Buying Companion",
  description: "Navigate the Canadian car market with AI-powered insights. Get real-time pricing, provincial insurance rates, and winter readiness scores.",
  keywords: "Canadian cars, car buying, insurance rates, winter cars, car financing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} antialiased bg-slate-950`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}