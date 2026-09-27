import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Rohit | AI & Data Science Student",
  description:
    "Personal portfolio and technical case studies of Rohit, an AI & Data Science engineering student at ISBM College of Engineering (B.E. '27, CGPA 8.67). Specializing in combinatorial optimization, microscopic traffic simulation, NLP pipelines, and production model serving.",
  keywords: [
    "Rohit",
    "Rohitk69992",
    "AI Engineer",
    "Data Science",
    "Machine Learning",
    "Combinatorial Optimization",
    "CVRP",
    "Eclipse SUMO",
    "QPSO",
    "QAOA",
    "NLP",
    "Intent Classification",
    "FastAPI",
    "ISBM College of Engineering",
  ],
  authors: [{ name: "Rohit", url: "https://github.com/Rohitk69992" }],
  creator: "Rohit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Rohitk69992",
    title: "Rohit | AI & Data Science Student",
    description:
      "AI & Data Science undergraduate researcher and systems builder. Real-world machine learning, combinatorial optimization, and production model serving.",
    siteName: "Rohit Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit | AI & Data Science Student",
    description:
      "AI & Data Science undergraduate researcher and systems builder. Real-world machine learning, combinatorial optimization, and production model serving.",
    creator: "@Rohitk69992",
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

export const viewport: Viewport = {
  themeColor: "#08090c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#08090c] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
