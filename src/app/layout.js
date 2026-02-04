import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Lato } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} font-sans bg-white text-black`}>
        <Header />
        <AuthProvider>
          <main className="min-h-screen">{children}</main>
        </AuthProvider>

        <BottomNav />
        <Footer />

        {/* 🔑 PORTAL ROOT */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
