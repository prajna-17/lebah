"use client";

import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EditProfileModal from "./EditProfileModal";
import AddressModal from "./AddressModal";
import HelpModal from "./HelpModal";
import SettingsModal from "./SettingsModal";
import SecurityModal from "./SecurityModal";

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth();
  const router = useRouter();

  const [openEdit, setOpenEdit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <>
      <section className="min-h-screen bg-[#fafafa] px-4 pt-6 pb-24 text-gray-900">
        <h1 className="text-lg font-semibold tracking-wide mb-6">My Profile</h1>

        {/* PROFILE CARD */}
        <div
          onClick={() => setOpenEdit(true)}
          className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm mb-8 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-[#0f243e]/10 flex items-center justify-center">
            <User className="text-[#0f243e]" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm">{user?.name || "User"}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <ChevronRight className="text-gray-400" />
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          onClick={() => router.push("/order-his")}
          <div className="bg-white rounded-2xl py-4 flex flex-col items-center gap-2 shadow-sm opacity-50">
            <Package size={20} />
            <p className="text-xs font-medium">Orders</p>
          </div>
          <button
            onClick={() => router.push("/wishlist")}
            className="bg-white rounded-2xl py-4 flex flex-col items-center gap-2 shadow-sm"
          >
            <Heart size={20} className="text-[#0f243e]" />
            <p className="text-xs font-medium">Wishlist</p>
          </button>
          <button
            onClick={() => setOpenAddress(true)}
            className="bg-white rounded-2xl py-4 flex flex-col items-center gap-2 shadow-sm"
          >
            <MapPin size={20} className="text-[#0f243e]" />
            <p className="text-xs font-medium">Address</p>
          </button>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="bg-white rounded-2xl shadow-sm divide-y">
          <button
            onClick={() => setOpenEdit(true)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <User size={18} />
              <span className="text-sm">Edit Profile</span>
            </div>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setOpenSecurity(true)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <Shield size={18} />
              <span className="text-sm">Security</span>
            </div>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setOpenSettings(true)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </div>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setOpenHelp(true)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={18} />
              <span className="text-sm">Help & Support</span>
            </div>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="mt-10 w-full flex items-center justify-center gap-2 text-sm font-medium text-red-500"
        >
          <LogOut size={16} />
          Logout
        </button>
      </section>

      {/* MODALS */}
      <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
      <AddressModal open={openAddress} onClose={() => setOpenAddress(false)} />
      <HelpModal open={openHelp} onClose={() => setOpenHelp(false)} />
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
      <SecurityModal
        open={openSecurity}
        onClose={() => setOpenSecurity(false)}
      />
    </>
  );
}
