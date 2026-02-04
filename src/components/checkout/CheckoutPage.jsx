"use client";

import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { MapPin, Percent, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAddress } from "@/context/AddressContext";

export default function CheckoutPage() {
  const [openSummary, setOpenSummary] = useState(false);
  const router = useRouter();
  const { address } = useAddress();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      {/* <div className="bg-[#0f1e3a] text-white py-4 flex items-center justify-center relative">
        <FiChevronLeft className="absolute left-4 text-xl" />
        <h1 className="text-lg font-semibold">Lebah</h1>
      </div> */}

      <div className="px-4 py-6 space-y-6 pb-40">
        <FiChevronLeft className="absolute left-4 text-xl" />

        <h2 className="text-xl font-semibold text-center">CHECKOUT</h2>

        {/* SHIPPING */}
        {/* SHIPPING */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping</h3>

          {/* ADD ADDRESS */}
          {address ? (
            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-start">
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.email}</p>
                  <p>{address.phone}</p>
                  <p className="mt-2">
                    {address.line1}
                    <br />
                    {address.city} - {address.pincode}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/add-address")}
                  className="text-sm font-medium text-[#0f1e3a]"
                >
                  Add / Edit
                </button>
              </div>

              <label className="flex items-center gap-2 mt-3 text-sm">
                <input type="checkbox" defaultChecked />
                Billing and delivery addresses are same.
              </label>
            </div>
          ) : (
            <div
              onClick={() => router.push("/add-address")}
              className="bg-white rounded-2xl px-5 py-5 flex items-center justify-between shadow cursor-pointer"
            >
              <span className="font-semibold">Add Address</span>
              <FiChevronRight />
            </div>
          )}

          {/* OFFERS */}
          <div className="bg-white rounded-2xl px-5 py-5 flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0f1e3a]/10 flex items-center justify-center">
                <Percent className="text-[#0f1e3a] text-xl" />
              </div>
              <span className="text-base font-semibold">Offers</span>
            </div>
            <FiChevronRight className="text-2xl text-gray-700" />
          </div>
        </div>

        {/* CARDS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Credit & Debit Cards</h3>

          <div className="bg-white rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] space-y-3">
            {/* CARD 1 */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/img/mastercard.png"
                  className="h-6"
                  alt="mastercard"
                />
                <span className="text-sm text-gray-700">
                  Mastercard **** **** **** 1234
                </span>
              </div>
              <input type="radio" name="card" />
            </div>

            {/* CARD 2 */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/visa.png" className="h-5" alt="visa" />
                <span className="text-sm text-gray-700">
                  Mastercard **** **** **** 1234
                </span>
              </div>
              <input type="radio" name="card" />
            </div>

            {/* ADD CARD */}
            <div className="flex items-center gap-4 px-1 py-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
                +
              </div>
              <span className="text-sm font-medium text-gray-600">
                Add New Card
              </span>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">UPI</h3>

          <div className="bg-white rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] space-y-3">
            {/* GOOGLE PAY */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/gpay.png" className="h-6" alt="gpay" />
                <span className="text-sm text-gray-700">Google pay</span>
              </div>
              <input type="radio" name="upi" />
            </div>

            {/* PHONEPE */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/phonepe.png" className="h-6" alt="phonepe" />
                <span className="text-sm text-gray-700">PhonePe</span>
              </div>
              <input type="radio" name="upi" />
            </div>

            {/* ADD UPI */}
            <div className="flex items-center gap-4 px-1 py-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
                +
              </div>
              <span className="text-sm font-medium text-gray-600">
                Add New UPI ID
              </span>
            </div>
          </div>
        </div>

        {/* MORE OPTIONS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">More Payment Options</h3>

          <div className="bg-white rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] space-y-3">
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/wallet.png" className="h-6" alt="wallet" />
                <span className="text-sm text-gray-700">Wallet</span>
              </div>
              <FiChevronRight />
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/bank.png" className="h-6" alt="bank" />
                <span className="text-sm text-gray-700">Net Banking</span>
              </div>
              <FiChevronRight />
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/cod.png" className="h-6" alt="cod" />
                <span className="text-sm text-gray-700">Cash On Delivery</span>
              </div>
              <input type="radio" name="more" />
            </div>
          </div>
        </div>

        {/* ITEMS */}
        {/* ITEMS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">2 Items</span>
            <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
              Arrives by Feb 10 to Feb 12
            </span>
          </div>

          {/* SLIDER */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="min-w-[320px] bg-gray-200 rounded-2xl p-4 flex gap-4"
              >
                <img
                  src="/img/shirt.jpg"
                  className="w-24 h-28 rounded-xl object-cover"
                  alt="product"
                />

                <div className="text-sm space-y-1">
                  <p className="font-semibold">Men Soft Cotton Shirt</p>
                  <p>Color : Blue</p>
                  <p>Size : L</p>
                  <p className="font-semibold mt-2">₹ 2,599</p>
                  <p>Qty : 1</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        {/* ORDER SUMMARY */}
        {openSummary && (
          <div className="px-4 py-4 space-y-3 border-b font-semibold">
            <div className="flex justify-between text-sm">
              <span>Sub Total</span>
              <span>₹ 5,555</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>- ₹ 1,555</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>₹ 100</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Grand Total</span>
              <span>₹ 6,690</span>
            </div>
          </div>
        )}

        {/* PAY BAR */}
        <div className="flex items-center justify-between px-4 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenSummary(!openSummary)}
          >
            {openSummary ? <FiChevronDown /> : <FiChevronUp />}
            <div>
              <p className="text-medium text-gray-900 font-bold">Total</p>
              <p className="text-xl font-bold">₹ 6,690</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/order-confirmed")}
            className="bg-[#0f1e3a] text-white px-8 py-4 rounded-lg font-bold"
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="bg-white rounded-xl shadow divide-y">{children}</div>
    </div>
  );
}

function Row({ label, arrow }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm font-medium">{label}</span>
      {arrow && <FiChevronRight />}
    </div>
  );
}

function RadioRow({ label }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm font-medium">{label}</span>
      <input type="radio" name="payment" />
    </div>
  );
}

function AddRow({ label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 text-gray-600">
      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
        <FiPlus />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
