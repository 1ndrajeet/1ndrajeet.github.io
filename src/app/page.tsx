"use client";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import React, { JSX, ReactNode, useEffect, useState } from "react";
import Contact from "@/components/sections/Contact";
import { Github, Linkedin, Twitter, IndianRupee } from "lucide-react";
import { LoaderLandingPage } from "@/components/misc/loaders";
import CertificationsSection from "@/components/sections/Certification";

// Interface for AboutDataItem
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

// Interface for Project
interface Project {
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  alt: string;
  link: string;
  tech: string[];
  accentColor: "blue" | "emerald" | "rose" | "amber" | "purple";
  icon: string;
}

// Interface for SocialLink
interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  hoverBg: string;
  hoverBorder: string;
  darkHoverBg: string;
  gradientFrom: string;
  darkGradientFrom: string;
}

// Social links array
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/1ndrajeet",
    hoverBg: "#171515",
    hoverBorder: "#171515",
    darkHoverBg: "#171515",
    gradientFrom: "#171515",
    darkGradientFrom: "#e7e5e5",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/1ndrajeet",
    hoverBg: "#0A66C2",
    hoverBorder: "#0A66C2",
    darkHoverBg: "#0A66C2",
    gradientFrom: "#0A66C2",
    darkGradientFrom: "#0A66C2",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/1ndrajee7",
    hoverBg: "#1DA1F2",
    hoverBorder: "#1DA1F2",
    darkHoverBg: "#1DA1F2",
    gradientFrom: "#1DA1F2",
    darkGradientFrom: "#1DA1F2",
  },
  {
    name: "Support",
    icon: IndianRupee,
    url: "https://razorpay.me/@1ndrajeet",
    hoverBg: "#69e22d",
    hoverBorder: "#69e22d",
    darkHoverBg: "#69e22d",
    gradientFrom: "#69e22d",
    darkGradientFrom: "#69e22d",
  },
];

// Define certificate interface
interface Certificate {
  id: string;
  title: string;
  organization: string;
  image: string;
  alt: string;
}


// Interface for Home component state
interface HomeData {
  projects: Project[];
  about: AboutDataItem[];
  certificates: Certificate[];
}

// Home component
export default function Home() {
  const [data, setData] = useState<HomeData>({ projects: [], about: [], certificates: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/home");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoaderLandingPage />;

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <Hero />
      <div id="about" className="">
        <AboutMe aboutData={data.about} />
      </div>
      <div id="projects" className="">
        <Projects projectData={data.projects} />
      </div>
      <div id="certifications" >
        <CertificationsSection certificates={data.certificates} />
      </div>
       <div id="contact">
        <Contact socialLinks={socialLinks} />
      </div>
    </>
  );
}


// ErrorComponent
interface ErrorComponentProps {
  error: string;
}

const ErrorComponent = ({ error }: ErrorComponentProps): JSX.Element => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="p-8 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
          {error}
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};