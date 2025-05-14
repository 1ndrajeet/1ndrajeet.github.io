"use client";
import { useState, useEffect } from "react";
import { Gotu } from "next/font/google";
import Link from "next/link";
import { Button } from "../ui/button";
import { 
  Code, 
  ChevronDown,
  Shield,
  Medal,
  Target,
  Command,
  Crown,
  Star
} from "lucide-react";

const gotu = Gotu({
  subsets: ["devanagari"],
  weight: "400",
});

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [skillIndex, setSkillIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Combat-ready tech skills
  const eliteSkills = [
    { name: "Next.js", icon: <Command className="w-5 h-5" />, color: "text-blue-500" },
    { name: "TypeScript", icon: <Shield className="w-5 h-5" />, color: "text-cyan-500" },
    { name: "FastAPI", icon: <Target className="w-5 h-5" />, color: "text-purple-400" },
    { name: "Docker", icon: <Medal className="w-5 h-5" />, color: "text-green-500" },
    { name: "MySQL", icon: <Code className="w-5 h-5" />, color: "text-amber-500" },
  ];

  // Handle scroll effects and animation loading
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Dramatic entry sequence
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Auto-cycle through skills
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % eliteSkills.length);
    }, 2500);

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Background mask effect - increases opacity as user scrolls
  const backgroundMaskOpacity = Math.min(0.6, 0.2 + (scrollPosition * 0.001));

  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Dark geometric pattern overlay */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-[0.04] dark:opacity-[0.08] z-0 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-black dark:border-white"></div>
        ))}
      </div>
      
      {/* Dynamic background mask */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 z-0 backdrop-blur-3xl"
        style={{
          opacity: backgroundMaskOpacity,
          transform: `translateY(${scrollPosition * 0.1}px)`,
        }}
      />

      {/* Strategic code pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none z-0">
        <div className="font-mono text-xs text-neutral-900 dark:text-white p-8 transform">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="mb-3 overflow-hidden whitespace-nowrap"
              style={{ 
                animation: `typeIn 4s ${i * 0.4}s forwards`,
                opacity: isLoaded ? 1 : 0,
              }}
            >
              <span className="text-amber-600 dark:text-amber-400">$</span> {getCommandLineText(i)}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 z-10">
        <div className="max-w-6xl mx-auto w-full">
          {/* Tactical header */}
          <div 
            className="mb-6"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? '0' : '20px'})`,
              transition: 'opacity 0.8s, transform 0.8s',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-neutral-400 dark:bg-neutral-600"></div>
              <Crown className="w-6 h-6 text-amber-500 dark:text-amber-400" />
              <div className="h-px w-16 bg-neutral-400 dark:bg-neutral-600"></div>
            </div>
            
            <span className={`${gotu.className} text-sm font-bold block mb-3 text-neutral-700 dark:text-neutral-400 text-center`}>
              || विजिगीषु: न समवेतव्यः ||
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 text-center tracking-tight">
              <div className="relative overflow-hidden">
                <span 
                  className="block"
                  style={{ 
                    clipPath: isLoaded ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                    transition: "clip-path 1.2s cubic-bezier(0.6, 0.2, 0.1, 1)"
                  }}
                >
                  OMKAR <span className="text-amber-500 dark:text-amber-400">KULKARNI</span>
                </span>
              </div>
              <div 
                className="text-lg sm:text-xl md:text-2xl mt-3 tracking-widest"
                style={{ 
                  opacity: isLoaded ? 1 : 0,
                  transform: `translateY(${isLoaded ? '0' : '10px'})`,
                  transition: 'opacity 0.8s 0.4s, transform 0.8s 0.4s',
                }}
              >
                CODENAME: @<Link href="https://github.com/1ndrajeet" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-bold hover:underline">1NDRAJEET</Link>
              </div>
            </h1>
          </div>

          {/* Battle cry */}
          <div 
            className="mb-12 relative"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? '0' : '20px'})`,
              transition: 'opacity 0.8s 0.6s, transform 0.8s 0.6s',
            }}
          >
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-neutral-700 dark:text-neutral-300 text-center">
              <span className="text-amber-500 dark:text-amber-400 font-bold">ÜBERMACHT</span> IN DEVELOPMENT
            </p>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-400 mt-4 text-center">
              Where others falter, I <span className="font-bold underline decoration-amber-500 dark:decoration-amber-400 decoration-2">execute</span>. 
              Delivering systems of unrivaled quality through
              <span className="relative inline-block mx-2">
                <span className={`absolute transition-opacity duration-500 ${skillIndex === 0 ? "opacity-100" : "opacity-0"}`}>
                  <span className={`${eliteSkills[0].color} font-semibold`}>modern architectures</span>
                </span>
                <span className={`absolute transition-opacity duration-500 ${skillIndex === 1 ? "opacity-100" : "opacity-0"}`}>
                  <span className={`${eliteSkills[1].color} font-semibold`}>type-safe code</span>
                </span>
                <span className={`absolute transition-opacity duration-500 ${skillIndex === 2 ? "opacity-100" : "opacity-0"}`}>
                  <span className={`${eliteSkills[2].color} font-semibold`}>optimized APIs</span>
                </span>
                <span className={`absolute transition-opacity duration-500 ${skillIndex === 3 ? "opacity-100" : "opacity-0"}`}>
                  <span className={`${eliteSkills[3].color} font-semibold`}>containerized solutions</span>
                </span>
                <span className={`absolute transition-opacity duration-500 ${skillIndex === 4 ? "opacity-100" : "opacity-0"}`}>
                  <span className={`${eliteSkills[4].color} font-semibold`}>efficient databases</span>
                </span>
                <span className="opacity-0">placeholder text</span>
              </span>
              and <span className="font-bold text-neutral-900 dark:text-white">superior vision</span>.
            </p>
          </div>

          {/* Elite skills */}
          <div 
            className="mb-12 flex justify-center"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? '0' : '20px'})`,
              transition: 'opacity 0.8s 0.8s, transform 0.8s 0.8s',
            }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {eliteSkills.map((skill, index) => (
                <button
                  key={index}
                  className={`px-5 py-2 border-l-2 transition-all duration-300 flex items-center gap-2 text-sm font-bold ${
                    skillIndex === index 
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-amber-500 dark:border-amber-400 scale-110" 
                      : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 dark:hover:border-amber-400"
                  }`}
                  onClick={() => setSkillIndex(index)}
                >
                  {skill.icon}
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? '0' : '20px'})`,
              transition: 'opacity 0.8s 1s, transform 0.8s 1s',
            }}
          >
            <Link href="#projects">
              <Button
                className="px-8 py-6 text-base font-bold bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-black dark:hover:bg-neutral-200 uppercase tracking-wide"
                variant="default"
              >
                <Medal className="w-5 h-5 mr-2" />
                Witness My Triumphs
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                variant="outline"
                className="px-8 py-6 text-base font-bold border-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 uppercase tracking-wide"
              >
                Request a Project
                <Star className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Dominance tagline */}
          <div 
            className="text-center mb-4"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.8s 1.2s',
            }}
          >
            <span className="text-neutral-600 dark:text-neutral-400 text-xs tracking-[0.3em] uppercase font-medium">
              DOMINANZ • ELITESTANDARD • PERFEKTION {`>>>`} INEVITABLE
            </span>
          </div>

          {/* Elite footer */}
          <div 
            className="flex justify-center items-center"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.8s 1.4s',
            }}
          >
            <div className="h-px w-16 bg-neutral-400 dark:bg-neutral-600"></div>
            <span className="text-xs px-4 uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              inferior developers need not apply
            </span>
            <div className="h-px w-16 bg-neutral-400 dark:bg-neutral-600"></div>
          </div>
        </div>
      </div>

      {/* Tactical scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Link href="#about">
          <div 
            className="flex flex-col items-center cursor-pointer group"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.8s 1.6s',
            }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              Enter The Domain
            </span>
            <div 
              className="w-10 h-10 flex items-center justify-center border-2 border-neutral-400 dark:border-neutral-600 group-hover:border-amber-500 dark:group-hover:border-amber-400 transition-colors"
              style={{
                animation: "tacticalPulse 2s infinite"
              }}
            >
              <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
        </Link>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes tacticalPulse {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.7;
          }
        }
        
        @keyframes typeIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Strategic command line text generator
function getCommandLineText(index: number) {
  const commandLines = [
    "git init && yarn create next-app --typescript",
    "docker-compose up -d --build",
    "function eliminate(mediocrity) { return excellence; }",
    "SELECT * FROM developers WHERE standard = 'ELITE'",
    "fastapi deploy --strategy=conquer",
    "const victory = await Promise.all(challenges.map(overcome))",
    "git commit -m 'Refactored for optimal performance'",
    "for (const obstacle of path) { destroy(obstacle); }",
    "npx tailwindcss build -o dominance.css",
    "systemctl start superior-execution.service",
    "const enemies = await scan(); if (enemies) { destroy(); }",
    "export class Übermacht extends Developer { /* ... */ }",
    "mysql> CREATE DATABASE mastery_manifest;",
    "// When they said it was impossible...",
    "import { triumph } from '@1ndrajeet/victory';"
  ];
  
  return commandLines[index % commandLines.length];
}