"use client";

import { X, Star, Minus, Plus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart, updateQty, removeFromCart } from "@/utils/cart";
import { toggleWishlist } from "@/utils/wishlist";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const [confirmItem, setConfirmItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setCartItems(getCart());

    const sync = () => setCartItems(getCart());
    window.addEventListener("cart-updated", sync);

    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const confirmRemove = () => {
    if (!confirmItem) return;

    removeFromCart(confirmItem.variantId);
    setConfirmItem(null);

    // 📳 vibration
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }

    // 🔔 toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <section className="px-4 pt-4 pb-10 bg-[#fafafa] min-h-screen text-gray-900 -mb-140">
        {/* TOP BAR */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition"
          >
            <ChevronLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold">MY CART</h1>
          <span className="text-sm text-gray-500">
            | {cartItems.length} Item
          </span>
        </div>

        {cartItems.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            Your cart is empty 🛒
          </p>
        )}

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.variantId}
              className="bg-gray-100 rounded-lg p-4 flex gap-4 relative animate-fadeIn"
            >
              {/* REMOVE */}
              <button
                onClick={() => setConfirmItem(item)}
                className="absolute top-4 right-4 text-gray-500"
              >
                <X size={18} />
              </button>

              {/* IMAGE */}
              <img
                src={item.image}
                className="w-24 h-40 object-cover rounded-md"
                alt={item.title}
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>

                <p className="text-sm mt-1">
                  Color : <b>{item.color}</b>
                </p>

                {/* RATING */}
                <div className="flex items-center gap-1 mt-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>4.9</span>
                </div>

                {/* PRICE */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold">₹ {item.price}</span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 mt-3">
                  {/* QTY */}
                  <div className="flex items-center bg-white border border-gray-300 rounded-full h-9 overflow-hidden">
                    <button
                      onClick={() =>
                        updateQty(item.variantId, Math.max(1, item.qty - 1))
                      }
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-10 text-center text-sm font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.variantId, item.qty + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      toggleWishlist(item);
                      removeFromCart(item.variantId);
                    }}
                    className="text-sm px-4 py-2 rounded-full border border-[#0f243e]/40 text-[#0f243e] bg-white hover:bg-[#0f243e] hover:text-white transition"
                  >
                    Move to wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔔 TOP TOAST */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg animate-fadeIn">
          Item removed from cart
        </div>
      )}

      {/* 🧾 CONFIRM MODAL */}
      {confirmItem && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setConfirmItem(null)}
          />

          <div className="fixed inset-x-4 bottom-30 z-50 bg-white rounded-2xl p-6 shadow-xl animate-slideUp">
            <h3 className="text-lg font-semibold mb-2">Remove item?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirmItem(null)}
                className="flex-1 py-3 border rounded-full text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmRemove}
                className="flex-1 py-3 bg-[#0f243e] text-white rounded-full text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
