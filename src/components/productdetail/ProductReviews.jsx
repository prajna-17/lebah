"use client";

import { Star, ThumbsUp, MessageCircle, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const ratingBars = [
  { stars: 5, count: 2823, width: "85%" },
  { stars: 4, count: 38, width: "20%" },
  { stars: 3, count: 4, width: "8%" },
  { stars: 2, count: 0, width: "0%" },
  { stars: 1, count: 0, width: "0%" },
];

const reviews = [
  {
    name: "Darrell Steward",
    date: "July 2, 2020 03:29 PM",
    likes: 128,
  },
  {
    name: "Darlene Robertson",
    date: "July 2, 2020 10:44 PM",
    likes: 32,
  },
  {
    name: "Kathryn Murphy",
    date: "June 26, 2020 10:03 PM",
    likes: 9,
  },
];

export default function ProductReviews() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="px-4 mt-16 text-gray-900">
      {/* TITLE */}
      <h2 className="text-base font-semibold mb-6">Product Reviews</h2>

      {/* SUMMARY */}
      <div className="flex gap-6">
        {/* LEFT */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-orange-400 flex items-center justify-center text-lg font-semibold">
            4.8
          </div>

          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-orange-400 fill-orange-400"
              />
            ))}
          </div>

          <p className="text-sm mt-1">from 1.25k reviews</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          {ratingBars.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 mb-2">
              <span className="text-sm w-6">{r.stars}.0</span>
              <Star size={12} className="text-orange-400 fill-orange-400" />

              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-gray-700 rounded"
                  style={{ width: r.width }}
                />
              </div>

              <span className="text-sm w-8">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold">Review Lists</p>
          <button className="p-2 border rounded-md">
            <SlidersHorizontal size={14} />
          </button>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded-full bg-gray-100">
            All Reviews
          </button>
          <button className="px-3 py-1 text-sm border rounded-full">
            With Photo & Video
          </button>
          <button className="px-3 py-1 text-sm border rounded-full">
            With Description
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-6 space-y-6">
        {(showAll ? reviews : reviews.slice(0, 2)).map((r, i) => (
          <div key={i}>
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-orange-400 fill-orange-400"
                />
              ))}
            </div>

            <p className="text-sm font-semibold">
              This is amazing product I have.
            </p>

            <p className="text-sm mt-1">{r.date}</p>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-300" />
                <p className="text-sm">{r.name}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <ThumbsUp size={14} />
                  {r.likes}
                </div>
                <MessageCircle size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOGGLE BUTTON */}
      {reviews.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 flex items-center gap-2 text-sm font-medium text-[#0f243e]"
        >
          <span className="text-lg">{showAll ? "−" : "+"}</span>
          {showAll ? "Show less reviews" : "View all reviews"}
        </button>
      )}
    </section>
  );
}
