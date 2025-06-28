// src/app/batcave/types.ts
export type ProjectType = {
    _id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    image: string;
    alt: string;
    link: string;
    tech: string[];
    accentColor: string;
    icon: string;
};

export type AboutType = {
    _id: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    alt?: string;
    bgColor?: object;
    accent?: string;
    icon?: string;
    quote?: string;
    quoteNote?: string;
};

export type DataState = {
    projects: ProjectType[];
    about: AboutType[];
    certificates: CertificateType[];
};

export type CertificateType = {
    _id: string;
    id: string;
    title: string;
    date: string;
    organization: string;
    college: string;
    description: string;
    image: string;
    alt: string;
    category: string;
    skills: string[];
    featured: boolean;
};

export const projectCategories = ["Industry-Grade", "Freelance", "Practice"];
export const projectTypes = ["Web", "App", "Native", "Design", "Cross-Platform", "AI"];
export const projectAccents = ["blue", "emerald", "rose", "amber", "purple"];
export const aboutCategories = ["Achievement", "Current", "Philosophy", "Foundation"];
export const accents = ["blue", "emerald", "rose", "amber", "indigo", "cyan"];

export type CollectionType = 'project_data' | 'about_data' | 'certificates';


export const certificateCategories = ['Hackathon', 'Course', 'Certification', 'Award', 'Other'];