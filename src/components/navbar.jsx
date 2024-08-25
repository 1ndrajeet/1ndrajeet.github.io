"use client";
import { TerminalIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="p-4 fixed top-0 z-20 left-0 right-0 bg-slate-900 border-b border-emerald-400 backdrop-blur-2xl">
      <div className="container max-w-8xl mx-auto flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-100"
          prefetch={false}
        >
          <TerminalIcon className="h-6 w-6 text-gray-100" />
          <span className="text-lg font-bold">1ndrajeet</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {["home", "about", "projects", "contact"].map((section) => (
            <motion.div
              key={section}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href={`#${section}`}
                className="group text-gray-100 hover:text-emerald-300 underline-offset-4 hover:underline"
                prefetch={false}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
              <motion.div
                className="absolute left-0 bottom-0 w-full h-1 bg-emerald-400 scale-x-0 origin-left transition-transform duration-300"
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          ))}
        </nav>

        <button
          className="md:hidden text-gray-100"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <motion.div
            className="transition-transform duration-300"
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </motion.div>
        </button>
      </div>

      <motion.div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } backdrop-blur-2xl mt-4 p-4`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-4">
          {["home", "about", "projects", "contact"].map((section) => (
            <motion.div
              key={section}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href={`#${section}`}
                className="group text-gray-100 hover:text-emerald-300 underline-offset-4 hover:underline"
                prefetch={false}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
              <motion.div
                className="absolute left-0 bottom-0 w-full h-1 bg-emerald-400 scale-x-0 origin-left transition-transform duration-300"
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  );
}
