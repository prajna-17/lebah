"use client";

import { Download, Share2, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import SuccessAnimation from "@/components/SuccessAnimation";
import { useState } from "react";

export default function OrderConfirmedPage() {
  const router = useRouter();
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-gray-900 space-y-6">
      {/* HEADER */}
      {/* SUCCESS */}
      <div className="text-center space-y-4">
        {/* <img
          src="/img/Lebah.png"
          alt="Lebah"
          className="h-8 mx-auto object-contain"
        /> */}

        <SuccessAnimation />

        <h2 className="text-lg font-semibold">Order Confirmed</h2>
        <p className="text-gray-600 text-sm">
          Thank you for your order with Lebah!
        </p>
      </div>

      {/* ORDER DETAILS */}
      {/* ORDER DETAILS */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-300 px-4 py-3 font-semibold text-sm">
          Order Details
        </div>

        <div className="px-4 py-4 space-y-2 text-sm">
          <p>
            Order Number : <span className="font-semibold">#1234</span>
          </p>
          <p>
            Estimated Delivery :
            <span className="font-semibold"> 9th Feb to 12th Feb 2026</span>
          </p>
          <p>
            Payment Method :<span className="font-semibold"> Credit Card</span>
          </p>
        </div>
      </div>

      {/* ITEMS */}
      {/* ITEMS IN YOUR ORDER */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-300 px-4 py-3 shadow font-semibold text-sm">
          Items In Your Order
        </div>

        <div className="px-4 py-4 space-y-4">
          <Item />
          <Item />

          <div className="text-sm font-semibold text-right">
            Total Amount : ₹ 6,555
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            const invoiceContent = `
      Lebah - Invoice

      Order Number: #1234
      Payment Method: Credit Card
      Total Amount: ₹ 6,555

      Items:
      - Men Soft Cotton Shirt (Blue, L) x1 - ₹ 2,599
      - Men Soft Cotton Shirt (Blue, L) x1 - ₹ 2,599

      Thank you for shopping with Lebah!
    `;

            const blob = new Blob([invoiceContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "Lebah-Invoice.txt";
            link.click();

            URL.revokeObjectURL(url);
          }}
          className="flex-1 bg-gray-200 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Download size={18} /> Download Invoice
        </button>

        <button
          onClick={() => setOpenShare(true)}
          className="flex-1 bg-gray-200 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Share2 size={18} /> Share
        </button>
      </div>

      {/* TRACK ORDER */}
      <button className="w-full bg-[#0f1e3a] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium">
        <Truck size={18} /> TRACK ORDER
      </button>

      {/* CONTINUE SHOPPING */}
      <button
        onClick={() => router.push("/products")}
        className="w-full text-center text-sm font-semibold text-[#0f1e3a]"
      >
        CONTINUE SHOPPING
      </button>
      {/* SHARE SHEET */}
      {openShare && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setOpenShare(false)}
          />

          {/* BOTTOM SHEET */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl px-6 py-6 animate-slideUp">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h3 className="text-center font-semibold text-lg mb-6">
              Share Order
            </h3>

            <div className="grid grid-cols-4 gap-6 text-center text-xs">
              {/* WHATSAPP */}
              <ShareItem
                label="WhatsApp"
                icon="/img/whatsapp.png"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=I%20just%20placed%20an%20order%20with%20Lebah!%20${window.location.href}`,
                    "_blank",
                  )
                }
              />

              {/* INSTAGRAM */}
              <ShareItem
                label="Instagram"
                icon="/img/instagram.png"
                onClick={() =>
                  window.open("https://www.instagram.com/", "_blank")
                }
              />

              {/* FACEBOOK */}
              <ShareItem
                label="Facebook"
                icon="/img/facebook.png"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                    "_blank",
                  )
                }
              />

              {/* COPY LINK */}
              <ShareItem
                label="Copy Link"
                icon="/img/link.png"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                  setOpenShare(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ITEM CARD */
function Item() {
  return (
    <div className="bg-white rounded-lg p-3 flex gap-3 border border-gray-300">
      <img
        src="/img/shirt.jpg"
        alt="product"
        className="w-20 h-24 rounded-lg object-cover"
      />

      <div className="text-sm space-y-1">
        <p className="font-semibold">Men Soft Cotton Shirt</p>
        <p>Color : Blue</p>
        <p>Size : L</p>
        <p className="font-semibold">₹ 2,599</p>
        <p>Qty : 1</p>
      </div>
    </div>
  );
}
function ShareItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shadow">
        <img src={icon} alt={label} className="w-7 h-7" />
      </div>
      <span>{label}</span>
    </button>
  );
}
