"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect, ReactNode } from "react";

// Define props interface for AboutMe component
interface AboutMeProps {
    aboutData: AboutDataItem[];
}

type ColorKey = "blue" | "emerald" | "rose" | "amber" | "indigo" | "cyan";

const colorMapping = {
    "blue": {
        "dark": "bg-gradient-to-br from-blue-900/30 to-cyan-900/20",
        "light": "bg-gradient-to-br from-blue-200/50 to-cyan-200/30"
    },
    "emerald": {
        "dark": "bg-gradient-to-br from-emerald-900/30 to-green-900/20",
        "light": "bg-gradient-to-br from-emerald-200/50 to-green-200/30"
    },
    "rose": {
        "dark": "bg-gradient-to-br from-rose-900/30 to-pink-900/20",
        "light": "bg-gradient-to-br from-rose-200/50 to-pink-200/30"
    },
    "amber": {
        "dark": "bg-gradient-to-br from-amber-900/30 to-red-900/20",
        "light": "bg-gradient-to-br from-amber-200/50 to-red-200/30"
    },
    "indigo": {
        "dark": "bg-gradient-to-br from-indigo-900/30 to-purple-900/20",
        "light": "bg-gradient-to-br from-indigo-200/50 to-purple-200/30"
    },
    "cyan": {
        "dark": "bg-gradient-to-br from-cyan-900/30 to-emerald-900/20",
        "light": "bg-gradient-to-br from-cyan-200/50 to-emerald-200/30"
    },
}

interface ParticleProps {
    id: number;
    size: number;
    x: number;
    y: number;
    opacity: number;
    duration: number;
}

interface AboutDataItem {
    title: string;
    description: ReactNode;
    image?: string;
    alt?: string;
    bgColor: {
        dark: string;
        light: string;
    };
    category: string;
    accent: string;
    icon: string;
    quote?: string;
    quoteNote?: string;
}

