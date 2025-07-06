"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { RingLoader } from "react-spinners";
import { RiFlashlightFill } from "react-icons/ri"; // tiny brand accent

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const LoaderLandingPage = () => {
  const [progress, setProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const duration = 3200;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const prog = Math.min((elapsed / duration) * 100, 100);
      setProgress(prog);
      if (prog < 100) requestAnimationFrame(animate);
      else setShowTagline(true); // reveal at the end
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] ${inter.className}`}
    >
      {/* Icon + spinner */}
      <div className="flex flex-col items-center w-full max-w-[220px]">
        <div className="flex items-center gap-2 mb-3">
          {/* tiny accent icon for a personal stamp */}
          <RiFlashlightFill className="text-[#d97706] text-xl animate-pulse" />
          <RingLoader color="#d97706" size={60} />
        </div>

        {/* progress bar with smooth motion */}
        <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#d97706]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{
              filter: "drop-shadow(0 0 4px #d97706)",
            }}
          />
        </div>
      </div>

      {/* fade‑in tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-sm tracking-wide text-[#f1f1f1]"
          >
            No Excuses. Just Execution.
          </motion.p>
        )}
      </AnimatePresence>

      {/* signature */}
      <p className="mt-3 text-xs text-[#71717a]">@1ndrajeet</p>
    </div>
  );
};
