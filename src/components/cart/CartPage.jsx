"use client";

import { X, Star, Minus, Plus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart, updateQty, removeFromCart } from "@/utils/cart";
import { toggleWishlist } from "@/utils/wishlist";
import CartSummary from "./CartSummary";

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

    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <section className="px-4 pt-4 pb-10 bg-[#fafafa]  text-gray-900">
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
              className="bg-gray-200 rounded-lg p-4 flex gap-4 relative"
            >
              {/* REMOVE */}
              <button
                onClick={() => setConfirmItem(item)}
                className="absolute top-4 right-4 text-gray-500"
              >
                <X size={18} />
              </button>

              {/* LEFT: IMAGE + QTY + WISHLIST */}
              <div className="w-28 shrink-0">
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-42 object-cover rounded-md mx-auto"
                />

                {/* QTY + WISHLIST (SAME ROW) */}
                <div className="mt-3 flex items-center gap-3">
                  {/* QTY */}
                  <div className="flex items-center border border-gray-300 rounded-md bg-white w-max">
                    <button
                      onClick={() =>
                        updateQty(item.variantId, Math.max(1, item.qty - 1))
                      }
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.variantId, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* MOVE TO WISHLIST */}
                  <button
                    onClick={() => {
                      toggleWishlist(item);
                      removeFromCart(item.variantId);
                    }}
                    className="text-sm text-[#0f243e] underline underline-offset-4 font-medium whitespace-nowrap"
                  >
                    Move to wishlist
                  </button>
                </div>
              </div>

              {/* RIGHT: DETAILS */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>

                <p className="text-sm mt-1">
                  Color : <b>{item.color}</b>
                </p>
                {item.size && (
                  <p className="text-sm mt-1">
                    Size : <b>{item.size}</b>
                  </p>
                )}

                {/* RATING */}
                <div className="flex items-center gap-1 mt-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>4.9</span>
                </div>

                {/* PRICE */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹ {item.oldPrice}
                    </span>
                  )}

                  <span className="font-semibold">₹ {item.price}</span>

                  {item.oldPrice && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md font-medium">
                      {item.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOAST */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[1600] bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg">
          Item removed from cart
        </div>
      )}

      {/* CONFIRM MODAL */}
      {confirmItem && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[999]"
            onClick={() => setConfirmItem(null)}
          />

          <div className="fixed inset-x-4 bottom-6 z-[1000] bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Remove item?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirmItem(null)}
                className="flex-1 py-3 border rounded-full text-sm font-medium text-gray-900"
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
          <CartSummary />
        </>
      )}
    </>
  );
}
