import "styles/globals.css";
import React from "react";

export const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
