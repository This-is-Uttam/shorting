import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";



export const metadata = {
  title: "Shorting Link",
  description: "Make your every link short and easy to read.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-900`}
      >
        
        {children}
      </body>
    </html>
  );
}
