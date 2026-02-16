"use client";

import { FiMenu, FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "@/utils/auth";
import Sidebar from "@/components/layout/Sidebar";

export default function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);

  const syncCounts = () => {
    const userId = getUserIdFromToken();

    const wishlistKey = userId ? `wishlist_${userId}` : "wishlist_guest";
    const cartKey = userId ? `cart_${userId}` : "cart_guest";

    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    setWishlistCount(wishlist.length);
    setCartCount(cart.length); // 🔥 UNIQUE ITEMS ONLY
  };

  useEffect(() => {
    syncCounts();

    window.addEventListener("wishlist-updated", syncCounts);
    window.addEventListener("cart-updated", syncCounts);

    return () => {
      window.removeEventListener("wishlist-updated", syncCounts);
      window.removeEventListener("cart-updated", syncCounts);
    };
  }, []);

  return (
    <>
      <header className="w-full sticky top-0 z-[9999]">
        {/* Offer strip */}
        <div className="bg-white text-center py-1 text-xs font-semibold text-black border-b">
          BUY 2 GET 5% OFF | BUY 3 GET 10% OFF | BUY 4+ GET 15% OFF
        </div>

        {/* Main header */}
        <div className="bg-[#0b1d36] px-4 py-3 flex items-center justify-between relative">
          {/* Menu */}
          <FiMenu
            onClick={() => setOpenSidebar(true)}
            className="text-white text-2xl cursor-pointer"
          />
          {/* Brand */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/img/montoaklynlogo1.png"
              alt="Lebah"
              className="h-12 object-contain cursor-pointer"
            />
          </Link>

          {/* Icons */}
          <div className="flex gap-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <FiHeart className="text-white text-2xl cursor-pointer" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <FiShoppingCart className="text-white text-2xl cursor-pointer cart-icon" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      {/* SIDEBAR */}
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
    </>
  );
}
