"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "./AuthContext";

export default function LoginGate({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const { login } = useAuth();

  // ✅ Mount check (HOOK ALWAYS RUNS)
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Lock scroll + hide bottom nav
  useEffect(() => {
    if (open) {
      document.body.classList.add("login-open");
    } else {
      document.body.classList.remove("login-open");
    }

    return () => document.body.classList.remove("login-open");
  }, [open]);

  // ❗ AFTER hooks → conditional render
  if (!mounted || !open) return null;

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  return createPortal(
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
      />

      {/* TOP MESSAGE */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] bg-white px-5 py-2 text-gray-900 rounded-full text-sm font-semibold shadow">
        Please login to continue
      </div>

      {/* BOTTOM SHEET */}
      <div className="fixed inset-x-0 bottom-0 z-[9999] bg-white rounded-t-3xl p-6 animate-slideUp text-gray-900">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-1">
          {step === "form" ? "Welcome to Lebah" : "Verify OTP"}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {step === "form"
            ? "Login to save items and continue shopping"
            : `OTP sent to ${form.email}`}
        </p>

        {/* FORM */}
        {step === "form" && (
          <div className="space-y-4">
            <input
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3 text-sm"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              className="w-full border rounded-lg px-4 py-3 text-sm"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="flex gap-3">
              <input
                placeholder="Email Address"
                className="flex-1 border rounded-lg px-4 py-3 text-sm"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <button
                onClick={() => setStep("otp")}
                className="px-4 bg-[#0f243e] text-white rounded-lg"
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {/* OTP */}
        {step === "otp" && (
          <>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  maxLength={1}
                  className="w-12 h-12 border rounded-lg text-center text-lg"
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>

            <button
              onClick={() => {
                login(); // ✅ user logged in
                onClose(); // ✅ close modal
              }}
              className="w-full bg-[#0f243e] text-white py-4 rounded-md"
            >
              Login
            </button>
          </>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          By continuing, you agree to Lebah’s Terms & Privacy Policy
        </p>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
}
