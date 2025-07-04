"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";
import { Award, ImageOff, BookOpen, Calendar, Building, Globe, Search, X, ExternalLink } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type CertificateCategory = "Competition" | "Quiz" | "Hackathon" | "Design" | "Security" | "Other" | "Professional";

interface Certificate {
  _id: string;
  title: string;
  date: string;
  organization: string;
  college?: string;
  description: string;
  image: string;
  alt: string;
  category: CertificateCategory;
  link?: string;
  skills?: string[];
  featured?: boolean;
}

const themeConfig = {
  Competition: { colors: "from-rose-200 to-pink-200", badge: "text-rose-500 dark:text-rose-300" },
  Quiz: { colors: "from-sky-200 to-cyan-200", badge: "text-sky-500 dark:text-sky-300" },
  Hackathon: { colors: "from-violet-200 to-fuchsia-200", badge: "text-violet-500 dark:text-violet-300" },
  Design: { colors: "from-emerald-100 to-teal-200", badge: "text-emerald-500 dark:text-emerald-300" },
  Security: { colors: "from-orange-200 to-red-200", badge: "text-orange-500 dark:text-orange-300" },
  Professional: { colors: "from-blue-200 to-indigo-200", badge: "text-blue-500 dark:text-blue-300" },
  Other: { colors: "from-gray-200 to-neutral-200", badge: "text-gray-500 dark:text-gray-300" },
  default: { colors: "from-indigo-200 to-purple-200", badge: "text-indigo-500 dark:text-indigo-300" }
};

const animations = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
  fadeIn: (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } } }),
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } } },
  modal: {
    overlay: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    content: { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } }
  }
};

const filterTabs = [
  { label: "All", value: "All" },
  { label: "Competition", value: "Competition" },
  { label: "Quiz", value: "Quiz" },
  { label: "Hackathon", value: "Hackathon" },
  { label: "Design", value: "Design" },
  { label: "Security", value: "Security" },
  { label: "Professional", value: "Professional" },
  { label: "Other", value: "Other" }
];

const PageHeader = () => (
  <motion.div className="text-center mb-12" {...animations.fadeIn()}>
    <motion.div className="flex items-center justify-center mb-4" {...animations.scale}>
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
        <Award className="h-6 w-6 text-white" />
      </div>
    </motion.div>
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-800 dark:text-white mb-4">
      My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Certifications</span>
    </h2>
    <div className="flex items-center justify-center">
      <motion.div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="mx-3 text-neutral-400 dark:text-neutral-500">•</motion.div>
      <motion.div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
    </div>
    <motion.p className="max-w-2xl mx-auto mt-4 text-neutral-600 dark:text-neutral-400 text-lg" {...animations.fadeIn(0.2)}>
      A showcase of academic achievements and professional development across multiple disciplines.
    </motion.p>
  </motion.div>
);

interface StatsDisplayProps {
  certificates: Certificate[];
}

