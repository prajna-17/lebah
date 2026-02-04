"use client";

import { FiMenu, FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      {/* Offer strip */}
      <div className="bg-white text-center py-1 text-sm text-gray-700 border-b font-[500]">
        Upto 60% off on Selected Apparel
      </div>

      {/* Main header */}
      <div className="bg-[#0b1d36] px-4 py-3 flex items-center justify-between relative">
        {/* Menu */}
        <FiMenu className="text-white text-2xl" />

        {/* Brand */}
        <img
          src="/img/Lebah.png"
          alt="Lebah"
          className="h-6 object-contain absolute left-1/2 -translate-x-1/2"
        />

        {/* Icons */}
        <div className="flex gap-4">
          {/* Wishlist */}
          <Link href="/wishlist">
            <FiHeart className="text-white text-2xl cursor-pointer" />
          </Link>
          <Link href="/cart">
            <FiShoppingCart className="text-white text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
}
