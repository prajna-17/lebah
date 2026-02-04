"use client";

import { useEffect, useState } from "react";
import Home from "@/components/home/Home";
import BrandIntro from "@/components/common/BrandIntro";

export default function Page() {
  const [status, setStatus] = useState("loading");
  // loading | intro | home

  useEffect(() => {
    const played = sessionStorage.getItem("lebah_intro_played");

    if (played) {
      setStatus("home");
    } else {
      sessionStorage.setItem("lebah_intro_played", "true");
      setStatus("intro");
    }
  }, []);

  if (status === "loading") {
    // 👇 prevents ANY flash
    return <div className="fixed inset-0 bg-[#0f243e]" />;
  }

  return (
    <>
      {status === "intro" && <BrandIntro onFinish={() => setStatus("home")} />}

      {status === "home" && <Home />}
    </>
  );
}