const StatsDisplay = ({ certificates }: StatsDisplayProps) => {
  const stats = [
    { label: "Total Certificates", value: certificates.length, icon: Award },
    { label: "Organizations", value: new Set(certificates.map(c => c.organization)).size, icon: Building },
    { label: "Institutions", value: new Set(certificates.filter(c => c.college).map(c => c.college)).size, icon: BookOpen },
    { label: "Categories", value: new Set(certificates.map(c => c.category)).size, icon: Globe }
  ];

  return (
    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8" {...animations.fadeIn(0.4)}>
      {stats.map((stat, i) => (
        <div key={i} className="bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">{stat.label}</span>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <stat.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-800 dark:text-white">{stat.value}</p>
        </div>
      ))}
    </motion.div>
  );
};

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const SearchAndFilter = ({ searchQuery, setSearchQuery, filter, setFilter }: SearchAndFilterProps) => (
  <motion.div className="max-w-3xl mx-auto my-8 space-y-4" {...animations.fadeIn(0.2)}>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search certificates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-amber-500"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
    <Tabs value={filter} onValueChange={setFilter} className="w-full">
      <TabsList className="w-full bg-white/70 dark:bg-neutral-800/70 rounded-full p-1 shadow-md backdrop-blur-sm flex overflow-x-auto hide-scrollbar">
        {filterTabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex-1 min-w-max text-xs sm:text-sm px-4 py-2 rounded-full transition-all">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </motion.div>
);

interface CertificateCardProps {
  cert: Certificate;
  onSelect: (cert: Certificate) => void;
  imageError: Record<string, boolean>;
  onImageError: (certId: Certificate["_id"]) => void;
}

const CertificateCard = ({ cert, onSelect, imageError, onImageError }: CertificateCardProps) => {
  const theme = themeConfig[cert.category] || themeConfig.default;

  return (
    <motion.div
      id={cert._id}
      variants={animations.item}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700",
        "hover:shadow-xl transition-all duration-300 overflow-hidden h-full cursor-pointer",
        cert.featured ? "sm:col-span-2" : ""
      )}
      onClick={() => onSelect(cert)}
    >
      <div className={`relative ${cert.featured ? "h-48" : "h-40"} w-full overflow-hidden`}>
        {imageError[cert._id] ? (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <div className="flex flex-col items-center text-neutral-400">
              <ImageOff size={32} className="mb-2" />
              <span className="text-xs">Image unavailable</span>
            </div>
            <div className={`absolute inset-0 opacity-60 dark:opacity-70 bg-gradient-to-b ${theme.colors}`} />
          </div>
        ) : (
          <Image
            src={cert.image}
            alt={cert.alt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => onImageError(cert._id)}
            priority={cert.featured}
          />
        )}
        <Badge className={`absolute top-3 left-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm ${theme.badge}`}>
          {cert.category}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-300">
          {cert.organization}
        </Badge>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white leading-tight hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
          {cert.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Calendar className="h-4 w-4 text-neutral-400" />
          <span>{cert.date}</span>
        </div>
        {cert.skills && (
          <div className="flex flex-wrap gap-1 pt-1">
            {cert.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300">
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="pt-2">
          <div className="text-sm font-medium flex items-center gap-1 text-blue-600 dark:text-blue-400">
            View Details
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface EmptyStateProps {
  searchQuery: string;
  filter: string;
  onClearSearch: () => void;
  onShowAll: () => void;
}

const EmptyState = ({ searchQuery, filter, onClearSearch, onShowAll }: EmptyStateProps) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-12 text-center bg-white/50 dark:bg-neutral-800/50 rounded-2xl backdrop-blur-sm shadow-lg">
    <div className="bg-neutral-100 dark:bg-neutral-700 p-6 rounded-full mb-4">
      <Search size={32} className="text-neutral-400 dark:text-neutral-300" />
    </div>
    <h3 className="text-xl font-medium text-neutral-800 dark:text-white mb-2">No certificates found</h3>
    <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
      {searchQuery
        ? `No certifications match "${searchQuery}"${filter !== "All" ? ` in the ${filter} category` : ""}.`
        : `No certifications in the ${filter} category.`}
    </p>
    <div className="flex gap-4">
      {searchQuery && (
        <Button onClick={onClearSearch} variant="outline" className="rounded-full">Clear Search</Button>
      )}
      {filter !== "All" && (
        <Button onClick={onShowAll} className="rounded-full bg-amber-600 hover:bg-amber-700">Show All Certificates</Button>
      )}
    </div>
  </motion.div>
);

interface CertificateModalProps {
  cert: Certificate | null;
  onClose: () => void;
  imageError: Record<string, boolean>;
}

const CertificateModal = ({ cert, onClose, imageError }: CertificateModalProps) => {
  if (!cert) return null;

  const openImageInNewTab = () => {
    if (!imageError[cert._id]) {
      window.open(cert.image, '_blank');
    }
  };

  return (
    <motion.div
      {...animations.modal.overlay}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        {...animations.modal.content}
        className="bg-white dark:bg-neutral-800 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 cursor-pointer" onClick={openImageInNewTab}>
          {imageError[cert._id] ? (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <ImageOff size={64} className="text-neutral-400" />
            </div>
          ) : (
            <Image src={cert.image} alt={cert.alt} fill className="object-cover" />
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">{cert.category}</Badge>
            <Badge variant="outline">{cert.date}</Badge>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">{cert.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded-full">
                <Globe className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Organization</p>
                <p className="font-medium text-neutral-800 dark:text-white">{cert.organization}</p>
              </div>
            </div>
            {cert.college && (
              <div className="flex items-center gap-3">
                <div className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded-full">
                  <Building className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Institution</p>
                  <p className="font-medium text-neutral-800 dark:text-white">{cert.college}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">About this certification</h4>
            <p className="text-neutral-600 dark:text-neutral-400">{cert.description}</p>
          </div>

          {(cert.skills?.length ?? 0) > 0 && (
            <div>
              <h4 className="text-lg font-medium text-neutral-800 dark:text-white mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {cert.skills?.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {cert.link && (
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors shadow-lg shadow-amber-500/20"
              >
                <Award className="h-4 w-4" />
                Verify Certificate
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            <Button onClick={onClose} variant="outline" className="rounded-full px-6">Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CertificationsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true);
        const res = await fetch("/api/certificates");
        if (!res.ok) throw new Error(`Failed to fetch certificates: ${res.statusText}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format: Expected an array of certificates");
        setCertificates(data as Certificate[]);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const filteredCertificates = certificates
    .filter(cert => filter === "All" || cert.category === filter)
    .filter(cert =>
      searchQuery === "" ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.college && cert.college.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.skills && cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  const handleImageError = (certId: Certificate["_id"]) => {
    setImageError(prev => ({ ...prev, [certId]: true }));
  };

  return (
    <section className="relative w-full min-h-screen py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.9}
          maxSize={1.5}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#F59E0B"
        />
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative">
        <PageHeader />
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">Loading certificates...</p>
          </motion.div>
        ) : error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 bg-white/50 dark:bg-neutral-800/50 rounded-2xl backdrop-blur-sm shadow-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 rounded-full bg-amber-600 hover:bg-amber-700">
              Retry
            </Button>
          </motion.div>
        ) : (
          <>
            <StatsDisplay certificates={certificates} />
            <SearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} filter={filter} setFilter={setFilter} />
            {filteredCertificates.length > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                Showing {filteredCertificates.length} {filteredCertificates.length === 1 ? "certificate" : "certificates"}
                {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                {filter !== "All" && <span> in {filter}</span>}
              </motion.p>
            )}
            {filteredCertificates.length > 0 ? (
              <motion.div
                variants={animations.container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"

                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
              >
                {filteredCertificates.map(cert => (
                  <CertificateCard
                    key={cert._id}
                    cert={cert}
                    onSelect={() => setSelectedCert(cert)}
                    onImageError={handleImageError}
                    imageError={imageError}
                  />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                filter={filter}
                onClearSearch={() => setSearchQuery("")}
                onShowAll={() => setFilter("All")}
              />
            )}
            <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} imageError={imageError} />
          </>
        )}
      </div>
    </section>
  );
}