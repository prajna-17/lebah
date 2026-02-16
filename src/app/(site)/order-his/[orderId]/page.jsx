"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthContext";
import { API } from "@/utils/api";
import { Truck } from "lucide-react";

export default function OrderDetailsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const statusColor = {
    PLACED: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  // 🔹 Fetch order details
  useEffect(() => {
    const token = localStorage.getItem("lebah-token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`${API}/orders/order-details/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        if (res.ok) {
          setOrder(result.data);
        } else {
          setOrder(null);
        }
      } catch (err) {
        console.error("Failed to fetch order details", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // 🔒 KEEP ALL HOOKS ABOVE THIS LINE
  if (!isLoggedIn) return null;

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#6b3430]">
        Preparing your order details ✨
      </div>
    );
  }

  // ❌ Order not found
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  // 🔴 Cancel order
  const handleCancelOrder = async () => {
    if (cancelling) return;
    setCancelling(true);

    const token = localStorage.getItem("lebah-token");

    try {
      const res = await fetch(`${API}/orders/cancel/${order._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setOrder(result.data);
        setShowCancel(false);
      } else {
        alert(result.message || "Failed to cancel order");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setCancelling(false);
    }
  };

  // ✅ MAIN UI (UNCHANGED)
  return (
    <div className="min-h-screen bg-[#faf7f6] px-4 pb-10 text-gray-900 font-semibold">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-[#6b3430] mt-6 mb-4"
      >
        Order Details
      </motion.h1>

      {/* ORDER SUMMARY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 mb-5 shadow-lg"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toDateString()}
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              statusColor[order.orderStatus]
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <p className="text-sm mt-2 text-gray-600">
          Payment:{" "}
          <span className="font-medium">
            {order.paymentMethod} ({order.paymentStatus})
          </span>
        </p>
      </motion.div>

      {/* PRODUCTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-4 mb-5 shadow-lg"
      >
        <h2 className="text-sm font-semibold mb-4">Items</h2>

        <div className="space-y-4">
          {order.products.map((item, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.97 }}
              className="flex gap-3"
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-16 h-20 object-cover rounded-xl shadow"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold">₹{item.subtotal}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SHIPPING */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-4 mb-5 shadow-lg"
      >
        <h2 className="text-sm font-semibold mb-2">Shipping Address</h2>
        <p className="text-sm">{order.shippingAddress.fullName}</p>
        <p className="text-sm">{order.shippingAddress.phone}</p>
        <p className="text-sm">
          {order.shippingAddress.addressLine}, {order.shippingAddress.landmark}
        </p>
        <p className="text-sm">
          {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
          {order.shippingAddress.postalCode}
        </p>
      </motion.div>

      {/* TOTAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-lg"
      >
        <span className="text-base font-medium">Total Amount</span>
        <span className="text-lg font-semibold text-[#6b3430]">
          ₹{order.totalAmount}
        </span>
      </motion.div>

      {/* CANCEL BUTTON */}
      {["PLACED", "CONFIRMED"].includes(order.orderStatus) && (
        <button
          onClick={() => setShowCancel(true)}
          className="w-full mt-6 py-3 rounded-xl bg-red-100 text-red-700 font-semibold"
        >
          Cancel Order
        </button>
      )}
      <button
        onClick={() => router.push(`/order-track/${order._id}`)}
        className="w-full mt-10 bg-[#0f1e3a] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium"
      >
        <Truck size={18} /> TRACK ORDER
      </button>

      {showCancel && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm animate-scaleIn">
            <h2 className="text-lg font-semibold text-[#6b3430] mb-2">
              Cancel Order?
            </h2>

            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 border py-2 rounded-xl"
              >
                No
              </button>

              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl"
                disabled={cancelling}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
