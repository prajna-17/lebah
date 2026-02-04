import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} font-sans bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
