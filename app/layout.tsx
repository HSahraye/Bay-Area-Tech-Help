import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { TroubleshootingChatbot } from "@/components/chatbot/troubleshooting-chatbot";
import { WEBSITE_URL } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XZ01NNX15P" strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XZ01NNX15P');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <TroubleshootingChatbot />
      </body>
    </html>
  );
}
