import React from "react";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { ScrollProgress } from "@/components/site/Decor";
import { BracketHighlighter } from "@/components/site/BracketHighlighter";
import { Footer } from "@/components/site/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        <ScrollProgress />
  <BracketHighlighter />
        <Nav />
        <div className="min-h-screen pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
