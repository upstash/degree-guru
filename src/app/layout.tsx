import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cx from "@/utils/cx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DegreeGuru",
  description: "DegreeGuru ChatBot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className={cx(inter.className, "text-sm md:text-base bg-white")}>
        {children}
      </body>
    </html>
  );
}
