"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi2";
import { useState } from "react";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Delivery usually takes 5–7 business days depending on your location.",
  },
  {
    q: "Can I return my order?",
    a: "Yes. Returns are accepted within 7 days of delivery, provided the product is unused.",
  },
  {
    q: "Is payment secure?",
    a: "All payments are encrypted and processed through trusted, secure gateways.",
  },
];

export default function FaqsPage() {
  const [open, setOpen] = useState(null);

  return (
    <section className="min-h-screen bg-white text-[#0f2742] px-6 md:px-24 py-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl tracking-[0.25em] font-light"
        >
          FREQUENTLY
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl tracking-[0.25em] font-light mt-4"
        >
          ASKED
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl md:text-7xl tracking-[0.25em] font-light mt-4"
        >
          QUESTIONS
        </motion.h3>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "220px" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] bg-[#0f2742] mt-10"
        />
      </div>

      {/* FAQ LIST */}
      <div className="max-w-4xl mx-auto space-y-12">
        {faqs.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-start text-left group"
            >
              <span className="text-xl font-light tracking-wide group-hover:opacity-70 transition">
                {item.q}
              </span>

              <HiOutlinePlus
                className={`text-2xl mt-1 transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 max-w-3xl text-[#0f2742]/70 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>

            {/* subtle divider */}
            <div className="h-[1px] bg-[#0f2742]/15 mt-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
