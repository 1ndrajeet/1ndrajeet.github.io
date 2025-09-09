import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiNextdotjs, SiTypescript, SiFastapi, SiDocker, SiMysql, SiReact, SiTailwindcss, SiPython } from 'react-icons/si';
import { MessageSquareCode, Sparkles, Download, Terminal, Zap, Brain, Activity, GitBranch } from 'lucide-react';
import { Gotu } from "next/font/google";

const dynamicTexts = [
  "Freelancer? Nah. I'm the architect.",
  "Built from zero. Running on ego.",
  "TestForge wasn't luck. It was war.",
  "Where others stall, I execute.",
  "I don't dream. I deploy.",
  "Modern stack. Ruthless precision.",
  "Code, cash, and chaos — in that order.",
  "Acharya Tech — born from sleepless nights.",
  "Execution > Excuses — always.",
  "Debug the world. Ship the future.",
  "Performance is poetry in motion.",
];
const marathiFont = Gotu({ subsets: ['devanagari'], weight: '400' });

const techStack = [
  { icon: <SiNextdotjs className="w-5 h-5 md:w-6 md:h-6" />, name: "Next.js", color: "#000000", proficiency: 95 },
  { icon: <SiTypescript className="w-5 h-5 md:w-6 md:h-6" />, name: "TypeScript", color: "#3178C6", proficiency: 70 },
  { icon: <SiFastapi className="w-5 h-5 md:w-6 md:h-6" />, name: "FastAPI", color: "#009688", proficiency: 60 },
  { icon: <SiDocker className="w-5 h-5 md:w-6 md:h-6" />, name: "Docker", color: "#2496ED", proficiency: 60 },
  { icon: <SiMysql className="w-5 h-5 md:w-6 md:h-6" />, name: "MySQL", color: "#4479A1", proficiency: 80 },
  { icon: <SiReact className="w-5 h-5 md:w-6 md:h-6" />, name: "React", color: "#61DAFB" ,proficiency: 80},
  { icon: <SiTailwindcss className="w-5 h-5 md:w-6 md:h-6" />, name: "Tailwind", color: "#06B6D4", proficiency: 100 },
  { icon: <SiPython className="w-5 h-5 md:w-6 md:h-6" />, name: "Python", color: "#3776AB", proficiency: 60 },
];

const NeuralNetwork = () => {
  const [nodes] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 },
        () => Math.floor(Math.random() * 12)).filter(c => c !== i)
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="w-full h-full">
        {/* Connections */}
        {nodes.map(node =>
          node.connections.map(connectionId => {
            const connectedNode = nodes[connectionId];
            return (
              <motion.line
                key={`${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${connectedNode?.x}%`}
                y2={`${connectedNode?.y}%`}
                stroke="#f59e0b"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: node.id * 0.1 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="#f59e0b"
            initial={{ scale: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.id * 0.2
            }}
          />
        ))}
      </svg>
    </div>
  );
};

type TechBubbleProps = {
  tech: {
    icon: React.ReactNode;
    name: string;
    color: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
};

const TechBubble = ({ tech, index, isActive, onClick }: TechBubbleProps) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`
      relative cursor-pointer p-3 md:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300
      ${isActive
        ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/25'
        : 'bg-white/5 dark:bg-black/20 border-white/10 dark:border-gray-700 hover:border-amber-500/50'
      }
    `}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex flex-col items-center gap-2">
      <div className="text-white">
        {tech.icon}
      </div>
      <span className={`text-xs md:text-sm font-medium ${isActive ? 'text-amber-400' : 'text-gray-300'}`}>
        {tech.name}
      </span>
    </div>

    {isActive && (
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layoutId="activetech"
      />
    )}
  </motion.div>
);

