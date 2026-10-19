import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Mealstorm Grimoire",
  description: "A collection of recipes to help me keep my stuff together",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mealstorm Grimoire",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "Mealstorm Grimoire",
    description: "A collection of recipes to help me keep my stuff together",
    type: "website",
    images: [{ url: "/icons/icon-512x512.png", width: 512, height: 512, alt: "Mealstorm Grimoire" }],
  },
  twitter: {
    card: "summary",
    title: "Mealstorm Grimoire",
    description: "A collection of recipes to help me keep my stuff together",
    images: ["/icons/icon-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
