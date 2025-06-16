"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "../ui/sparkles";
import { Wand2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

// Social links data with fixed color handling

interface ContactData {
    name: string;
    email: string;
    message: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: React.ElementType;
    hoverBg: string;
    hoverBorder: string;
    darkHoverBg: string;
    gradientFrom: string;
    darkGradientFrom: string;
}



export default function ContactMe({ socialLinks }: { socialLinks: SocialLink[] }) {
    const [formData, setFormData] = useState<ContactData>({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const magicWords = [
        "Abracadabra!",
        "Alakazam!",
        "Hocus Pocus!",
        "Bibbidi-Bobbidi-Boo!",
        "Shazam!"
    ];
    const [currentMagicWord, setCurrentMagicWord] = useState(0);

    const { theme } = useTheme();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Your name is missing! I'm not psychic... yet.";
        if (!formData.email.trim()) return "Email required. Carrier pigeons are unreliable these days.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            return "That email looks suspicious. Are you a robot? Beep boop?";
        if (!formData.message.trim()) return "Message field empty! Don't be shy, I don't bite... much.";
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");
        setCurrentMagicWord((prev) => (prev + 1) % magicWords.length);

        const validationError = validateForm();
        if (validationError) {
            setStatus("error");
            setErrorMessage(validationError);
            return;
        }

        try {
            // Pretend we're casting a spell
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await fetch("https://formspree.io/f/xrbpjrvn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                throw new Error("Form submission failed.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("The internet gremlins ate your message! Try again?");
        }
    };

    return (
        <section
            className={cn(
                "relative w-full py-12 overflow-hidden "
            )}
        >
            {/* Background Sparkles */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <SparklesCore
                    id="contact-sparkles"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.4}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor={theme === "dark" ? "#fbbf24" : "#f59e0b"}

                    speed={0.8}
                />
            </div>

            <div className="container mx-auto px-4 max-w-lg">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="text-center mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 bg-primary/10 text-primary"
                        >
                            1ndrajeet  
                        </motion.span>
                        <h2 className="text-4xl md:text-7xl font-bold text-center tracking-tight text-foreground">
                            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Me</span>
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

                    </div>
                    <p
                        className={cn(
                            "text-sm max-w-xs mx-auto dark:text-neutral-400 text-neutral-600"
                        )}
                    >
                        Warning: Responding to this form may result in terrible jokes and occasional brilliance.
                    </p>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="flex justify-center gap-6 mb-10"
                >
                    {socialLinks.map((social, index) => (
                        <motion.div
                            key={social.name}
                            whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? [0, -10, 10, -5, 0] : [0, 10, -10, 5, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className={`rounded-full border-2 shadow-lg transition-all duration-300 group relative overflow-hidden hover:bg-${social.name.toLowerCase()} hover:border-${social.name.toLowerCase()}`}
                                style={{
                                    "--hover-bg": social.hoverBg,
                                    "--hover-border": social.hoverBorder,
                                    "--dark-hover-bg": social.darkHoverBg,
                                    "--gradient-from": social.gradientFrom,
                                    "--dark-gradient-from": social.darkGradientFrom,
                                    "--gradient-to": social.gradientFrom,
                                    "--dark-gradient-to": social.darkGradientFrom
                                } as React.CSSProperties}
                                asChild
                            >
                                <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                    <span
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                                        style={{
                                            backgroundColor: social.hoverBg,
                                        }}
                                    />
                                    <social.icon className="h-5 w-5 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 transition-all duration-300 z-10 relative" />
                                    <span className="absolute -bottom-10 left-0 w-full text-[10px] font-bold text-center opacity-0 group-hover:opacity-100 group-hover:-bottom-6 transition-all duration-300 dark:text-white">{social.name.toUpperCase()}</span>
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className={cn(
                        "p-6 rounded-xl border dark:bg-neutral-800/70 dark:border-neutral-700 bg-white/70 border-neutral-200",
                        "space-y-5"
                    )}
                >
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className={cn(
                                "block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-700"
                            )}
                        >
                            Your Superhero Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={cn(
                                "w-full px-4 py-2 text-sm rounded-md border outline-none transition-colors dark:bg-neutral-900 dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-amber-500 bg-white border-neutral-300 text-neutral-800 focus:border-amber-500"
                            )}
                            placeholder="Bruce Wayne (I'll keep your secret)"
                            disabled={status === "loading"}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className={cn(
                                "block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-700"
                            )}
                        >
                            Email (No Spam, Just Jam)
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={cn(
                                "w-full px-4 py-2 text-sm rounded-md border outline-none transition-colors dark:bg-neutral-900 dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-amber-500 bg-white border-neutral-300 text-neutral-800 focus:border-amber-500"
                            )}
                            placeholder="totally.not.batman@wayne.com"
                            disabled={status === "loading"}
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label
                            htmlFor="message"
                            className={cn(
                                "block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-700"
                            )}
                        >
                            Your Brilliant Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className={cn(
                                "w-full px-4 py-2 text-sm rounded-md border outline-none transition-colors resize-none dark:bg-neutral-900 dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-amber-500 bg-white border-neutral-300 text-neutral-800 focus:border-amber-500"
                            )}
                            placeholder="Tell me your wildest tech dreams (or your coffee order, I'm flexible)"
                            disabled={status === "loading"}
                        />
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-center text-green-500"
                        >
                            Message received! I&apos;ll respond faster than a caffeinated squirrel! 🐿️
                        </motion.p>
                    )}
                    {status === "error" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-center text-red-500"
                        >
                            {errorMessage}
                        </motion.p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "w-full py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700 bg-amber-500 text-white hover:bg-amber-600",
                            status === "loading" && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {status === "loading" ? (
                            <>
                                <Wand2 className="h-4 w-4 animate-bounce" />
                                {magicWords[currentMagicWord]}
                            </>
                        ) : (
                            "Send Magical Message"
                        )}
                    </motion.button>

                    <div className="text-xs text-center text-neutral-500 dark:text-neutral-400 mt-3">
                        * No developers were harmed in the making of this form
                    </div>
                </motion.form>
            </div>
        </section>
    );
}