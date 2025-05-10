import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "1ndrajeet",
  description: "1ndrajeet | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <body className={`${font.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
