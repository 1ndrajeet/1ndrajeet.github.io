"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SparklesCore } from "../ui/sparkles";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageOff } from "lucide-react";

// Types
type AccentColor = "blue" | "emerald" | "rose" | "amber" | "purple";
type ColorType = "bg" | "text" | "bgLight" | "bgDark" | "border" | "hover" | "shadow";

interface Project {
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  alt: string;
  link: string;
  tech: string[];
  accentColor: AccentColor;
  icon: string;
}

interface ProjectDataProps {
  projectData: Project[];
}

// Constants
const FILTER_TABS = [
  { label: "All", value: "All" },
  { label: "AI", value: "AI" },
  { label: "Web", value: "Web" },
  { label: "Mobile", value: "Android" },
  { label: "Cross-Platform", value: "Cross-Platform" },
  { label: "Cloud", value: "Cloud" },
];

// Color mappings for different accent colors and types
const COLOR_MAPPINGS = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    bgLight: "bg-blue-100",
    bgDark: "bg-blue-900/30",
    border: "border-blue-500",
    hover: "hover:bg-blue-600",
    shadow: "shadow-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    bgLight: "bg-emerald-100",
    bgDark: "bg-emerald-900/30",
    border: "border-emerald-500",
    hover: "hover:bg-emerald-600",
    shadow: "shadow-emerald-500/20",
  },
  rose: {
    bg: "bg-rose-500",
    text: "text-rose-500",
    bgLight: "bg-rose-100",
    bgDark: "bg-rose-900/30",
    border: "border-rose-500",
    hover: "hover:bg-rose-600",
    shadow: "shadow-rose-500/20",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    bgLight: "bg-amber-100",
    bgDark: "bg-amber-900/30",
    border: "border-amber-500",
    hover: "hover:bg-amber-600",
    shadow: "shadow-amber-500/20",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-500",
    bgLight: "bg-purple-100",
    bgDark: "bg-purple-900/30",
    border: "border-purple-500",
    hover: "hover:bg-purple-600",
    shadow: "shadow-purple-500/20",
  },
};

// Utility functions
const getColorClass = (color: AccentColor, type: ColorType): string => {
  return COLOR_MAPPINGS[color]?.[type] || COLOR_MAPPINGS.blue[type];
};

const groupProjectsByCategory = (projects: Project[]): Record<string, Project[]> => {
  return projects.reduce((acc: Record<string, Project[]>, project: Project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);
    return acc;
  }, {});
};

// Component for project card
const ProjectCard = ({
  project,
  index,
  catIndex,
  imageError,
  onImageError
}: {
  project: Project;
  index: number;
  catIndex: number;
  imageError: Record<string, boolean>;
  onImageError: (projectTitle: string) => void;
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ delay: catIndex * 0.1 + index * 0.05 }}
      className={cn(
        "relative rounded-xl overflow-hidden group",
        "bg-card",
        "border border-border",
        "shadow-md hover:shadow-lg transition-all duration-300",
        getColorClass(project.accentColor, "shadow")
      )}
    >
      <Link href={project.link} className="block">
        <div className="relative h-40 overflow-hidden">
          {imageError[project.title] ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageOff size={32} className="mb-2" />
                <span className="text-xs">{project.alt}</span>
              </div>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => onImageError(project.title)}
              priority={index < 3}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-90 transition-opacity" />
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getColorClass(project.accentColor, "bg")} text-white`}
          >
            {project.type}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{project.icon}</span>
            <h4 className="text-lg font-semibold text-card-foreground">
              {project.title}
            </h4>
          </div>

          <p className="text-sm line-clamp-2 mb-4 h-10 text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  theme === "dark"
                    ? getColorClass(project.accentColor, "bgDark")
                    : getColorClass(project.accentColor, "bgLight"),
                  getColorClass(project.accentColor, "text")
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full",
            getColorClass(project.accentColor, "bg"),
            "transition-all duration-300"
          )}
        />
      </Link>
    </motion.div>
  );
};

// Component for project category section
const ProjectCategorySection = ({
  category,
  projects,
  catIndex,
  imageError,
  onImageError
}: {
  category: string;
  projects: Project[];
  catIndex: number;
  imageError: Record<string, boolean>;
  onImageError: (projectTitle: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: catIndex * 0.1 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-5 text-center text-foreground inline-block relative left-1/2 transform -translate-x-1/2">
        <span className="mb-2 relative px-2">
          {category}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-l from-amber-400 via-amber-500 to-amber-600 rounded-full"></span>
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            catIndex={catIndex}
            imageError={imageError}
            onImageError={onImageError}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Component for section header
const SectionHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
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

        <h2 className={cn(
          "text-4xl md:text-6xl font-bold text-center tracking-tight",
          "text-neutral-800 dark:text-white"
        )}>
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Projects</span>
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

      <div className="text-center mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          Explore my projects across industry, freelance, and practice projects.
        </p>
      </div>
    </motion.div>
  );
};

// Component for filter tabs
const FilterTabs = ({ filter, setFilter }: { filter: string; setFilter: (value: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center justify-center mb-8"
    >
      <Tabs value={filter} onValueChange={setFilter} className="max-w-2xl">
        <TabsList className="bg-background/80 rounded-full p-1 shadow-md backdrop-blur-sm">
          {FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs px-4 py-2 rounded-full transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

// Empty state component
const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="bg-muted p-6 rounded-full mb-4">
        <ImageOff size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No projects found
      </h3>
      <p className="text-sm text-muted-foreground max-w-md">
        There are no projects that match your current filter. Try selecting a different category.
      </p>
    </motion.div>
  );
};

// CTA component
const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center mt-12"
    >
      <Link
        href="#contact"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
      >
        Collaborate Now
      </Link>
    </motion.div>
  );
};

// Main Projects component
export default function Projects({ projectData }: ProjectDataProps) {
  const [filter, setFilter] = useState("All");
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Handle image loading error
  const handleImageError = (projectTitle: string): void => {
    setImageError(prev => ({
      ...prev,
      [projectTitle]: true
    }));
  };

  // Filter projects
  const filteredProjects = filter === "All"
    ? projectData
    : projectData.filter((project) => project.type === filter);

  // Group filtered projects by category
  const groupedProjects = groupProjectsByCategory(filteredProjects);

  return (
    <section className="relative w-full py-12 overflow-hidden bg-background">
      {/* Background Sparkles */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <SparklesCore
          id="projects-sparkles"
          background="transparent"
          minSize={0.8}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="hsl(var(--foreground))"
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <SectionHeader />

        {/* Filter Tabs */}
        <FilterTabs filter={filter} setFilter={setFilter} />
      </div>

      {/* Projects by Category */}
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        {Object.entries(groupedProjects).length > 0 ? (
          Object.entries(groupedProjects).map(([category, projects], catIndex) => (
            <ProjectCategorySection
              key={category}
              category={category}
              projects={projects}
              catIndex={catIndex}
              imageError={imageError}
              onImageError={handleImageError}
            />
          ))
        ) : (
          <EmptyState />
        )}

        {/* CTA */}
        <CallToAction />
      </div>
    </section>
  );
}