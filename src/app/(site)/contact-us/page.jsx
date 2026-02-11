"use client";

import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUsPage() {
  return (
    <section className="min-h-screen bg-white text-[#0f2742] px-6 md:px-20 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl tracking-[0.3em] mb-16">CONTACT</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Email */}
          <motion.a
            href="mailto:montoaklyn@gmail.com"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            className="border border-[#0f2742]/20 p-10 rounded-2xl hover:shadow-xl transition"
          >
            <HiOutlineEnvelope className="text-3xl mx-auto mb-4" />
            <p className="tracking-wide">EMAIL US</p>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+918791676705"
            whileHover={{ y: -6 }}
            className="border border-[#0f2742]/20 p-10 rounded-2xl hover:shadow-xl transition"
          >
            <HiOutlinePhone className="text-3xl mx-auto mb-4" />
            <p className="tracking-wide">CALL US</p>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            whileHover={{ y: -6 }}
            href="https://wa.me/918791676705"
            target="_blank"
            className="border border-[#0f2742]/20 p-10 rounded-2xl hover:shadow-xl transition"
          >
            <FaWhatsapp className="text-3xl mx-auto mb-4" />
            <p className="tracking-wide">WHATSAPP</p>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
