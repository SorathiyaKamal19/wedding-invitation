import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3A0909",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vowstory.app"),
  title: "Aarav & Ananya · 4 December 2027",
  description: "Together with our families, we invite you to join us as we take our vows.",
  icons: {
    icon: "/assets/couple-logo.webp",
  },
  openGraph: {
    title: "Aarav & Ananya · 4 December 2027",
    description: "Together with our families, we invite you to join us as we take our vows.",
    images: ["/assets/hero-1.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="js" data-side="groom">
      <body className="antialiased font-crimson">{children}</body>
    </html>
  );
}

