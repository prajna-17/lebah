import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { AuthProvider } from "@/components/auth/AuthContext";
import { AddressProvider } from "@/context/AddressContext";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />

      <AuthProvider>
        <AddressProvider>
          <main className="min-h-screen">{children}</main>
        </AddressProvider>
      </AuthProvider>

      <BottomNav />
      <Footer />

      {/* Portal root for modals */}
      <div id="modal-root" />
    </>
  );
}
