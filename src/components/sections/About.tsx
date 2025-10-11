"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import Tilt from "react-parallax-tilt";

interface AboutDataItem {
    title: string;
    description: React.ReactNode;
    image?: string;
    alt?: string;
    category: string;
    accent: string;
    icon: React.ReactNode;
    stats?: {
        label: string;
        value: string;
    }[];
}

interface AboutMeProps {
    aboutData: AboutDataItem[];
}

const ACCENT_COLORS = {
    blue: {
        gradient: "from-blue-500 via-blue-600 to-indigo-600",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        glow: "shadow-blue-500/40"
    },
    emerald: {
        gradient: "from-emerald-500 via-green-600 to-teal-600",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        glow: "shadow-emerald-500/40"
    },
    purple: {
        gradient: "from-purple-500 via-violet-600 to-indigo-600",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        glow: "shadow-purple-500/40"
    },
    amber: {
        gradient: "from-amber-500 via-orange-500 to-red-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
        glow: "shadow-amber-500/40"
    }
} as const;

export default function AboutMe({ aboutData }: AboutMeProps) {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const getAccentColors = (accent: string) =>
        ACCENT_COLORS[accent as keyof typeof ACCENT_COLORS] || ACCENT_COLORS.blue;

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen dark:bg-black overflow-hidden py-12"
        >
            {/* Background elements */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-600/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-amber-500/20 to-red-600/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </motion.div>

            <motion.div
                style={{ opacity: contentOpacity }}
                className="relative z-10 container mx-auto px-4 max-w-7xl"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 backdrop-blur-sm mb-4">
                        <Star className="w-5 h-5 text-amber-400" />
                        <span className="text-base font-medium text-slate-200 dark:text-slate-200">About Me</span>
                    </div>
                    <h1 className="text-5xl font-bold text-white dark:text-white mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Journey</span>
                    </h1>
                    <p className="text-lg text-slate-300 dark:text-slate-300 max-w-2xl mx-auto">
                        Crafting digital experiences that blend innovation with a touch of magic, one project at a time.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {aboutData.map((item, index) => {
                        const colors = getAccentColors(item.accent);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="break-inside-avoid"
                            >
                                <Tilt
                                    tiltMaxAngleX={15}
                                    tiltMaxAngleY={15}
                                    scale={1.05}
                                    transitionSpeed={400}
                                    className="rounded-2xl overflow-hidden"
                                >
                                    <div
                                        className={`relative bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border ${colors.border} p-6 hover:${colors.glow} transition-all duration-300`}
                                    >
                                        {/* Card Header */}
                                        <div className="flex flex-col gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
                                                    {item.icon}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                                                    {item.category}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-white dark:text-white">
                                                {item.title}
                                            </h2>
                                        </div>

                                        {/* Image */}
                                        {item.image && (
                                            <div className="relative w-full h-32 mb-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.alt || "About Image"}
                                                    className="w-full h-full object-cover rounded-lg border border-white/20 dark:border-slate-700/20"
                                                />
                                            </div>
                                        )}

                                        {/* Description */}
                                        <div className="mb-4">
                                            <p className="text-slate-200 dark:text-slate-200 text-sm">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        {item.stats && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {item.stats.map((stat, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="text-center p-2 rounded-lg bg-white/5 dark:bg-slate-900/5 border border-white/10 dark:border-slate-700/10"
                                                    >
                                                        <div className={`text-lg font-bold ${colors.text}`}>
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-xs text-slate-300 dark:text-slate-300 mt-1">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Tilt>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}