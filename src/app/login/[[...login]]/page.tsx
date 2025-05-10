"use client";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/nextjs";
import { Crown } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 bg-neutral-100 dark:bg-neutral-950">
      <div className="flex flex-col items-center space-y-6 px-6 w-full max-w-md">
        {/* Crown Separator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center w-full"
        >
          <div className="border-b-2 border-neutral-700 dark:border-neutral-300 w-16 sm:w-20" />
          <Crown className="w-6 h-6 mx-3 text-amber-500" />
          <div className="border-b-2 border-neutral-700 dark:border-neutral-300 w-16 sm:w-20" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 text-center uppercase tracking-widest"
          aria-label="Login to Superior Platform"
        >
          <span className="text-amber-500">SUPERIOR</span> ACCESS
        </motion.h1>

        {/* Clerk SignIn Component */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full"
        >
          <SignIn
            appearance={{
              baseTheme: undefined, // Use custom theme
              elements: {
                formButtonPrimary:
                  "bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold uppercase tracking-wider px-6 py-4 rounded-none border-none text-sm",
                card: "bg-neutral-200 dark:bg-neutral-800 shadow-none rounded-none border-l-2 border-amber-500",
                headerTitle: "hidden", // Hide default title (using custom h1)
                headerSubtitle: "hidden",
                formFieldLabel:
                  "text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider",
                formFieldInput:
                  "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4 py-3 rounded-none border-l-2 border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500",
                footerActionLink:
                  "text-amber-500 hover:text-amber-400 font-medium uppercase tracking-wider",
                socialButtonsBlockButton:
                  "bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border-l-2 border-amber-500 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-none uppercase tracking-wider",
              },
              variables: {
                colorPrimary: "#f59e0b", // amber-500
                colorText: "#1f2937", // neutral-800 (light mode)
                colorTextSecondary: "#4b5563", // neutral-600
                colorBackground: "#f5f5f5", // neutral-100
                colorInputBackground: "#ffffff", // neutral-100
                colorInputText: "#1f2937", // neutral-800
              },
              layout: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "iconButton",
              },
            }}
            routing="path"
            path="/login"
            signUpUrl="/signup"
          />
        </motion.div>

        {/* Footer Separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center mt-4"
        >
          <div className="border-t-2 border-neutral-700 dark:border-neutral-300 w-28 sm:w-32" />
          <div className="px-4 text-xs sm:text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
            inferior developers need not apply
          </div>
          <div className="border-t-2 border-neutral-700 dark:border-neutral-300 w-20 sm:w-24" />
        </motion.div>
      </div>
    </div>
  );
}