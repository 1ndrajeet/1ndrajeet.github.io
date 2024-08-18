"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-800 pt-24 pb-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 -z-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 text-gray-100"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Hi, I&apos;m Omkar Kulkarni{" "}
            <span className="text-emerald-400">(@1ndrajeet)</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            I&apos;m a full-stack developer with a passion for creating
            beautiful and functional web applications. Let&apos;s build
            something amazing together!
          </motion.p>
        </div>
      </div>
    </section>
  );
}