export default function AboutMe({ aboutData }: AboutMeProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

    // Particle generation for background
    const generateParticles = (count: number): ParticleProps[] => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.1,
            duration: Math.random() * 15 + 20
        }));
    };

    const particles = generateParticles(40);

    const renderContent = (item: AboutDataItem, index: number) => {
        if (item.image) {
            return (
                <motion.div
                    className="h-full w-full flex items-center justify-center rounded-2xl overflow-hidden relative group"
                    whileHover={{ scale: 1.03, transition: { duration: 0.4 } }}
                    initial={{ opacity: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-6 z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <span className="text-white text-sm font-medium px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
                            {item.icon} {item.category}
                        </span>
                    </motion.div>
                    {/* Only show image on lg screens and above */}
                    <div className="relative w-full h-full hidden md:block min-h-[400px]">
                        <Image
                            src={item.image}
                            alt={item.alt || ""}
                            fill
                            className="object-scale-down opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            priority
                            onError={() => console.error(`Failed to load image: ${item.image}`)}
                        />
                    </div>
                    {/* Show a colored background on mobile */}
                    <div className={`lg:hidden absolute inset-0 ${colorMapping[item.accent as ColorKey]?.light || ''} dark:${colorMapping[item.accent as ColorKey]?.dark || ''} flex items-center justify-center text-4xl`}>
                        {item.icon}
                    </div>
                </motion.div>
            );
        }
        return (
            <>
                <motion.div
                    className="relative z-10 text-center  hidden  md:flex flex-col items-center justify-center w-full h-full max-w-2xl p-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`w-20 h-20 flex items-center justify-center text-3xl rounded-full mb-6 ${getAccentColor(item.accent)}`}>
                        {item.icon}
                    </div>
                    <blockquote className="italic text-lg md:text-xl font-light leading-relaxed text-neutral-800 dark:text-neutral-100">
                        &quot;{item.quote}&quot;
                        <span className="block mt-6 text-xs not-italic font-normal text-neutral-600 dark:text-neutral-300">
                            {item.quoteNote}
                        </span>
                    </blockquote>

                </motion.div>
                <div className={`lg:hidden absolute inset-0 ${colorMapping[item.accent as ColorKey]?.light || ''} dark:${colorMapping[item.accent as ColorKey]?.dark || ''} flex items-center justify-center text-4xl`}>
                    {item.icon}
                </div>
            </>
        );
    };

    // Helper function for accent colors
    const getAccentColor = (accent: string) => {
        const colors = {
            violet: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/20 dark:text-violet-300",
            cyan: "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-300",
            amber: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-300",
            emerald: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-300",
            indigo: "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-300"
        };
        return colors[accent as keyof typeof colors] || colors.violet;
    };

    const content = aboutData.map((item, index) => ({
        title: item.title,
        description: (<div className="text-justify">{item.description}</div>),
        content: renderContent(item, index) as ReactNode,
    }));

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen pt-10 w-full flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950"
            style={{ height: `${Math.max(windowHeight, 800)}px` }}
        >
            {/* Transition element from Hero section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-neutral-100/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/80 dark:to-transparent z-10 pointer-events-none"
            />

            {/* Animated particles - slightly fewer than original for better performance */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={cn(
                            "absolute rounded-full dark:bg-white bg-neutral-800"
                        )}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            opacity: particle.opacity,
                        }}
                        animate={{
                            y: ["0%", "100%"],
                            opacity: [particle.opacity, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: -particle.duration * Math.random(),
                        }}
                    />
                ))}
            </div>

            {/* Animated background elements */}
            <motion.div
                style={{ y, opacity: backgroundOpacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className={cn(
                    "absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl",
                    "bg-violet-200/30 dark:bg-violet-900/20"
                )} />
                <div className={cn(
                    "absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl",
                    "bg-cyan-200/30 dark:bg-cyan-900/20"
                )} />
                {/* Added amber blur to match Hero's amber accents */}
                <div className={cn(
                    "absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl",
                    "bg-amber-200/30 dark:bg-amber-900/20"
                )} />
            </motion.div>

            {/* Grid pattern */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                <div className={cn(
                    "absolute inset-0",
                    "[background:radial-gradient(circle_at_center,_#4f46e520_0%,transparent_70%)] dark:[background:radial-gradient(circle_at_center,_#4f46e510_0%,transparent_70%)]"
                )} />
                <div className={cn(
                    "absolute inset-0 bg-center [mask-image:linear-gradient(180deg,transparent_10%,rgba(0,0,0,0.5)_80%)]",
                    "opacity-15 dark:opacity-10"
                )} />
            </div>

            {/* Geometric decorations - simplified */}
            <div className="absolute top-10 right-10 w-20 h-20 border-4 border-amber-500/20 rounded-full hidden md:block"></div>
            <div className="absolute bottom-20 left-10 w-10 h-10 border-2 border-amber-500/30 rounded-md rotate-45 hidden md:block"></div>

            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full"
                >
                    <div className="text-center mb-8">
                        <motion.div className="inline-flex items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className={cn(
                                    "inline-block px-3 py-1 text-xs font-medium rounded-full mb-4",
                                    "bg-amber-200/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
                                )}
                            >
                                <span className="flex items-center gap-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    About Me
                                </span>
                            </motion.span>
                        </motion.div>

                        <h2 className={cn(
                            "text-4xl md:text-6xl font-bold text-center tracking-tight",
                            "text-neutral-800 dark:text-white"
                        )}>
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Journey</span>
                        </h2>

                        <div className="flex items-center justify-center mt-6">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="mx-3 text-neutral-400 dark:text-neutral-500"
                            >
                                •
                            </motion.div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-500"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="max-w-2xl mx-auto mt-6 text-neutral-600 dark:text-neutral-400 text-sm md:text-base"
                        >
                            Crafting digital experiences that blend innovation with functionality
                        </motion.p>
                    </div>

                    <div className="h-[80vh]">
                        <StickyScroll
                            content={content}
                            contentClassName="flex items-center text-justify justify-center"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}