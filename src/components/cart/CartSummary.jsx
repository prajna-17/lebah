"use client";

import { Percent } from "lucide-react";

export default function CartSummary() {
  return (
    <>
      {/* SUMMARY CARD */}
      <section className="px-4 mt-10 pb-28 text-gray-900">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          {/* COUPON */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#0f243e]/10 flex items-center justify-center">
              <Percent size={16} className="text-[#0f243e]" />
            </div>
            <p className="text-sm font-medium">Already have a coupon?</p>
          </div>

          <div className="flex gap-3 mb-8">
            <input
              type="text"
              placeholder="Voucher code or gift card"
              className="flex-1 border rounded-md px-4 py-3 text-sm outline-none focus:border-[#0f243e]"
            />
            <button className="px-5 py-3 border border-[#0f243e] text-sm font-medium text-[#0f243e] rounded-md">
              APPLY
            </button>
          </div>

          {/* PRICE BREAKDOWN */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sub Total</span>
              <span>₹ 5,555</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">- ₹ 1,555</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Tax</span>
              <span>₹ 100</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charge</span>
              <span className="font-medium">FREE</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-base font-semibold">Order Total</span>
              <span className="text-lg font-semibold">₹ 3,550</span>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CHECKOUT */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-50">
        <button className="w-full bg-[#0f243e] text-white py-4 text-sm font-semibold rounded-md tracking-wide">
          CHECKOUT
        </button>
      </div>
    </>
  );
}
