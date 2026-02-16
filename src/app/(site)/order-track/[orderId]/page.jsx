"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/utils/api";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("lebah-token");

    const fetchOrder = async () => {
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
        console.error("Tracking fetch failed", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-slate-700">
            Tracking your order...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Order Not Found
          </h2>
          <p className="text-slate-600">
            We couldn't find the order you're looking for.
          </p>
        </div>
      </div>
    );
  }

  const steps = ["PLACED", "SHIPPED", "DELIVERED"];

  const completedStatuses = order.statusTimeline.map((s) => s.status);
  const lastCompletedStepIndex = steps.reduce((acc, step, i) => {
    if (completedStatuses.includes(step)) {
      return i;
    }
    return acc;
  }, -1);

  const isCancelled = completedStatuses.includes("CANCELLED");

  const progressPercentage =
    (completedStatuses.filter((s) => steps.includes(s)).length / steps.length) *
    100;

  const getStepIcon = (step, isCompleted) => {
    if (step === "PLACED") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (step === "SHIPPED") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      );
    }
    if (step === "DELIVERED") {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                Order Tracking
              </h1>
              <p className="text-slate-600">Order ID: #{orderId}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                {isCancelled
                  ? "Cancelled"
                  : completedStatuses[completedStatuses.length - 1]}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          {!isCancelled && (
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-8">
            Shipment Timeline
          </h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>

            {/* Animated Progress Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: isCancelled
                  ? `${(completedStatuses.indexOf("CANCELLED") / steps.length) * 100}%`
                  : `${progressPercentage}%`,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-green-500 to-green-600 z-10"
            />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const isCompleted = index <= lastCompletedStepIndex;
                const stepData = order.statusTimeline.find(
                  (s) => s.status === step,
                );

                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Circle Icon with Green Checkmark */}
                    <motion.div
                      animate={
                        isCompleted ? { scale: [1, 1.1, 1] } : { scale: 1 }
                      }
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
                      className={`relative z-20 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? "bg-white border-2 border-slate-800 shadow-md"
                          : "bg-white border-2 border-slate-300"
                      }`}
                    >
                      {isCompleted ? (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: index * 0.15 + 0.6,
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                          className="w-6 h-6 text-slate-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      ) : (
                        <span className="w-3 h-3 bg-slate-300 rounded-full"></span>
                      )}
                    </motion.div>

                    {/* Content - This is now on the RIGHT */}
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <h3
                          className={`text-lg font-bold tracking-wide transition-colors duration-300 ${
                            isCompleted ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {step.charAt(0) + step.slice(1).toLowerCase()}
                        </h3>
                        {isCompleted && stepData && (
                          <span className="text-sm font-medium text-slate-500">
                            {new Date(stepData.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>

                      {isCompleted && stepData && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.15 + 0.7 }}
                          className="text-sm text-slate-600"
                        >
                          {new Date(stepData.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </motion.p>
                      )}

                      {!isCompleted && (
                        <p className="text-sm text-slate-400">Pending</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Cancelled Section */}
              {isCancelled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="relative flex items-start gap-6"
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="relative z-20 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30"
                  >
                    <svg
                      className="w-6 h-6 text-slate-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.div>

                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="text-lg font-bold text-red-600">
                        Order Cancelled
                      </h3>
                      <span className="text-sm font-medium text-red-500">
                        {new Date(
                          order.statusTimeline.find(
                            (s) => s.status === "CANCELLED",
                          )?.date,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-red-400">
                      Your order has been cancelled
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center gap-4 text-gray-900">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-slate-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Need Help?</h3>
              <p className="text-blue-100 text-sm">
                Contact our support team for any questions about your order
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
