"use client";
import { X, MapPin } from "lucide-react";

export default function AddressModal({ open, onClose }) {
  const address = null; // later from backend

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm text-gray-900 font-bold">
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Saved Address</h2>

        {!address ? (
          <div className="text-center py-10 text-gray-900 font-semibold">
            <MapPin className="mx-auto mb-3" />
            No address saved yet
          </div>
        ) : (
          <div>{/* show address */}</div>
        )}
      </div>
    </div>
  );
}
