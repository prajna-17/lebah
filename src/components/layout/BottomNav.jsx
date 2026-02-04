"use client";

import { Home, ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Shop", icon: ShoppingBag, path: "/products" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // ❌ Hide bottom bar on cart & checkout pages
  if (pathname.includes("/cart") || pathname.includes("/checkout")) {
    return null;
  }
  // ❌ Hide bottom bar when login modal is open
  if (typeof document !== "undefined") {
    if (document.body.classList.contains("login-open")) {
      return null;
    }
  }

  const [active, setActive] = useState(pathname);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const idleTimer = useRef(null);

  // 🔊 Sound (soft)
  const playSound = () => {
    const audio = new Audio("/sounds/pop.mp3");
    audio.volume = 0.2;
    audio.play();
  };

  // 📳 Haptic vibration (mobile only)
  const haptic = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10); // subtle
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll down → hide
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      // Scroll up → show
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Idle → show after 4s
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setVisible(true);
      }, 4000);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0f243e]/95 backdrop-blur-md md:hidden transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-around items-center h-[60px]">
        {navItems.map((item) => {
          const isActive = active === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.path);
                haptic();
                playSound();
                router.push(item.path);
              }}
              className="relative flex items-center justify-center"
            >
              {/* ACTIVE HALO */}
              <span
                className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${
                  isActive ? "bg-white/20 scale-100" : "scale-0"
                }`}
              />

              {/* ICON */}
              <Icon
                size={24}
                className={`relative z-10 transition-all duration-300 ${
                  isActive ? "text-white scale-110" : "text-gray-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