const MobileStats = () => (
  <div className="grid grid-cols-3 gap-3 mb-6 md:hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
    >
      <div className="text-xl font-bold text-amber-500">5+</div>
      <div className="text-xs text-gray-400">Years</div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
    >
      <div className="text-xl font-bold text-amber-500">50+</div>
      <div className="text-xs text-gray-400">Projects</div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
    >
      <div className="text-xl font-bold text-amber-500">100%</div>
      <div className="text-xs text-gray-400">Delivery</div>
    </motion.div>
  </div>
);

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
        setIsTyping(false);
      }, 200);
    }, 3500);

    const techInterval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % techStack.length);
    }, 2000);

    return () => {
      clearInterval(textInterval);
      clearInterval(techInterval);
    };
  }, []);

  return (
    <div className="min-h-fit relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Neural Network Background */}
      <NeuralNetwork />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-amber-500 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Pulse Waves */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="w-32 h-32 md:w-64 md:h-64 rounded-full border border-amber-500/20" />
        </motion.div>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 min-h-screen lg:min-h-0">

            {/* Main Content - Mobile First */}
            <div className="lg:col-span-3 flex flex-col justify-center">

              {/* Sanskrit Quote - Enhanced for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 md:mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full border border-amber-500/30 backdrop-blur-sm bg-amber-500/5"
                >
                  <span className={`${marathiFont.className} text-sm md:text-base font-mono text-amber-400 tracking-wide`}>
                    || विजिगीषुः न समवेतव्यः ||
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs mt-2 text-gray-400 font-mono"
                >
                  &quot;One who seeks victory should not compromise&quot;
                </motion.p>
              </motion.div>

              {/* Name - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center lg:text-left mb-4 md:mb-6"
              >
                <h1
                  className="font-extrabold tracking-tight leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)' }}
                >
                  <motion.span
                    className="block relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    OMKAR
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl rounded-lg"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>

                  <motion.span
                    className="block text-amber-500 relative mt-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    KULKARNI
                    <motion.div
                      className="absolute bottom-0 left-0 md:left-0 lg:left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </motion.span>
                </h1>
              </motion.div>

              {/* Codename - Mobile Friendly */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center lg:justify-start mb-4 md:mb-6 gap-2"
              >
                <Terminal className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                <span className="font-mono text-base md:text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  CODENAME: @1NDRAJEET
                </span>
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1 h-4 md:h-5 bg-amber-500 rounded-full"
                />
              </motion.div>

              {/* Mobile Stats */}
              <MobileStats />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center lg:text-left mb-6 md:mb-8"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold shadow-lg"
                >
                  <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">ÜBERMACHT IN DEVELOPMENT</span>
                  <span className="sm:hidden">ÜBERMACHT DEV</span>
                  <Brain className="w-3 h-3 md:w-4 md:h-4" />
                </motion.span>
              </motion.div>

              {/* Dynamic Text - Mobile Optimized */}
              <div className="h-16 md:h-20 mb-6 md:mb-8 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: isTyping ? 'blur(2px)' : 'blur(0px)'
                    }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative text-center lg:text-left"
                  >
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-medium px-4 lg:px-0">
                      {dynamicTexts[currentTextIndex]}
                    </p>
                    <motion.div
                      className="absolute -bottom-1 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTAs - Mobile Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 px-4 lg:px-0"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-center text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 group transition-all"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Witness My Triumphs</span>
                  <span className="sm:hidden">View Projects</span>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 text-center border-amber-500 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-black transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
                >
                  <MessageSquareCode className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Request Project</span>
                  <span className="sm:hidden">Contact</span>
                </motion.a>

                <motion.a
                  href="/omkar-cv.pdf"
                  download
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 text-center border-amber-500 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-black transition-all flex items-center justify-center gap-2 group backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
                  <span className="hidden sm:inline">Download CV</span>
                  <span className="sm:hidden">CV</span>
                </motion.a>
              </motion.div>

              {/* Bottom Text - Mobile Friendly */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xs md:text-sm font-mono space-y-2 text-gray-500 text-center lg:text-left px-4 lg:px-0"
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 text-amber-500 flex-shrink-0" />
                  <span>DOMINANZ • ELITESTANDARD • PERFEKTION • <span className="text-amber-500 font-bold">INEVITABLE</span></span>
                </div>
                <div className="italic opacity-75">(Inferior developers need not apply.)</div>
              </motion.div>
            </div>

            {/* Tech Stack Sidebar - Mobile Bottom */}
            <div className="lg:col-span-2 order-last">
              <div className="sticky top-8">
                {/* Tech Stack Header */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 text-center lg:text-left"
                >
                  <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-2 flex items-center justify-center lg:justify-start gap-2">
                    <GitBranch className="w-5 h-5" />
                    Tech Arsenal
                  </h3>
                  <p className="text-sm text-gray-400">Click to explore my weapons of choice</p>
                </motion.div>

                {/* Tech Grid - Responsive */}
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 md:gap-4 mb-8">
                  {techStack.map((tech, index) => (
                    <TechBubble
                      key={tech.name}
                      tech={tech}
                      index={index}
                      isActive={activeTech === index}
                      onClick={() => setActiveTech(index)}
                    />
                  ))}
                </div>

                {/* Active Tech Display */}
                <motion.div
                  className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 backdrop-blur-sm"
                  key={activeTech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-amber-500 text-2xl">
                      {techStack[activeTech].icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{techStack[activeTech].name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-400">Currently mastering</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-amber-500 font-mono">{techStack[activeTech].proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: techStack[activeTech].proficiency+'%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}