"use client";

import { X, ChevronRight } from "lucide-react";
import {
  User,
  ShoppingBag,
  Tag,
  Gift,
  Info,
  HelpCircle,
  Star,
  Settings,
  LogOut,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useAddress } from "@/context/AddressContext";
import { clearCart } from "@/utils/cart";
import { clearWishlist } from "@/utils/wishlist";
import { Shield } from "lucide-react";
import LoginGate from "@/components/auth/LoginGate";

export default function Sidebar({ open, onClose }) {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { clearAddress } = useAddress();

  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 🔒 LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const handleLogout = () => {
    // 🔥 clear everything
    clearAddress();
    clearCart();
    clearWishlist();

    logout();
    onClose();

    // 📳 vibration
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }

    // 🔔 show message
    setShowLogoutMsg(true);

    setTimeout(() => {
      setShowLogoutMsg(false);
      router.push("/"); // home
    }, 2000);
  };

  const go = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <>
      {/* ✅ LOGOUT MESSAGE (GLOBAL, NOT INSIDE SIDEBAR) */}
      {showLogoutMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg animate-fadeIn">
          Logged out successfully
        </div>
      )}

      {/* SIDEBAR */}
      {open && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 bg-black/40 z-9998" onClick={onClose} />

          <aside className="fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[9999] animate-sidebar shadow-xl">
            {/* HEADER IMAGE */}
            <div className="relative h-[160px]">
              <img
                src="/img/cordyroy.jpeg"
                className="w-full h-full object-cover"
                alt="Lebah"
              />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-1"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-semibold">Welcome!</h2>
                <p className="text-sm opacity-90 capitalize">
                  {isLoggedIn ? user?.name?.split(" ")[0] || "User" : "User"}
                </p>
              </div>
            </div>

            {/* MENU */}
            <div className="py-2 text-gray-900 font-bold">
              {/* <MenuItem
                icon={LayoutGrid}
                label="Shop By Category"
                onClick={() => go("/products")}
              /> */}
              <MenuItem
                icon={User}
                label="My Account"
                onClick={() => go("/profile")}
              />
              <MenuItem
                icon={ShoppingBag}
                label="My Orders"
                onClick={() => go("/order-his")}
              />
              {/* <MenuItem icon={Tag} label="Sale" onClick={() => go("/sale")} /> */}
              {/* <MenuItem
                icon={Gift}
                label="Gift Cards & Vouchers"
                onClick={() => go("/gift-cards")}
              />
              <MenuItem
                icon={Info}
                label="About Lebah"
                onClick={() => go("/about")}
              />
              <MenuItem
                icon={HelpCircle}
                label="Help & Support"
                onClick={() => go("/support")}
              /> */}
              {/* <MenuItem
                icon={Star}
                label="Rate This App"
                onClick={() => go("/rate")}
              />
              <MenuItem
                icon={Settings}
                label="Settings"
                onClick={() => go("/settings")}
              /> */}
              {user?.role === "ADMIN" && (
                <MenuItem
                  icon={Shield}
                  label="Admin Panel"
                  onClick={() => go("/admin")}
                />
              )}

              <div className="border-t mt-2">
                {isLoggedIn ? (
                  <MenuItem
                    icon={LogOut}
                    label="Logout"
                    onClick={handleLogout}
                    danger
                  />
                ) : (
                  <MenuItem
                    icon={User}
                    label="Login"
                    onClick={() => {
                      onClose(); // close sidebar
                      setShowLogin(true); // open modal
                    }}
                  />
                )}
              </div>
            </div>
          </aside>
        </>
      )}
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium hover:bg-gray-100 ${
        danger ? "text-red-600" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}
