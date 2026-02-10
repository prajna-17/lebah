"use client";

import { motion } from "framer-motion";

export default function AboutUsPage() {
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
          ABOUT
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl tracking-[0.25em] font-light mt-4"
        >
          US
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[1px] bg-[#0f2742] mt-10"
        />
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-24 grid md:grid-cols-2 gap-20 pb-32">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg leading-relaxed text-[#0f2742]/80">
            We create timeless pieces for those who appreciate quiet luxury,
            thoughtful design, and refined craftsmanship.
          </p>

          <p className="text-lg leading-relaxed text-[#0f2742]/80 mt-8">
            Every product reflects a balance between modern minimalism and
            enduring elegance — designed not for trends, but for longevity.
          </p>
        </motion.div>

        {/* Right statement */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="border-l border-[#0f2742]/30 pl-10">
            <p className="text-2xl font-light leading-snug">
              Luxury is not loud.
              <br />
              It is intentional,
              <br />
              restrained,
              <br />
              and enduring.
            </p>
          </div>
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
