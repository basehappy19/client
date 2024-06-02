import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./layouts/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "./AuthProvider";
import 'sweetalert2/src/sweetalert2.scss'
import Footer from "./layouts/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: `หน้าแรก ${process.env.NEXT_PUBLIC_META_TITLE}`,
  icons:{
    icon:[
      '/favicon.ico?v=4'
    ],
    apple:[
      '/apple-touch-icon.png?v=4'
    ],
    shortcut:[
      '/apple-touch-icon.png'
    ],
    manifest: '/site.webmanifest'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NextUIProvider>
            <NextTopLoader color="#e753e1" />
            <Navbar />
            <ToastContainer />
            {children}
            <Footer />
          </NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
