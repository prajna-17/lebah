"use client";

import { Download, Share2, Truck } from "lucide-react";
import { FiX, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SuccessAnimation from "@/components/SuccessAnimation";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";

export const dynamic = "force-dynamic";

export default function OrderConfirmedPage() {
  const router = useRouter();
  const [openShare, setOpenShare] = useState(false);
  const [cart, setCart] = useState([]);
  const [productLink, setProductLink] = useState("");

  /* LOAD CART */
  useEffect(() => {
    setCart(getCart());
  }, []);

  /* GET CURRENT URL (CLIENT ONLY) */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductLink(window.location.href);
    }
  }, []);

  /* ORDER DATA */
  const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() + 7);
  const toDate = new Date(today);
  toDate.setDate(today.getDate() + 10);

  const formatDate = (d) =>
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const shareText = `I just placed an order with Lebah! 🛍️
Order ${orderNumber}
Total ₹${subTotal.toLocaleString("en-IN")}`;

  const copyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(productLink);
      alert("Link Copied ✔");
      setOpenShare(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-gray-900 space-y-6">
      {/* SUCCESS */}
      <div className="text-center space-y-4">
        <SuccessAnimation />
        <h2 className="text-lg font-semibold">Order Confirmed</h2>
        <p className="text-gray-600 text-sm">
          Thank you for your order with Lebah!
        </p>
      </div>

      {/* ORDER DETAILS */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-300 px-4 py-3 font-semibold text-sm">
          Order Details
        </div>

        <div className="px-4 py-4 space-y-2 text-sm">
          <p>
            Order Number : <span className="font-semibold">{orderNumber}</span>
          </p>
          <p>
            Estimated Delivery :
            <span className="font-semibold">
              {" "}
              {formatDate(fromDate)} – {formatDate(toDate)}
            </span>
          </p>
          <p>
            Payment Method :
            <span className="font-semibold"> Selected Payment</span>
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-300 px-4 py-3 font-semibold text-sm">
          Items In Your Order
        </div>

        <div className="px-4 py-4 space-y-4">
          {cart.map((item) => (
            <Item key={item.variantId} item={item} />
          ))}

          <div className="text-sm font-semibold text-right">
            Total Amount : ₹ {subTotal.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            if (typeof document === "undefined") return;

            const invoice = `
Lebah - Invoice

Order Number: ${orderNumber}
Total Amount: ₹ ${subTotal}

${cart
  .map((i) => `- ${i.title} (${i.color}) x${i.qty} - ₹ ${i.price * i.qty}`)
  .join("\n")}
`;
            const blob = new Blob([invoice], { type: "text/plain" });
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
        className="w-full text-sm font-semibold text-[#0f1e3a]"
      >
        CONTINUE SHOPPING
      </button>

      {/* SHARE MODAL */}
      <div
        className={`fixed inset-0 z-[99999] flex justify-center items-end transition-all duration-300 ${
          openShare ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpenShare(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            openShare ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`w-full max-w-[480px] bg-white rounded-t-2xl p-5 pb-8 z-[999999]
          transition-transform duration-300 ${
            openShare ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Share Order</h3>
            <button onClick={() => setOpenShare(false)}>
              <FiX size={22} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-5 text-center text-sm font-medium">
            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    "_blank",
                  );
                }
              }}
            >
              <FaWhatsapp size={28} className="text-green-500" />
              WhatsApp
            </button>

            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${productLink}`,
                    "_blank",
                  );
                }
              }}
            >
              <FaFacebookF size={28} className="text-blue-600" />
              Facebook
            </button>

            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("https://www.instagram.com/", "_blank");
                }
              }}
            >
              <FaInstagram size={28} className="text-pink-500" />
              Instagram
            </button>

            <button className="flex flex-col items-center" onClick={copyLink}>
              <FiCopy size={28} />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ITEM CARD */
function Item({ item }) {
  return (
    <div className="bg-white rounded-lg p-3 flex gap-3 border border-gray-300">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-24 rounded-lg object-cover"
      />
      <div className="text-sm space-y-1">
        <p className="font-semibold">{item.title}</p>
        <p>Color : {item.color}</p>
        <p className="font-semibold">₹ {item.price.toLocaleString("en-IN")}</p>
        <p>Qty : {item.qty}</p>
      </div>
    </div>
  );
}
