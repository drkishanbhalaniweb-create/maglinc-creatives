import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, Doto } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/ui/cursor-provider";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
});

export const metadata: Metadata = {
  title: "Maglinc Creatives",
  description: "Where code meets creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${doto.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-black text-white font-sans">
        <CursorProvider>
          <MagneticCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
