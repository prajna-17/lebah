"use client";
import { X } from "lucide-react";

export default function SecurityModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm text-gray-900 font-bold">
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Security</h2>
        <p className="text-sm text-gray-500">
          Your account is secured via OTP login 🔐
        </p>
      </div>
    </div>
  );
}
