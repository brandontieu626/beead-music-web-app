import "styles/globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Beaad",
  description: "none",
  icons: {
    icon: "/icon.ico",
  },
};
export const RootLayout = ({ children }) => {
  return (
    <html>
      <head>
        <link rel="icon" href="/icon.ico" sizes="100x100" />
      </head>
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
