"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { Button } from "../ui/button";
import Link from "next/link";
import { Crown, Medal, Star, Shield, Award, ChevronDown } from "lucide-react";
import { Gotu } from "next/font/google";

const gotu = Gotu({
  subsets: ["devanagari"],
  weight: "400",
});

export default function Hero() {
  return (
    <>
      <div className="h-16 opacity-0 -z-20" aria-hidden="true"></div>
      {/* Gradient separator */}
      <section className="relative">
        <HeroHighlight className="min-h-screen flex items-center justify-center py-16 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none dark:opacity-10">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-16 w-full h-full transform rotate-45">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-8 h-8 border-2 border-neutral-800 dark:border-neutral-300 rounded-none"></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-8 px-6 pt-36 pb-24 md:py-0 z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center w-full z-20"
            >
              <div className="border-b-2 border-neutral-700 dark:border-neutral-300 w-16 sm:w-20" />
              <Crown className="w-8 h-8 mx-3 text-amber-500 dark:text-amber-400" />
              <div className="border-b-2 border-neutral-700 dark:border-neutral-300 w-16 sm:w-20" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-100 max-w-3xl leading-tight text-center uppercase tracking-widest"
              aria-label="Omkar Kulkarni, The Superior Developer"
            >
              <span className={`${gotu.className} text-sm font-black -tracking-tight block mb-2 text-neutral-800 dark:text-neutral-400 Gotu`}>|| विजिगीषु: न समवेतव्यः ||</span>
              <Highlight className="text-neutral-900 dark:text-white">OMKAR KULKARNI</Highlight>
              <span className="text-base sm:text-xl block mt-2">
                CODENAME: @<Link href="https://github.com/1ndrajeet" className="hover:underline hover:text-amber-500 dark:hover:text-amber-400 transition-colors">1ndrajeet</Link>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 max-w-xl text-center font-medium"
            >
              <span className="text-amber-500 dark:text-amber-400 font-bold">ÜBERMACHT</span> in Development<br />
              Delivering flawless, enterprise-grade solutions with confidence and clarity. Where others hesitate, <span className="font-black underline decoration-2">I build</span>. Your vision deserves nothing less than exceptional execution
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-2"
            >
              {[
                { name: "Next.js", delay: 0, icon: <Star className="w-3 h-3 mr-1 text-amber-500 !text-lg font-bold" /> },
                { name: "React", delay: 0.1, icon: <Shield className="w-3 h-3 mr-1" /> },
                { name: "TypeScript", delay: 0.2, icon: <Medal className="w-3 h-3 mr-1" /> },
                { name: "Tailwind CSS", delay: 0.3, icon: <Star className="w-3 h-3 mr-1" /> },
                { name: "React Native", delay: 0.4, icon: <Award className="w-3 h-3 mr-1" /> },
                { name: "Android (Native)", delay: 0.5, icon: <Shield className="w-3 h-3 mr-1" /> },
                { name: "Docker", delay: 0.7, icon: <Medal className="w-3 h-3 mr-1" /> },
                { name: "Node.js", delay: 0.8, icon: <Award className="w-3 h-3 mr-1" /> },
                { name: "MySQL", delay: 0.9, icon: <Star className="w-3 h-3 mr-1" /> },
              ]
                .map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ delay: tech.delay, duration: 0.3 }}
                    className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-none text-xs sm:text-xs font-bold border-l-2 border-amber-500 dark:border-amber-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-default uppercase tracking-wider flex items-center"
                  >
                    {tech.icon}
                    {tech.name}
                  </motion.span>
                ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full max-w-md"
            >
              <Link href="#projects">
                <Button
                  className="font-bold cursor-pointer uppercase rounded-none border-amber-500 dark:border-amber-400 tracking-wider px-6 py-4 text-sm w-full sm:w-auto bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  variant="outline"
                >
                  <Medal className="w-5 h-5 mr-2" />
                  Witness My Triumphs
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="default"
                  className="font-bold uppercase tracking-wider px-6 py-4 text-sm w-full sm:w-auto bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white"
                >
                  Request a project
                  <Star className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-4"
            >
              <span className="text-neutral-700 dark:text-neutral-400 text-xs uppercase md:tracking-[0.4em] tracking-wide font-bold flex items-center">
                DOMINANZ • ELITESTANDARD • PERFEKTION {`>>>`} INEVITABLE
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex justify-center mt-4"
            >
              <div className="border-t-2 border-neutral-700 dark:border-neutral-300 w-12 sm:w-24" />
              <div className="px-4 text-xs sm:text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                inferior developers need not apply
              </div>
              <div className="border-t-2 border-neutral-700 dark:border-neutral-300 w-12 sm:w-24" />
            </motion.div>

            {/* Scroll indicator - moved inside the main content container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-8 hidden md:block"
            >
              <Link href="#about">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    Discover My Journey
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </HeroHighlight>

        {/* Gradient separator instead of absolute positioned element */}
        <div className="h-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900"></div>
      </section>
    </>
  );
}