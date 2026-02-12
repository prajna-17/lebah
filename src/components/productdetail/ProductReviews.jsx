"use client";

import { Star, ThumbsUp, MessageCircle, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { getRandomReviews } from "@/utils/review";

export default function ProductReviews() {
  // Only 5 reviews per product
  const reviews = useMemo(() => getRandomReviews(5), []);

  const [visibleCount, setVisibleCount] = useState(3);

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const formattedRating = averageRating.toFixed(1);

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = (count / reviews.length) * 100;

    return {
      stars: star,
      count,
      width: `${percentage}%`,
    };
  });

  return (
    <section className="px-4 mt-16 text-gray-900">
      <h2 className="text-base font-semibold mb-6">Product Reviews</h2>

      {/* SUMMARY */}
      <div className="flex gap-6">
        {/* LEFT */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-orange-400 flex items-center justify-center text-lg font-semibold">
            {formattedRating}
          </div>

          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round(averageRating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm mt-1">from {reviews.length} reviews</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          {ratingCounts.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 mb-2">
              <span className="text-sm w-6">{r.stars}.0</span>
              <Star size={12} className="text-orange-400 fill-orange-400" />

              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-gray-700 rounded transition-all duration-500"
                  style={{ width: r.width }}
                />
              </div>

              <span className="text-sm w-8">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER HEADER */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold">Review Lists</p>
          {/* <button className="p-2 border rounded-md">
            <SlidersHorizontal size={14} />
          </button> */}
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded-full bg-gray-100">
            All Reviews
          </button>
          {/* <button className="px-3 py-1 text-sm border rounded-full">
            With Photo & Video
          </button>
          <button className="px-3 py-1 text-sm border rounded-full">
            With Description
          </button> */}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-6 space-y-6">
        {reviews.slice(0, visibleCount).map((r) => (
          <div key={r.id} className="border-b pb-5">
            {/* Rating */}
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < r.rating
                      ? "text-orange-400 fill-orange-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-sm font-semibold">{r.comment}</p>

            <p className="text-sm mt-1 text-gray-500">{r.date}</p>

            {/* User Info */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <p className="text-sm">{r.name}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-blue-600 transition">
                  <ThumbsUp size={14} />
                  {r.likes}
                </div>
                <MessageCircle size={14} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON LOGIC */}
      <div className="mt-6">
        {visibleCount === 3 && (
          <button
            onClick={() => setVisibleCount(5)}
            className="flex items-center gap-2 text-sm font-medium text-[#0f243e]"
          >
            <span className="text-lg">+</span>
            View more reviews
          </button>
        )}

        {visibleCount === 5 && (
          <button
            onClick={() => setVisibleCount(3)}
            className="flex items-center gap-2 text-sm font-medium text-[#0f243e]"
          >
            <span className="text-lg">−</span>
            View less reviews
          </button>
        )}
      </div>
    </section>
  );
}
