import "styles/globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
export const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
