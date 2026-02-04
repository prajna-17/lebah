"use client";

import { X, Star, Minus, Plus, Heart } from "lucide-react";

const items = [
  {
    img: "/img/b1.jpeg",
    title: "Men Soft Cotton Shirt",
    color: "Blue",
    size: "L",
    rating: "4.9",
    reviews: "256",
    price: "₹ 2,599",
    mrp: "₹ 5,499",
    off: "45% OFF",
  },
  {
    img: "/img/b2.jpeg",
    title: "Men Soft Cotton Shirt",
    color: "Blue",
    size: "L",
    rating: "4.9",
    reviews: "256",
    price: "₹ 2,599",
    mrp: "₹ 5,499",
    off: "45% OFF",
  },
];

export default function WishlistPage() {
  const isEmpty = items.length === 0;

  return (
    <section className="px-4 pt-6 pb-24 text-gray-900 bg-[#fafafa] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-lg font-semibold tracking-wide">MY WISHLIST</h1>
        {!isEmpty && (
          <span className="text-sm text-gray-500">| {items.length} Items</span>
        )}
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="flex flex-col items-center text-center mt-20">
          <div className="w-14 h-14 rounded-full bg-[#0f243e]/10 flex items-center justify-center mb-4">
            <Heart className="text-[#0f243e]" />
          </div>

          <h2 className="text-base font-semibold mb-1">
            Your wishlist is empty
          </h2>

          <p className="text-sm text-gray-500 max-w-xs">
            Save styles you love and come back to them anytime.
          </p>

          <button className="mt-6 px-6 py-3 bg-[#0f243e] text-white text-sm rounded-md">
            Explore Collection
          </button>
        </div>
      )}

      {/* WISHLIST ITEMS */}
      {!isEmpty && (
        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 flex gap-4 relative shadow-sm"
            >
              {/* REMOVE */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                <X size={18} />
              </button>

              {/* IMAGE */}
              <img
                src={item.img}
                className="w-24 h-40 object-cover rounded-xl"
                alt={item.title}
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm mt-1 text-gray-600">
                  Color : <span className="font-medium">{item.color}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Size : <span className="font-medium">{item.size}</span>
                </p>

                {/* RATING */}
                <div className="flex items-center gap-1 mt-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>{item.rating}</span>
                  <span className="text-gray-400">({item.reviews})</span>
                </div>

                {/* PRICE */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400 line-through">
                    {item.mrp}
                  </span>

                  <span className="font-semibold text-sm">{item.price}</span>

                  <span className="bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full">
                    {item.off}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between mt-4">
                  {/* QTY */}
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <button className="p-1">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm">1</span>
                    <button className="p-1">
                      <Plus size={14} />
                    </button>
                  </div>

                  <button className="text-sm font-medium text-[#0f243e] underline">
                    Move to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
