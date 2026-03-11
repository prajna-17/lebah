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
            sizes: data.sizes,
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
    <>
      <style>{`
        @media (min-width: 768px) {
          .wl-page {
            max-width: 960px;
            margin: 0 auto;
            padding: 48px 64px 80px !important;
            background: linear-gradient(160deg, #fdfaf5 0%, #f7f0e6 60%, #fdfaf5 100%) !important;
            min-height: 100vh;
            position: relative;
          }

          /* Header */
          .wl-header {
            margin-bottom: 40px !important;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(201,164,76,0.25);
            display: flex;
            align-items: baseline;
            gap: 12px;
          }
          .wl-title {
            font-size: 22px !important;
            font-weight: 800 !important;
            letter-spacing: 0.08em !important;
            color: #1a1208 !important;
          }
          .wl-count {
            font-size: 12px !important;
            letter-spacing: 0.06em !important;
            color: #a0845c !important;
          }

          /* Grid layout */
          .wl-list {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }

          /* Card */
          .wl-card {
            border-radius: 6px !important;
            padding: 20px !important;
            box-shadow:
              0 2px 12px rgba(0,0,0,0.07),
              0 0 0 1px rgba(201,164,76,0.15) !important;
            background: #fff !important;
            transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(.2,.8,.3,1) !important;
          }
          .wl-card:hover {
            box-shadow:
              0 10px 28px rgba(0,0,0,0.11),
              0 0 0 1px rgba(201,164,76,0.35) !important;
            transform: translateY(-2px);
          }

          /* Image */
          .wl-img {
            width: 100px !important;
            height: 130px !important;
            border-radius: 4px !important;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          /* Remove btn */
          .wl-remove {
            top: 16px !important;
            right: 16px !important;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(0,0,0,0.04);
            transition: background 0.2s !important;
          }
          .wl-remove:hover { background: rgba(220,38,38,0.1) !important; color: #dc2626 !important; }

          /* Move to cart link */
          .wl-move-btn {
            font-size: 11px !important;
            font-weight: 600 !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            text-decoration: none !important;
            color: #8a6a1a !important;
            border-bottom: 1px solid rgba(201,164,76,0.4);
            padding-bottom: 1px;
            transition: color 0.2s, border-color 0.2s !important;
          }
          .wl-move-btn:hover {
            color: #c9a44c !important;
            border-color: #c9a44c !important;
          }

          /* Empty state */
          .wl-empty {
            grid-column: 1 / -1;
            margin-top: 80px !important;
          }

          /* Card stagger */
          .wl-card {
            opacity: 0;
            animation: wlCardIn 0.4s ease forwards;
          }
          .wl-card:nth-child(1) { animation-delay: 0.04s; }
          .wl-card:nth-child(2) { animation-delay: 0.10s; }
          .wl-card:nth-child(3) { animation-delay: 0.16s; }
          .wl-card:nth-child(4) { animation-delay: 0.22s; }
          .wl-card:nth-child(5) { animation-delay: 0.28s; }
          .wl-card:nth-child(6) { animation-delay: 0.34s; }
          @keyframes wlCardIn {
            to { opacity: 1; transform: translateY(0); }
          }
        }

        /* Mobile — zero changes */
        @media (max-width: 767px) {
          .wl-page { padding: 24px 16px 96px !important; background: #fafafa !important; max-width: 100% !important; }
          .wl-header { border-bottom: none !important; padding-bottom: 0 !important; margin-bottom: 32px !important; }
          .wl-title { font-size: 18px !important; letter-spacing: 0 !important; }
          .wl-count { font-size: 14px !important; }
          .wl-list { display: block !important; }
          .wl-card { border-radius: 16px !important; padding: 16px !important; box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important; margin-bottom: 24px !important; transform: none !important; transition: none !important; opacity: 1 !important; animation: none !important; }
          .wl-card:hover { transform: none !important; box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important; }
          .wl-img { width: 96px !important; height: 160px !important; border-radius: 12px !important; box-shadow: none !important; }
          .wl-remove { background: none !important; width: auto !important; height: auto !important; border-radius: 0 !important; }
          .wl-remove:hover { background: none !important; color: #9ca3af !important; }
          .wl-move-btn { font-size: 14px !important; text-transform: none !important; letter-spacing: 0 !important; text-decoration: underline !important; color: #0f243e !important; border-bottom: none !important; }
          .wl-move-btn:hover { color: #0f243e !important; border-color: transparent !important; }
        }
      `}</style>

      <section className="wl-page px-4 pt-6 pb-24 bg-[#fafafa] min-h-screen text-gray-900">
        {/* HEADER */}
        <div className="wl-header flex items-center gap-3 mb-8">
          <h1 className="wl-title text-lg font-semibold">MY WISHLIST</h1>
          {!isEmpty && (
            <span className="wl-count text-sm text-gray-500">
              | {items.length} Items
            </span>
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

        <div className="wl-list space-y-6">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="wl-card bg-white rounded-2xl p-4 flex gap-4 relative shadow-sm animate-fadeIn"
            >
              {/* REMOVE */}
              <button
                onClick={() => removeFromWishlist(item.variantId)}
                className="wl-remove absolute top-4 right-4 text-gray-400"
              >
                <X size={18} />
              </button>

              <img
                src={item.image}
                className="wl-img w-24 h-40 object-cover rounded-xl"
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
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="wl-move-btn text-sm font-medium text-[#0f243e] underline"
                  >
                    Move to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SIZE MODAL — untouched */}
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
                    className={`px-4 py-2 rounded-full border ${selectedSize === size ? "bg-[#0f243e] text-white" : "border-gray-300"}`}
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

        {/* TOAST — untouched */}
        {showToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg">
            Added to cart 🛒
          </div>
        )}
      </section>
    </>
  );
}
