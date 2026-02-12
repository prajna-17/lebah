"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-white text-[#0f2742] overflow-hidden">
      {/* HERO */}
      <div className="relative px-6 md:px-24 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl tracking-[0.25em] font-light"
        >
          PRIVACY
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl tracking-[0.25em] font-light mt-4"
        >
          POLICY
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[1px] bg-[#0f2742] mt-10"
        />
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-24 pb-32 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10 text-[#0f2742]/80 text-lg leading-relaxed"
        >
          <p>
            At our company, your privacy is treated with the highest level of
            respect and responsibility. We are committed to protecting your
            personal information and ensuring complete transparency in how it is
            used.
          </p>

          <p>
            We collect only the information necessary to process your orders,
            provide customer support, and enhance your shopping experience. This
            may include your name, contact details, shipping address, and
            payment information.
          </p>

          <p>
            All payment transactions are encrypted and securely processed
            through trusted gateways. We do not store or have access to your
            card details.
          </p>

          <p>
            Your data is never sold, rented, or traded. Information may only be
            shared with logistics and payment partners strictly for order
            fulfillment purposes.
          </p>

          <p>
            You retain the right to access, modify, or request deletion of your
            personal information at any time. For any privacy-related concerns,
            please contact our support team.
          </p>

          <p>
            By using our website, you agree to the terms outlined in this
            Privacy Policy.
          </p>
        </motion.div>
      </div>

      {/* BOTTOM ACCENT */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="origin-left h-[1px] bg-[#0f2742]/20 mx-6 md:mx-24 mb-20"
      />
    </section>
  );
}
