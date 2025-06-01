import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./context/ProductContext";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stake Away",
  description: "Your favorite food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </ProductProvider>
      </body>
    </html>
  );
}
