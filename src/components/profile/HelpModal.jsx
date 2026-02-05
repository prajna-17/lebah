"use client";
import { X } from "lucide-react";

export default function HelpModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm text-gray-900 font-bold">
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-3">Help & Support</h2>
        <p className="text-sm text-gray-600">Need help? Reach us at:</p>

        <p className="mt-2 font-medium">📧 support@lebah.com</p>
        <p className="text-sm text-gray-500 mt-1">
          We usually reply within 24 hours 🤍
        </p>
      </div>
    </div>
  );
}
