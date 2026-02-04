"use client";
import { motion } from "framer-motion";

export default function CinematicScrollReveal({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 90,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 2.6, // 🎬 slow cinematic
        ease: [0.22, 1, 0.36, 1], // luxury easing
      }}
      viewport={{
        once: true, // 👈 animate only once
        margin: "-120px", // start slightly late
      }}
    >
      {children}
    </motion.div>
  );
}
