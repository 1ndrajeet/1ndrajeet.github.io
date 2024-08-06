import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "1ndrajeet",
  description: "Welcome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={font.className}>{children}</body>
    </html>
  );
}
