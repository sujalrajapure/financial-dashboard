"use client";
import type React from "react";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const video = document.getElementById("intro-video") as HTMLVideoElement;
    if (video) {
      video.volume = 1.0; // Ensure volume is at full
      video.play().catch((error) => console.log("Autoplay blocked:", error));

      video.onended = () => setIsVideoPlaying(false);

      // Optional: Allow clicking to skip video
      const skipVideo = () => setIsVideoPlaying(false);
      video.addEventListener("click", skipVideo);

      return () => video.removeEventListener("click", skipVideo);
    }
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceMono.variable} font-sans bg-[#0a0a14]`}>
        {isVideoPlaying ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <video
              id="intro-video"
              className="w-full h-full object-cover"
              autoPlay
              muted // Initially muted
              playsInline
              onClick={(e) => (e.currentTarget.muted = !e.currentTarget.muted)} // Toggle sound on click
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <SidebarProvider>
              <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              </div>
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
