import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import EliteLoader from "@/components/ui/EliteLoader";
import FloatingActions from "@/components/ui/FloatingActions";
import UrgencyToast from "@/components/ui/UrgencyToast";
import RenderAntiSleep from "@/components/utils/RenderAntiSleep";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.naarihomestay.com"),
  title: "Naari Homestay, Mathura | Premium Family Sanctuary Near Janmabhoomi",
  description: "Experience the ultimate family stay at Naari Homestay Mathura. Safe, peaceful AC rooms opposite Police Chowki, just 10 mins from Shri Krishna Janmabhoomi. Private kitchens available. Book your Mathura Yatra today.",
  keywords: [
    "Mathura Homestay", "Best Family Stay Mathura", "Janmabhoomi Temple Stay", "Naari Homestay", "Safe Hotel Mathura", 
    "Vrindavan Yatra Stay", "Mathura Pilgrimage stay", "Mathura Guest House", "Homestay near Mathura Junction", 
    "Family rooms in Mathura near temple", "Safe stay for female travelers in Mathura", "Dampier Nagar homestays", 
    "Mathura Darshan stay with food", "Budget homestay in Mathura"
  ],
  openGraph: {
    title: "Naari Homestay Mathura | Your Safe & Peaceful Mathura Sanctuary",
    description: "Premium property in Dampier Nagar, Mathura. Perfect for families visiting Janmabhoomi and Vrindavan. Clean, secure, and hospitable.",
    images: ["/assets/hero_real.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`h-full scroll-smooth ${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans relative overflow-x-hidden bg-background text-text">
        <RenderAntiSleep />
        <EliteLoader />
        {children}
        <FloatingActions />
        <UrgencyToast />
      </body>
    </html>
  );
}
