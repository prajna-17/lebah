"use client";

import { useEffect, useState } from "react";

export default function BrandIntro({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
    }, 4500); // ⏱ video duration

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 4600); // ⏱ animation end

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#010A35] flex items-center justify-center
      transition-all duration-700 ease-in-out
      ${exit ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <video
        src="/video/lebah-intro.mp4"
        autoPlay
        muted
        playsInline
        className="w-[80%] max-w-[420px] aspect-video object-contain"
      />
    </div>
  );
}
