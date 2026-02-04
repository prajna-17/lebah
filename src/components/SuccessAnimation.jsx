"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";

export default function SuccessAnimation() {
  useEffect(() => {
    // 🔊 Success sound
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 0.4;
    audio.play();

    // 🎉 PREMIUM CONFETTI BURST
    const colors = ["#0f1e3a", "#f5c26b", "#ffffff"];

    for (let i = 0; i < 140; i++) {
      const confetti = document.createElement("div");
      confetti.className =
        Math.random() > 0.5
          ? "viewport-confetti confetti-fast"
          : "viewport-confetti confetti-slow";

      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.6 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3500);
    }
  }, []);

  return (
    <div className="flex justify-center py-12">
      <div className="relative flex items-center justify-center">
        {/* GLOW HALO */}
        <div className="absolute w-48 h-48 rounded-full bg-[#0f1e3a]/25 animate-pulse blur-2xl" />

        {/* RING */}
        <div className="w-36 h-36 rounded-full border-[5px] border-[#0f1e3a] flex items-center justify-center animate-scaleIn shadow-[0_0_70px_rgba(15,30,58,0.7)]">
          <Check
            className="w-20 h-20 text-[#0f1e3a] animate-checkDraw"
            strokeWidth={3}
          />
        </div>
      </div>
    </div>
  );
}
