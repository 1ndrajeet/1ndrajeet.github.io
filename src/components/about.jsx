"use client";

import { motion } from "framer-motion";
import Image from 'next/image'; // Import Image from next/image

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Text Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-100 tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="text-gray-400 md:text-xl">
              Hi, I&apos;m Omkar Kulkarni. I&apos;m currently studying{" "}
              <span className="text-emerald-400">
                Diploma in Computer Engineering 🎓
              </span>{" "}
              from Rajarambapu Institute of Technology. I am passionate about
              <span className="text-emerald-400"> CyberSecurity</span> 🔒 and
              MERN stack development 💻. In addition to my technical skills, I
              have a strong interest in{" "}
              <span className="text-emerald-400">Chess ♟️</span>.
            </p>
            <p className="text-gray-400 md:text-xl">
              I&apos;m a strong believer in <br />
              <span className="text-emerald-400">
                &quot;घटं भिन्द्यात् पटं छिन्द्यात् कुर्याद्रासभरोहणम् |<br /> येन
                केन प्रकारेण प्रसिद्ध: पुरुषो भवेत् ||&quot;
              </span>
              .
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center items-center md:justify-end mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md">
              <Image
                src="/0mk4r.jpg" // Replace with your image path
                alt="Omkar Kulkarni"
                className="w-full h-auto aspect-square object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                width={500} // Provide width for optimization
                height={500} // Provide height for optimization
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
