import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import ClientLayout from "./loadUserDataWrapper";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const supercellMagic = localFont({
  src: "../public/fonts/Supercell-Magic Regular.ttf",
  variable: "--font-supercell",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clash Royal Tracker",
  description: "Track Players And Decks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${supercellMagic.variable} antialiased`}
      >
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        /> */}
        <ClientLayout>
          {children}
          <Toaster />

        </ClientLayout>
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
