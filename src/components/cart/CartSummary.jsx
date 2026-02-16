"use client";

import { Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";

export default function CartSummary() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const load = () => setCart(getCart());
    load();

    window.addEventListener("cart-updated", load);
    return () => window.removeEventListener("cart-updated", load);
  }, []);

  const isEmpty = cart.length === 0;

  // 🧮 CALCULATIONS
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  let discountPercentage = 0;

  if (totalQty === 2) discountPercentage = 5;
  else if (totalQty === 3) discountPercentage = 10;
  else if (totalQty >= 4) discountPercentage = 15;

  const discount = Math.round((subTotal * discountPercentage) / 100);

  const tax = Math.round(subTotal * 0.02); // 2%
  const orderTotal = subTotal - discount;

  return (
    <>
      {/* SUMMARY CARD */}
      <section className="px-4 mt-5 pb-28 text-gray-900">
        <div className="bg-gray-200 rounded-2xl p-5 shadow-sm border border-gray-100">
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
              <span>₹ {subTotal.toLocaleString("en-IN")}</span>
            </div>

            {/* {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">
                  - ₹ {discount.toLocaleString("en-IN")}
                </span>
              </div>
            )} */}

            {/* <div className="flex justify-between">
              <span className="text-gray-600">Estimated Tax</span>
              <span>₹ {tax.toLocaleString("en-IN")}</span>
            </div> */}

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charge</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-base font-semibold">Order Total</span>
              <span className="text-lg font-semibold">
                ₹ {orderTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CHECKOUT */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-50">
        <button
          disabled={isEmpty}
          onClick={() => {
            if (!isEmpty) router.push("/checkout");
          }}
          className={`w-full py-4 text-sm font-semibold rounded-md tracking-wide transition
            ${
              isEmpty
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#0f243e] text-white"
            }`}
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
}
