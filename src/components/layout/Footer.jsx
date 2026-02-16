"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on checkout page
  if (
    pathname.includes("/checkout") ||
    pathname.includes("/add-address") ||
    pathname.includes("/order-confirmed")
  ) {
    return null;
  }

  const links = [
    { name: "ABOUT US", href: "/about-us" },
    { name: "CONTACT US", href: "/contact-us" },
    { name: "FAQ'S", href: "/faqs" },
    { name: "PRIVACY POLICY", href: "/privacy" },
    { name: "RETURN POLICY", href: "/return" },
  ];

  return (
    <footer className="bg-[#0f2742] text-white text-center">
      {/* Links */}
      <div className="divide-y divide-white/10">
        {links.map((item) => (
          <div key={item.name} className="py-6 text-sm tracking-[0.2em]">
            <Link href={item.href} className="hover:opacity-70 transition">
              {item.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div className="flex justify-center gap-8 py-10">
        {/* <img
          src="/img/youtube.jpeg"
          alt="YouTube"
          className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
        /> */}

        {/* <img
          src="/img/facebook.jpeg"
          alt="Facebook"
          className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
        /> */}

        <a
          href="https://www.instagram.com/mont_oaklyn?igsh=MXIxMmE0ZWZveWZlZQ=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/insta.jpeg"
            alt="Instagram"
            className="w-14 h-14 rounded-full bg-white p-3 cursor-pointer hover:scale-110 transition"
          />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-xs tracking-[0.25em] text-white/80">
        © 2012 ABC WAS PRI.
      </div>

      <div className="mt-4 text-xs tracking-[0.25em] text-white/80">
        PRIVACY + TERMS
      </div>

      {/* Brand */}
      <div className="mt-10 pb-8 flex justify-center">
        <img
          src="/img/montoaklynlogo1.png"
          alt="Montoaklyn"
          className="h-8 object-contain"
        />
      </div>
    </footer>
  );
}
