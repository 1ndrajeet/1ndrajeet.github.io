"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronRight, Star, Menu, X } from "lucide-react";

interface AboutDataItem {
    title: string;
    description: ReactNode;
    image?: string;
    alt?: string;
    category: string;
    accent: string;
    icon: string;
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
        bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600", glow: "shadow-blue-500/25"
    },
    emerald: {
        gradient: "from-emerald-500 via-green-600 to-teal-600",
        bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600", glow: "shadow-emerald-500/25"
    },
    purple: {
        gradient: "from-purple-500 via-violet-600 to-indigo-600",
        bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-600", glow: "shadow-purple-500/25"
    },
    amber: {
        gradient: "from-amber-500 via-orange-500 to-red-500",
        bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-600", glow: "shadow-amber-500/25"
    }
} as const;

export default function AboutMe({ aboutData }: AboutMeProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % aboutData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [aboutData.length]);


    const getAccentColors = (accent: string) =>
        ACCENT_COLORS[accent as keyof typeof ACCENT_COLORS] || ACCENT_COLORS.blue;

    const currentColors = getAccentColors(aboutData[activeIndex].accent);
    const currentItem = aboutData[activeIndex];

    const NavigationButton = ({ item, index, isActive }: { item: AboutDataItem; index: number; isActive: boolean }) => {
        const colors = getAccentColors(item.accent);
        return (
            <button
                onClick={() => {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 ${isActive
                    ? `bg-white dark:bg-slate-800 shadow-md border-l-4 ${colors.border.replace('/20', '')}`
                    : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-l-4 border-transparent'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive
                        ? `bg-gradient-to-br ${colors.gradient} text-white`
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        } transition-all duration-300`}>
                        {(item.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm sm:text-base ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                            }`}>
                            {item.category}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                            {item.title}
                        </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? `${colors.text}` : 'text-slate-400'
                        }`} />
                </div>
            </button>
        );
    };

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen dark:bg-black overflow-hidden"
        >
            {/* Simplified background elements */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-600/20 blur-3xl" />
            </motion.div>

            <motion.div
                style={{ opacity: contentOpacity }}
                className="relative z-10 container mx-auto px-4 py-12 max-w-7xl"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">About Me</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Journey</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Crafting digital experiences that blend innovation with functionality, one project at a time.
                    </p>
                </div>

                {/* Mobile menu toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-full flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-white/20 dark:border-slate-700/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${currentColors.gradient} text-white`}>
                                {(currentItem.icon)}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-white">{currentItem.category}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{currentItem.title}</div>
                            </div>
                        </div>
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Main content */}
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Navigation */}
                    <div className={`lg:col-span-4 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'} space-y-3`}>
                        {aboutData.map((item, index) => (
                            <NavigationButton
                                key={index}
                                item={item}
                                index={index}
                                isActive={activeIndex === index}
                            />
                        ))}
                    </div>

                    {/* Content area */}
                    <div className="lg:col-span-8">
                        <div
                            key={activeIndex}
                            className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 shadow-md border border-white/20 dark:border-slate-700/50"
                        >
                            {/* Content header */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${currentColors.gradient} text-white`}>
                                            {(currentItem.icon)}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentColors.bg} ${currentColors.text} border ${currentColors.border}`}>
                                            {currentItem.category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                        {currentItem.title}
                                    </h2>
                                </div>
                                {currentItem.image && (
                                    <div className="relative w-24 h-24 mx-auto sm:mx-0">
                                        <img
                                            src={currentItem.image}
                                            alt={currentItem.alt}
                                            className="w-full h-full object-cover rounded-xl border-2 border-white dark:border-slate-700"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-slate-600 dark:text-slate-300 text-base">
                                    {currentItem.description}
                                </p>
                            </div>

                            {/* Stats */}
                            {currentItem.stats && (
                                <div className="grid grid-cols-3 gap-3">
                                    {currentItem.stats.map((stat, idx) => (
                                        <div
                                            key={idx}
                                            className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                                        >
                                            <div className={`text-xl font-bold ${currentColors.text}`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Progress indicators */}
                        <div className="flex justify-center mt-6 gap-2">
                            {aboutData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                        ? `w-6 bg-gradient-to-r ${currentColors.gradient}`
                                        : 'w-2 bg-slate-300 dark:bg-slate-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}