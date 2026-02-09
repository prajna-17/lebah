"use client";

import { X, Star, Minus, Plus, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";
import { API } from "@/utils/api";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function loadWishlist() {
      const stored = getWishlist();
      if (stored.length === 0) {
        setItems([]);
        return;
      }

      const updated = [];

      for (const item of stored) {
        try {
          if (!item.productId) {
            updated.push(item);
            continue;
          }

          const res = await fetch(`${API}/products/${item.productId}`);
          if (!res.ok) {
            updated.push(item);
            continue;
          }

          const data = await res.json();

          updated.push({
            ...item,
            title: data.title,
            price: data.price,
            oldPrice: data.oldPrice,
            discount: data.oldPrice
              ? Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100)
              : null,

            sizes: data.sizes, // 🔥 THIS IS THE FIX

            image:
              data.colorImages?.find((c) => c.color === item.color)
                ?.images?.[0] ||
              data.images?.[0] ||
              item.image,
          });
        } catch {
          updated.push(item);
        }
      }

      setItems(updated);
    }

    loadWishlist();

    const sync = () => loadWishlist();
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, []);

  const isEmpty = items.length === 0;

  return (
    <section className="px-4 pt-6 pb-24 bg-[#fafafa] min-h-screen text-gray-900">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-lg font-semibold">MY WISHLIST</h1>
        {!isEmpty && (
          <span className="text-sm text-gray-500">| {items.length} Items</span>
        )}
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center mt-20 text-center">
          <div className="w-14 h-14 rounded-full bg-[#0f243e]/10 flex items-center justify-center mb-4">
            <Heart className="text-[#0f243e]" />
          </div>
          <p className="text-gray-500">Your wishlist is empty 💔</p>
        </div>
      )}

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="bg-white rounded-2xl p-4 flex gap-4 relative shadow-sm animate-fadeIn"
          >
            {/* REMOVE */}
            <button
              onClick={() => removeFromWishlist(item.variantId)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X size={18} />
            </button>

            <img
              src={item.image}
              className="w-24 h-40 object-cover rounded-xl"
              alt={item.title}
            />

            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <p className="text-sm mt-1">
                Color : <b>{item.color}</b>
              </p>

              <div className="flex items-center gap-1 mt-1 text-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>4.9</span>
              </div>

              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="font-semibold">₹ {item.price}</span>

                {item.oldPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹ {item.oldPrice}
                    </span>

                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                {/* <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                  <Minus size={14} />
                  <span className="px-3 text-sm">1</span>
                  <Plus size={14} />
                </div> */}

                <button
                  onClick={() => {
                    setSelectedItem(item); // open modal
                  }}
                  className="text-sm font-medium text-[#0f243e] underline"
                >
                  Move to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelectedItem(null)}
          />

          <div className="fixed inset-x-4 bottom-6 z-50 bg-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Select Size</h3>

            <div className="flex gap-3 flex-wrap mb-6">
              {selectedItem.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border
              ${
                selectedSize === size
                  ? "bg-[#0f243e] text-white"
                  : "border-gray-300"
              }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedSize}
              onClick={() => {
                addToCart({ ...selectedItem, size: selectedSize });
                removeFromWishlist(selectedItem.variantId);

                setSelectedItem(null);
                setSelectedSize(null);

                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
              }}
              className="w-full py-3 bg-[#0f243e] text-white rounded-full disabled:opacity-40"
            >
              Add to cart
            </button>
          </div>
        </>
      )}
      {showToast && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50
    bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg"
        >
          Added to cart 🛒
        </div>
      )}
    </section>
  );
}
