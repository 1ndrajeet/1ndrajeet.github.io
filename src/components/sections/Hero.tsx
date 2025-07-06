import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiNextdotjs, SiTypescript, SiFastapi, SiDocker, SiMysql } from 'react-icons/si';
import { Gotu } from 'next/font/google';
import {  MessageSquareCode, Sparkles } from 'lucide-react';

const dynamicTexts = [
  "Freelancer? Nah. I'm the architect.",
  "Built from zero. Running on ego.",
  "TestForge wasn’t luck. It was war.",
  "Where others stall, I execute.",
  "I don’t dream. I deploy.",
  "Modern stack. Ruthless precision.",
  "Code, cash, and chaos — in that order.",
  "Acharya Tech — born from sleepless nights.",
  "Execution > Excuses — always.",
];



const font = Gotu({
  subsets: ['latin'],
  weight: '400',
})

const techStack = [
  {
    icon: <SiNextdotjs className="h-8 w-8 text-black dark:text-white" />,
    name: "Next.js",
  },
  {
    icon: <SiTypescript className="h-8 w-8 text-blue-500" />,
    name: "TypeScript",
  },
  {
    icon: <SiFastapi className="h-8 w-8 text-emerald-500" />,
    name: "FastAPI",
  },
  {
    icon: <SiDocker className="h-8 w-8 text-sky-500" />,
    name: "Docker",
  },
  {
    icon: <SiMysql className="h-8 w-8 text-[#00758f]" />,
    name: "MySQL",
  },
];


export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 2600);

    const techInterval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techStack.length);
    }, 2600);

    return () => {
      clearInterval(textInterval);
      clearInterval(techInterval);
    };
  }, []);

  const currentTech = techStack[currentTechIndex];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500  dark:bg-gradient-to-br dark:from-black  dark:to-black dark:text-white
        bg-gradient-to-br from-white to-white text-black
    }`}>



      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-500 rounded-full opacity-60"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left Content - 60% */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0 z-10">

          {/* Sanskrit Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-sm font-mono mb-6 dark:text-gray-400 text-gray-600 ${font.className} text-center`}
          >
            || विजिगीषुः न समवेतव्यः ||
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', lineHeight: '1.1' }}
          >
            OMKAR <span className="text-amber-500">KULKARNI</span>
          </motion.h1>

          {/* Codename */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-lg mb-4"
          >
            CODENAME: @1NDRAJEET
          </motion.div>

          {/* Übermacht Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <span className="bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-bold">
              ÜBERMACHT IN DEVELOPMENT
            </span>
          </motion.div>

          {/* Dynamic Text Carousel */}
          <div className="h-20 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`text-xl leading-relaxed dark:text-gray-300 text-gray-700'}`}
              >
                {dynamicTexts[currentTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tech Stack Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center">
              <span className={`text-sm mr-4 dark:text-gray-400 text-gray-600'}`}>
                Powered by:
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTechIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500 text-sm"
                >
                  {currentTech.icon}
                  <span>{currentTech.name}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-center text-black px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Witness My Triumphs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgb(245, 158, 11)', color: 'black' }}
              whileTap={{ scale: 0.95 }}
              className="border-2 text-center border-amber-500 px-8 py-4 rounded-lg font-semibold hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2"
            >
              <MessageSquareCode className="w-5 h-5 text-center" />
              Request a Project
            </motion.button>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-xs font-mono space-y-1 dark:text-gray-500 text-gray-400'}`}
          >
            <div>DOMINANZ • ELITESTANDARD • PERFEKTION • <span className="text-amber-500">INEVITABLE</span></div>
            <div>(Inferior developers need not apply.)</div>
          </motion.div>
        </div>

        {/* Right Visual Canvas - 40% */}
        <div className="w-full lg:w-2/5 relative overflow-hidden">

          {/* Code Terminal Background */}
          <div className={`absolute inset-0 font-mono text-xs leading-relaxed p-8 overflow-hidden'
          }`}>
            <motion.div
              animate={{ y: [0, -100] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="space-y-1"
            >
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} className="opacity-30">
                  {i % 3 === 0 && "const buildSystem = async () => {"}
                  {i % 3 === 1 && "  return Promise.resolve('ÜBERMACHT');"}
                  {i % 3 === 2 && "};"}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px),
                               linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Radial Glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 60% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 70%)`
            }}
          />

          {/* Accent Lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-px bg-amber-500 opacity-60" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-px bg-amber-500 opacity-40" />
            <div className="absolute top-1/2 left-1/3 w-px h-16 bg-amber-500 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}