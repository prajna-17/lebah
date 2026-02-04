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

export default function ProfilePage() {
  return (
    <section className="min-h-screen bg-[#fafafa] px-4 pt-6 pb-24 text-gray-900">
      {/* HEADER */}
      <h1 className="text-lg font-semibold tracking-wide mb-6">My Profile</h1>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm mb-8">
        <div className="w-14 h-14 rounded-full bg-[#0f243e]/10 flex items-center justify-center">
          <User className="text-[#0f243e]" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm">Prajna</p>
          <p className="text-sm text-gray-500">prajna@email.com</p>
        </div>

        <ChevronRight className="text-gray-400" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { icon: Package, label: "Orders" },
          { icon: Heart, label: "Wishlist" },
          { icon: MapPin, label: "Address" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl py-4 flex flex-col items-center gap-2 shadow-sm"
          >
            <item.icon className="text-[#0f243e]" size={20} />
            <p className="text-xs font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="bg-white rounded-2xl shadow-sm divide-y">
        {[
          { icon: User, label: "Edit Profile" },
          { icon: Shield, label: "Security" },
          { icon: Settings, label: "Settings" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-gray-700" />
              <span className="text-sm">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* LOGOUT */}
      <button className="mt-10 w-full flex items-center justify-center gap-2 text-sm font-medium text-red-500">
        <LogOut size={16} />
        Logout
      </button>
    </section>
  );
}
