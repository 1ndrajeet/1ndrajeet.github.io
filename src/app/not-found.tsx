"use client";

import { ShinyButton } from "@/components/magicui/shiny-button";
import { motion,  useReducedMotion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

// Animation variants for the 404 content
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * 404 Not Found page component with a modern, animated design.
 * @returns {JSX.Element} 404 page
 */
export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  // Memoize the bat SVG to prevent re-renders
  const batSvg = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 48 48"
        fill="currentColor"
        className="text-primary mx-auto fill:white"
        aria-hidden="true"
      >
        <motion.path
          d="M24,18.2c0.7,0,0.9,0.2,0.9,0.2l0.4-1.7c0,0,0.4,1.5,0.4,2.8c0.2,1.1,2.2,0.4,3.9,0C31.4,19.1,32,16,32,16h16c0,0-9.4,3.5-7,10c0,0-14.8-2-17,7l0,0c-2.2-9-17-7-17-7c2.4-6.5-7-10-7-10h16c0,0,0.6,3.1,2.3,3.5c1.7,0.4,3.9,1.1,3.9,0c0.2-1.1,0.4-2.8,0.4-2.8l0.4,1.7C23.1,18.4,23.4,18.2,24,18.2L24,18.2L24,18.2z"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeInOut" }}
        />
      </svg>
    ),
    [shouldReduceMotion]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Include the Header component */}

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.section
          className="text-center max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="alert"
          aria-labelledby="not-found-title"
        >
          <motion.div variants={itemVariants}>{batSvg}</motion.div>

          <motion.h1
            id="not-found-title"
            className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mt-6"
            variants={itemVariants}
          >
            404
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mt-4"
            variants={itemVariants}
          >
            Oops! Looks like this page flew into the Batcave and got lost.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <Link href="/">
              <ShinyButton className="text-sm font-semibold">
                Back to Home
              </ShinyButton>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-2 text-muted-foreground"
          >
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm">Page not found</p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer (optional, for consistency) */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} 1ndrajeet. All rights reserved.
        </div>
      </footer>
    </div>
  );
}