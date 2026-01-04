import "./globals.css";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "ECG & PCG Detection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
