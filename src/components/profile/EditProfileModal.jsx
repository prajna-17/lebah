"use client";
import { X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useEffect, useState } from "react";

export default function EditProfileModal({ open, onClose }) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");

  // 👇 keep input in sync
  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm text-gray-900">
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-sm"
          placeholder="Your name"
        />

        <button
          onClick={() => {
            updateProfile({ name }); // ✅ SAVE
            onClose(); // ✅ CLOSE
          }}
          className="mt-6 w-full bg-[#0f243e] text-white py-3 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
