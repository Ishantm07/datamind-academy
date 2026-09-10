import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataMind Academy — Learn SQL, Python, Power BI, ML & AI",
  description:
    "A free, structured learning platform for SQL, Power BI, Python, Machine Learning, and Artificial Intelligence — from absolute beginner to advanced.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
