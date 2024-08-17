import { Montserrat } from "next/font/google";
import "./globals.css";
import "./style.css";
import Head from "next/head";
import CustomCursor from './script'; // Adjust the path as necessary

const font = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "1ndrajeet",
  description: "Welcome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" href="/terminal.png" />
      </Head>
      <body className={font.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
