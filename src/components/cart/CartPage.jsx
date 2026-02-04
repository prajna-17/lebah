"use client";

import { X, Star, Minus, Plus, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const cartItems = [
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

export default function CartPage() {
  const router = useRouter();

  return (
    <section className="px-4 pt-4 pb-10 bg-[#fafafa] min-h-screen text-gray-900 -mb-77">
      {/* TOP BAR */}
      <div className="flex items-center gap-3 mb-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronLeft size={22} />
        </button>

        <h1 className="text-lg font-semibold tracking-wide">MY CART</h1>

        <span className="text-sm text-gray-500">| {cartItems.length} Item</span>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-6">
        {cartItems.map((item, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-4 flex gap-4 relative"
          >
            {/* REMOVE */}
            <button className="absolute top-4 right-4 text-gray-500">
              <X size={18} />
            </button>

            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.title}
              className="w-24 h-40 object-cover rounded-md"
            />

            {/* DETAILS */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <p className="text-sm mt-1">
                Color : <span className="font-medium">{item.color}</span>
              </p>

              <p className="text-sm">
                Size : <span className="font-medium">{item.size}</span>
              </p>

              {/* RATING */}
              <div className="flex items-center gap-1 mt-1 text-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>{item.rating}</span>
                <span className="text-gray-500">({item.reviews})</span>
              </div>

              {/* PRICE */}
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">
                  MRP <span className="line-through">{item.mrp}</span>
                </span>

                <span className="font-semibold">{item.price}</span>

                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                  {item.off}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                {/* QTY */}
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button className="px-1 py-1">
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm">1</span>
                  <button className="px-1 py-1">
                    <Plus size={14} />
                  </button>
                </div>

                <button className="text-sm font-medium px-4 py-2 rounded-full border border-[#0f243e]/40 text-[#0f243e] bg-white transition-all duration-200 hover:bg-[#0f243e] hover:text-white hover:border-[#0f243e]">
                  Move to wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
