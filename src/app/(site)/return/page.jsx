"use client";

import { motion } from "framer-motion";

export default function ReturnPage() {
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
          RETURN
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl tracking-[0.25em] font-light mt-4"
        >
          POLICY
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "220px" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[1px] bg-[#0f2742] mt-10"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-10 text-[#0f2742]/80 leading-relaxed">
        <p>We offer a 7-day return policy from the date of delivery.</p>

        <p>
          To be eligible for a return, the item must be unused, unwashed, and in
          its original condition with tags intact.
        </p>

        <p>
          Once we receive and inspect the returned product, a refund will be
          processed to your original payment method within 5–7 business days.
        </p>

        <p>
          Items purchased during special promotions or clearance sales may not
          be eligible for return.
        </p>
      </div>
    </section>
  );
}
