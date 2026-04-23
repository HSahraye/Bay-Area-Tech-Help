import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XZ01NNX15P"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XZ01NNX15P');
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <TroubleshootingChatbot />
      </body>
    </html>
  );
}
