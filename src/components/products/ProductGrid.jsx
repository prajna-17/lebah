"use client";
import { useState, useRef } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";

const PRODUCTS_PER_PAGE = 8;

const products = [
  {
    id: 1,
    image: "/img/core3.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 2,
    image: "/img/core4.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 3,
    image: "/img/core5.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 4,
    image: "/img/p3.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 5,
    image: "/img/linen.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 6,
    image: "/img/oxford.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 7,
    image: "/img/halfsleeve.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 8,
    image: "/img/b1.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
  {
    id: 9,
    image: "/img/b2.jpeg",
    name: "Men Beige Casual Shirt",
    rating: 4.3,
    reviews: 50,
    price: 2999,
    originalPrice: 4999,
    discount: "56% OFF",
  },
];

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const requireLogin = (cb) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    cb && cb();
  };

  return (
    <>
      {/* PRODUCT GRID */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 px-4 mt-4 text-gray-900"
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="relative">
            <img
              src={product.image}
              className="w-full h-[260px] object-cover"
            />

            <button
              onClick={() => requireLogin()}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
            >
              <Heart size={16} />
            </button>

            <div className="absolute bottom-16 left-2 bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow">
              <span>{product.rating}</span>
              <Star size={12} fill="black" />
              <span className="text-gray-500">({product.reviews})</span>
            </div>

            <button
              onClick={() => requireLogin()}
              className="absolute bottom-16 right-2 bg-white p-1.5 rounded-full shadow"
            >
              <ShoppingCart size={16} />
            </button>

            <div className="mt-2">
              <p className="font-medium">{product.name}</p>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">₹ {product.price}</span>
                <span className="line-through text-gray-400 text-xs">
                  ₹ {product.originalPrice}
                </span>
                <span className="text-red-500 text-xs">{product.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                gridRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`w-8 h-8 rounded text-sm font-medium
  ${
    currentPage === i + 1
      ? "bg-[#0f243e] text-white"
      : "bg-gray-200 text-gray-800"
  }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
