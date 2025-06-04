"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Code, Target, Heart, Lightbulb, Trophy, Rocket, PawPrint, ChevronRight, Star } from "lucide-react";

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



export default function AboutMe({ aboutData }: AboutMeProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % aboutData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [aboutData.length]);

    const getIconComponent = (iconName: string) => {
        const icons = {
            "💻": <Code className="w-5 h-5" />,
            "🎯": <Target className="w-5 h-5" />,
            "❤️": <Heart className="w-5 h-5" />,
            "💡": <Lightbulb className="w-5 h-5" />,
            "🏆": <Trophy className="w-5 h-5" />,
            "🚀": <Rocket className="w-5 h-5" />,
            "♟️": <PawPrint className="w-5 h-5" />
        };
        return icons[iconName as keyof typeof icons] || <Code className="w-5 h-5" />;
    };

    const getAccentColors = (accent: string) => {
        const colors = {
            blue: {
                gradient: "from-blue-500 via-blue-600 to-indigo-600",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                text: "text-blue-600",
                glow: "shadow-blue-500/25"
            },
            emerald: {
                gradient: "from-emerald-500 via-green-600 to-teal-600",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
                text: "text-emerald-600",
                glow: "shadow-emerald-500/25"
            },
            purple: {
                gradient: "from-purple-500 via-violet-600 to-indigo-600",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                text: "text-purple-600",
                glow: "shadow-purple-500/25"
            },
            amber: {
                gradient: "from-amber-500 via-orange-500 to-red-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
                text: "text-amber-600",
                glow: "shadow-amber-500/25"
            }
        };
        return colors[accent as keyof typeof colors] || colors.blue;
    };

    const currentColors = getAccentColors(aboutData[activeIndex].accent);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden"
        >
            {/* Animated background elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-600/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-600/10 blur-3xl" />
            </motion.div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,_theme(colors.slate.200/0.3)_1px,_transparent_1px),linear-gradient(to_bottom,_theme(colors.slate.200/0.3)_1px,_transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,_theme(colors.slate.800/0.3)_1px,_transparent_1px),linear-gradient(to_bottom,_theme(colors.slate.800/0.3)_1px,_transparent_1px)]" />

            <motion.div
                style={{ opacity: contentOpacity }}
                className="relative z-10 container mx-auto px-6 py-20 max-w-7xl"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg mb-6"
                    >
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">About Me</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
                    >
                        My{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                            Journey
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Crafting digital experiences that blend innovation with functionality,
                        one project at a time.
                    </motion.p>
                </motion.div>

                {/* Main content */}
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left sidebar - Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6"
                        >
                            Areas of Expertise
                        </motion.h3>

                        {aboutData.map((item, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${activeIndex === index
                                        ? `bg-white dark:bg-slate-800 shadow-xl border-l-4 ${getAccentColors(item.accent).border.replace('/20', '')} ${getAccentColors(item.accent).glow} shadow-2xl`
                                        : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg border-l-4 border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${activeIndex === index
                                            ? `bg-gradient-to-br ${getAccentColors(item.accent).gradient} text-white`
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                        } transition-all duration-300`}>
                                        {getIconComponent(item.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold ${activeIndex === index
                                                ? 'text-slate-900 dark:text-white'
                                                : 'text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {item.category}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                            {item.title}
                                        </p>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index
                                            ? `${getAccentColors(item.accent).text} rotate-90`
                                            : 'text-slate-400 group-hover:translate-x-1'
                                        }`} />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right content area */}
                    <div className="lg:col-span-8">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50"
                        >
                            {/* Content header */}
                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                                <div className="flex-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="flex items-center gap-3 mb-3"
                                    >
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${currentColors.gradient} text-white shadow-lg`}>
                                            {getIconComponent(aboutData[activeIndex].icon)}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentColors.bg} ${currentColors.text} border ${currentColors.border}`}>
                                            {aboutData[activeIndex].category}
                                        </span>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                                    >
                                        {aboutData[activeIndex].title}
                                    </motion.h2>
                                </div>

                                {/* Image */}
                                {aboutData[activeIndex].image && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0"
                                    >
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentColors.gradient} opacity-20 blur-xl`} />
                                        <img
                                            src={aboutData[activeIndex].image}
                                            alt={aboutData[activeIndex].alt}
                                            className="relative w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white dark:border-slate-700"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-8"
                            >
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                                    {aboutData[activeIndex].description}
                                </p>
                            </motion.div>

                            {/* Stats */}
                            {aboutData[activeIndex].stats && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="grid grid-cols-3 gap-4"
                                >
                                    {aboutData[activeIndex].stats!.map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                            className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                                        >
                                            <div className={`text-2xl font-bold ${currentColors.text}`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Progress indicators */}
                        <div className="flex justify-center mt-8 gap-2">
                            {aboutData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                                            ? `w-8 bg-gradient-to-r ${currentColors.gradient}`
                                            : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
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