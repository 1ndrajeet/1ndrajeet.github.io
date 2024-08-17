"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import data from "../app/data.json"; // Adjust the path to your JSON file

export function Projects() {
  // Access the projects array from the JSON data
  const projects = data.projects || []; // Fallback to empty array if data.projects is undefined

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
      <div className="max-w-8xl m-auto container px-4 md:px-6">
        <div className="space-y-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-100 tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            My Projects 🛠️
          </motion.h2>
          <motion.p
            className="text-gray-400 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Check out some of my super cool projects! Each one showcases my skills.
          </motion.p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-gray-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {project.description}
                </motion.p>
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      project.status === "Active"
                        ? "bg-green-500 text-gray-900"
                        : "bg-yellow-500 text-gray-900"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                {project.status === "Active" && project.link && (
                  <div className="mt-6 flex justify-end">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Link
                        href={project.link}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        prefetch={false}
                      >
                        View Project 🔗
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
