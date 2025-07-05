"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SparklesCore } from "../ui/sparkles";
import { Award, ImageOff } from "lucide-react";

// Define certificate interface
interface Certificate {
  _id: string;
  title: string;
  organization: string;
  image: string;
  alt: string;
}


export default function CertificationsSection({ certificates }: { certificates: Certificate[] }) {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Handle image loading error
  const handleImageError = (certId: string) => {
    setImageError((prev) => ({ ...prev, [certId]: true }));
  };

  return (
    <section className="relative w-full py-12 overflow-hidden dark:bg-black">
      {/* Background Sparkles */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="certifications-section-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="hsl(var(--foreground))"
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 bg-amber-200/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
          >
            Achievements
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-800 dark:text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Certifications</span>
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
        </motion.div>

        {/* Simple Grid Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-xl overflow-hidden group bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:shadow-amber-500/20"
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title}`}
            >
              <div className="relative h-48">
                {imageError[cert._id] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageOff size={32} className="mb-2" />
                      <span className="text-xs">{cert.alt || ""}</span>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={cert.image}
                    alt={cert.alt || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => handleImageError(cert._id)}
                    priority={true}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-90 transition-opacity" />
                <Award className="absolute top-3 right-3 w-6 h-6 text-amber-400" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-card-foreground">{cert.title}</h4>
                <p className="text-sm text-muted-foreground">{cert.organization}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 bg-amber-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/certifications"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            View All Certifications
          </Link>
        </motion.div>
      </div>
    </section>
  );
}