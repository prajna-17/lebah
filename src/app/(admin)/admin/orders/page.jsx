"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/utils/api";
import "@/components/admin/modal.css";

export default function AdminOrders() {
  const [filter, setFilter] = useState("ALL");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("lebah-token")}`,
        },
      });

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ STATUS BADGE HELPER (ONLY ADDITION)
  const getStatusBadge = (status) => {
    const styles = {
      PLACED: { bg: "#fff3cd", color: "#856404" },
      SHIPPED: { bg: "#e3f2fd", color: "#1565c0" },
      DELIVERED: { bg: "#e8f5e9", color: "#2e7d32" },
      CANCELLED: { bg: "#fdecea", color: "#c62828" },
    };

    return (
      <span
        style={{
          background: styles[status]?.bg,
          color: styles[status]?.color,
          padding: "3px 8px",
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {status}
      </span>
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "PENDING") return order.orderStatus !== "DELIVERED";
    if (filter === "DELIVERED") return order.orderStatus === "DELIVERED";
    if (filter === "COD") return order.paymentMethod === "COD";
    if (filter === "ONLINE") return order.paymentMethod === "ONLINE";
    return true; // ALL
  });

  if (loading) {
    return <div style={{ padding: 30 }}>Loading orders...</div>;
  }

  return (
    <div className="font-semibold text-gray-900">
      <h1 className="page-title">Manage Orders</h1>

      {/* FILTER BUTTONS */}
      <div
        className="cat-top-row"
        style={{ gap: 6, justifyContent: "flex-start" }}
      >
        <button className="primary-btn small" onClick={() => setFilter("ALL")}>
          All
        </button>
        <button
          className="primary-btn small"
          onClick={() => setFilter("PENDING")}
        >
          Pending
        </button>
        <button
          className="primary-btn small"
          onClick={() => setFilter("DELIVERED")}
        >
          Delivered
        </button>
        <button className="primary-btn small" onClick={() => setFilter("COD")}>
          COD
        </button>
        <button
          className="primary-btn small"
          onClick={() => setFilter("ONLINE")}
        >
          Online
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="product-grid">
        {filteredOrders.map((order) => (
          <div key={order._id} className="product-card">
            <div className="product-body">
              <div className="product-title">Order #{order._id.slice(-6)}</div>

              <div className="product-sub">
                <span>Total: ₹{order.totalAmount}</span>
                <span>{order.paymentMethod}</span>
              </div>

              <div className="product-sub">
                <span>Status: {getStatusBadge(order.orderStatus)}</span>
                <span>Payment: {order.paymentStatus}</span>
              </div>

              <div style={{ marginTop: 8 }}>
                {order.products.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <img
                      src={p.images?.[0]}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <div style={{ fontSize: 13 }}>
                      {p.title} × {p.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div style={{ marginTop: 10 }}>
                <Link href={`/admin/orders/${order._id}`}>
                  <button className="primary-btn small">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
