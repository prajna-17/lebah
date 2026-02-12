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

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const { sendOtp, verifyOtp } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  // mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // lock scroll
  useEffect(() => {
    if (open) document.body.classList.add("login-open");
    else document.body.classList.remove("login-open");

    return () => document.body.classList.remove("login-open");
  }, [open]);

  if (!mounted || !open) return null;

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };
  const triggerHaptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20); // 💙 subtle vibration
    }
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
          {step === "form" ? "Welcome to Montoaklyn" : "Verify OTP"}
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
              className={`w-full border rounded-lg px-4 py-3 text-sm transition
                ${shake ? "border-[#0f243e] animate-shake" : "border-gray-300"}
              `}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setError("");
              }}
            />

            <input
              placeholder="Phone Number"
              className={`w-full border rounded-lg px-4 py-3 text-sm transition
                ${shake ? "border-[#0f243e] animate-shake" : "border-gray-300"}
              `}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                setError("");
              }}
            />

            <div className="flex gap-3">
              <input
                placeholder="Email Address"
                className={`flex-1 border rounded-lg px-4 py-3 text-sm transition
                  ${shake ? "border-[#0f243e] animate-shake" : "border-gray-300"}
                `}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setError("");
                }}
              />

              <button
                onClick={async () => {
                  // 🔒 HARD STOP — NO OTP IF INVALID
                  if (
                    form.name.trim().length === 0 ||
                    form.phone.trim().length === 0 ||
                    form.email.trim().length === 0
                  ) {
                    setError("Please fill all fields");
                    setShake(true);
                    setTimeout(() => setShake(false), 400);
                    return; // ❗ THIS was missing
                  }

                  try {
                    setError("");
                    await sendOtp(form.email); // ✅ ONLY runs if valid
                    setStep("otp");
                  } catch (e) {
                    setError(e.message || "Failed to send OTP");
                    setShake(true);
                    setTimeout(() => setShake(false), 400);
                  }
                }}
                className="px-4 bg-[#0f243e] text-white rounded-lg"
              >
                Send OTP
              </button>
            </div>

            {error && (
              <p className="text-xs text-[#0f243e] font-medium mt-1">{error}</p>
            )}
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
              onClick={async () => {
                try {
                  await verifyOtp(form.email, otp.join(""), form.name);

                  triggerHaptic(); // 📳 happy lil tap
                  setShowSuccess(true);

                  setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                  }, 1800);
                } catch (e) {
                  triggerError(e.message || "Invalid OTP");
                }
              }}
              className="w-full bg-[#0f243e] text-white py-4 rounded-md"
            >
              Login
            </button>
          </>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          By continuing, you agree to Montoaklyn Terms & Privacy Policy
        </p>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center animate-heartDance">
            <p className="text-sm font-medium text-gray-700 mt-1">
              Log In Successful!!{" "}
            </p>
            <p className="text-sm font-medium text-gray-700 mt-1">
              You’re in ✨
            </p>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
}
