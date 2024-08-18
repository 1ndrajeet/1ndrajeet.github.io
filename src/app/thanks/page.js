"use client";

import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <section
      className="relative w-full min-h-screen flex items-start justify-center py-12 md:py-24 lg:py-32 bg-gray-900 bg-cover bg-center"
      style={{
        background: "url(/gotham.png) center / cover no-repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm"></div>
      <div className="relative container px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-8">
          <motion.h2
            className="text-2xl font-bold text-rose-700 font-creepster sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Why So Serious? 🃏
          </motion.h2>
          <motion.p
            className="text-gray-400 text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Your message has been sent. It’s all a game of chance. I’ll reach
            out... eventually. Or maybe I’ll let the chaos decide.
          </motion.p>
          <div className="mt-6 md:mt-8">
            <motion.a
              href="/"
              className="inline-block py-2 px-4 md:py-2.5 md:px-6 bg-emerald-500 text-white rounded-md shadow-lg hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-transform duration-300 transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Back to Gotham
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
