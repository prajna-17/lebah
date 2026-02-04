"use client";

import { useEffect, useState } from "react";

export default function BrandIntro({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
    }, 4000); // ⏱ video duration

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 4600); // ⏱ exit animation end

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999]
      flex items-center justify-center
      bg-[#001A3E]
      transition-all duration-700 ease-in-out
      ${exit ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
    >
      {/* VIDEO WRAPPER — forces same blue everywhere */}
      <div className="bg-[#001A3E] p-6 rounded-xl">
        <video
          src="/video/lebah-intro.mp4"
          autoPlay
          muted
          playsInline
          style={{ backgroundColor: "#001A3E" }}
          className="w-[80%] max-w-[420px] aspect-video object-contain"
        />
      </div>
    </div>
  );
}
