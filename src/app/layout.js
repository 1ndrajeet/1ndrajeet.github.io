import { Montserrat } from "next/font/google";
import "./globals.css";
import "./style.css";
import CustomCursor from "./script";
import { Analytics } from "@vercel/analytics/react";

const font = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "1ndrajeet",
  description: "Welcome",
  icons: {
    icon: "/terminal.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={font.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
