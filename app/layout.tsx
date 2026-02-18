import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SWRegister from "@/components/SWRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://codophile.in"),
  title: {
    default: "Codophile - Visual CSS Playground & Tailwind Generator",
    template: "%s | Codophile",
  },
  description: "Master CSS through real-time experimentation. Control properties visually, see instant changes, and generate production-ready CSS & Tailwind code.",
  keywords: ["CSS Playground", "Tailwind CSS Generator", "Web Design Tool", "Frontend Development", "Visual Editor", "Code Generator"],
  authors: [{ name: "Codophile Team" }],
  creator: "Codophile",
  publisher: "Codophile",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codophile.in",
    title: "Codophile - Visual CSS Playground & Tailwind Generator",
    description: "Master CSS through real-time experimentation. Control properties visually, see instant changes, and generate production-ready CSS & Tailwind code.",
    siteName: "Codophile",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or is updated
        width: 1200,
        height: 630,
        alt: "Codophile Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codophile - Visual CSS Playground & Tailwind Generator",
    description: "Master CSS through real-time experimentation. Control properties visually, see instant changes, and generate production-ready CSS & Tailwind code.",
    creator: "@codophile",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRegister />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Codophile",
              "url": "https://codophile.in",
              "description": "Master CSS through real-time experimentation. Control properties visually, see instant changes, and generate production-ready CSS & Tailwind code.",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Codophile Team",
                "url": "https://codophile.in"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
