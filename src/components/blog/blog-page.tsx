"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    Lock,
    Shield,
    Eye,
    ChevronRight,
    FileText,
    Clock,
    Plus,
    Upload,
    Save,
    X,
    Calendar,
    Filter,
    ThumbsUp,
    MessageSquare,
    Share2
} from "lucide-react";
import { SparklesCore } from "../ui/sparkles";
import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "../ui/tooltip";

// Type definitions for blog posts and diary entries
interface Post {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    publishedAt: string;
    tags: string[];
    readTime: number;
    imageUrl: string;
    isDiary: boolean;
    secretCode?: string;
}

// Batman-themed content for secret diary
const batmanQuotes = [
    "It&apos;s not who I am underneath, but what I do that defines me.",
    "The night is darkest just before the dawn.",
    "Why do we fall? So we can learn to pick ourselves up.",
    "Sometimes the truth isn&apos;t good enough. Sometimes people deserve more.",
    "I&apos;m Batman."
];

export default function BlogPage() {
    const { theme } = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [secretCode, setSecretCode] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [diaryEntries, setDiaryEntries] = useState<Post[]>([]);
    const [activeTab, setActiveTab] = useState("blogs");
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [randomQuote, setRandomQuote] = useState("");
    const [showNewEntryForm, setShowNewEntryForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: "",
        content: "",
        excerpt: "",
        tags: "",
        imageUrl: "",
        secretCode: ""
    });
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
    const [publishConfirmation, setPublishConfirmation] = useState<string | null>(null);

    // Check for Batman day - September 17 for Easter egg
    const isBatmanDay = () => {
        const today = new Date();
        return today.getMonth() === 8 && today.getDate() === 17;
    };

    useEffect(() => {
        // Set a random Batman quote
        setRandomQuote(batmanQuotes[Math.floor(Math.random() * batmanQuotes.length)]);

        // Fetch blog posts (not diary entries)
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts?type=blog');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch blog posts:", error);
        }
    };

    const fetchDiaryEntries = async (code: string) => {
        try {
            const response = await fetch(`/api/posts?type=diary&code=${code}`);
            if (response.ok) {
                const data = await response.json();
                setDiaryEntries(data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to fetch diary entries:", error);
            return false;
        }
    };

    const handlePasswordSubmit = async () => {
        // Batman-themed password verification
        if (secretCode === "itsBatm4n" || secretCode === "vengeance") {
            const success = await fetchDiaryEntries(secretCode);
            if (success) {
                setIsAuthenticated(true);
                setActiveTab("diary");
                setIsPasswordDialogOpen(false);
                setPasswordError("");
            } else {
                setPasswordError("Access denied. Alfred doesn&apos;t recognize you.");
            }
        } else {
            setPasswordError("Wrong password. The Batcave remains sealed.");
        }
    };

    const handleCreateEntry = async () => {
        try {
            const entryData = {
                ...newEntry,
                tags: newEntry.tags.split(',').map(tag => tag.trim()),
                publishedAt: new Date().toISOString(),
                readTime: Math.ceil(newEntry.content.split(' ').length / 200),
                isDiary: true
            };

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData),
            });

            if (response.ok) {
                // Refresh diary entries
                await fetchDiaryEntries(secretCode);
                setShowNewEntryForm(false);
                setNewEntry({
                    title: "",
                    content: "",
                    excerpt: "",
                    tags: "",
                    imageUrl: "",
                    secretCode: secretCode
                });
            }
        } catch (error) {
            console.error("Failed to create diary entry:", error);
        }
    };

    const handlePublishToBlog = async (postId: string) => {
        try {
            const response = await fetch(`/api/posts?id=${postId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                // Refresh both lists
                await fetchDiaryEntries(secretCode);
                await fetchPosts();
                setPublishConfirmation(null);
            }
        } catch (error) {
            console.error("Failed to publish diary entry:", error);
        }
    };

    const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({ ...prev, [name]: value }));
    };

    const filteredPosts = (postsArray: Post[]) => {
        return postsArray.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

            return matchesSearch && matchesTag;
        });
    };

    // Get all unique tags from posts and diary entries
    const allTags = () => {
        const tags = [...posts, ...diaryEntries]
            .flatMap(post => post.tags)
            .filter((value, index, self) => self.indexOf(value) === index);
        return tags;
    };

    return (
        <section className="relative min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 pb-20">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <SparklesCore
                    id="blog-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={60}
                    className="w-full h-full"
                    speed={0.4}
                />

                {activeTab === "diary" && isAuthenticated && (
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50,2.5 L60,25 L85,25 L65,40 L75,65 L50,50 L25,65 L35,40 L15,25 L40,25 Z"
                                fill="none"
                                stroke={theme === 'dark' ? 'rgba(255, 208, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}
                                strokeWidth="0.5"
                            />
                        </svg>
                    </div>
                )}

                {activeTab === "diary" && (
                    <div className={cn(
                        "absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-20",
                        "bg-amber-200 dark:bg-amber-900"
                    )} />
                )}
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-16">
                {/* Header */}
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
                        <h2 className="text-4xl md:text-7xl font-bold text-center tracking-tight text-foreground">
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">Thoughts</span>
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="w-24 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto mt-6"
                        />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground max-w-xl mx-auto">
                        Sharing insights, experiences, and knowledge from my development journey.
                    </p>
                </motion.div>

                {/* Main content */}
                <div className="flex flex-col items-center">
                    {/* Tabs for blog/diary selection */}
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full max-w-4xl mb-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <TabsList className="bg-transparent p-0 h-auto">
                                <TabsTrigger
                                    value="blogs"
                                    className={cn(
                                        "text-sm font-medium px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                                        "bg-muted hover:bg-muted/80 text-muted-foreground",
                                        "transition-colors duration-200"
                                    )}
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Public Blog
                                </TabsTrigger>
                                <TabsTrigger
                                    value="diary"
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            setIsPasswordDialogOpen(true);
                                            setActiveTab("blogs");
                                        }
                                    }}
                                    className={cn(
                                        "text-sm font-medium px-4 py-2 rounded-md data-[state=active]:bg-amber-500/90 data-[state=active]:text-black",
                                        "bg-muted hover:bg-muted/80 text-muted-foreground",
                                        "transition-colors duration-200 ml-2"
                                    )}
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Secret Diary
                                </TabsTrigger>
                            </TabsList>

                            {/* Search and filters */}
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-48 h-9 text-xs bg-background dark:bg-neutral-800/70"
                                />

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-9">
                                            <Filter className="w-4 h-4 mr-1" />
                                            <span className="sr-only md:not-sr-only md:inline-block">Filter</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Filter Posts</DialogTitle>
                                            <DialogDescription>
                                                Select tags to filter the posts
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-wrap gap-2 py-4">
                                            <Badge
                                                className={cn(
                                                    "cursor-pointer",
                                                    !selectedTag && "bg-primary"
                                                )}
                                                onClick={() => setSelectedTag("")}
                                            >
                                                All Tags
                                            </Badge>
                                            {allTags().map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    className={cn(
                                                        "cursor-pointer",
                                                        selectedTag === tag && "bg-primary"
                                                    )}
                                                    variant="outline"
                                                    onClick={() => setSelectedTag(tag)}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        {/* Blog Posts Content */}
                        <TabsContent value="blogs" className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts(posts).length > 0 ? (
                                    filteredPosts(posts).map((post) => (
                                        <motion.div
                                            key={post._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                                <div className="relative h-48 overflow-hidden">
                                                    {post.imageUrl ? (
                                                        <Image
                                                            src={post.imageUrl}
                                                            alt={post.title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                            <FileText className="w-12 h-12 text-primary/40" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-10">
                                                        <Badge variant="secondary" className="flex items-center gap-1 bg-black/60 text-white backdrop-blur-sm">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime} min read
                                                        </Badge>
                                                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                                                            <Calendar className="w-3 h-3 mr-1" />
                                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                                    <CardDescription className="line-clamp-2 mt-2">
                                                        {post.excerpt}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex flex-wrap gap-1.5">
                                                    {post.tags.map(tag => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </CardContent>
                                                <CardFooter className="flex justify-between mt-auto">
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <ThumbsUp className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <MessageSquare className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <Share2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="text-xs gap-1"
                                                        onClick={() => setExpandedPostId(post._id)}
                                                    >
                                                        Read More
                                                        <ChevronRight className="w-3 h-3" />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
                                        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                                        <p className="text-muted-foreground max-w-md">
                                            {searchQuery || selectedTag ?
                                                "No posts match your current search criteria. Try adjusting your filters." :
                                                "The blog is currently empty. Check back later for new content."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Secret Diary Content */}
                        <TabsContent value="diary" className="w-full min-h-[200px]">
                            {isAuthenticated ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="inline-flex items-center bg-amber-500/10 text-amber-700 dark:text-amber-400 dark:bg-amber-900/20 rounded-lg px-3 py-1.5">
                                            <Shield className="w-4 h-4 mr-2" />
                                            <span className="text-xs font-semibold">Secured Bat-Diary</span>
                                            {isBatmanDay() && (
                                                <Badge className="ml-2 bg-yellow-500 text-black">Batman Day!</Badge>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => setShowNewEntryForm(!showNewEntryForm)}
                                            variant={showNewEntryForm ? "destructive" : "outline"}
                                            size="sm"
                                            className={cn(
                                                showNewEntryForm ? "gap-1" : "gap-1 border-amber-500 text-amber-600 hover:text-amber-700 dark:border-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
                                            )}
                                        >
                                            {showNewEntryForm ? (
                                                <>
                                                    <X className="w-4 h-4" />
                                                    Cancel
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4" />
                                                    New Entry
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Diary entry creation form */}
                                    <AnimatePresence>
                                        {showNewEntryForm && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden mb-8"
                                            >
                                                <Card className="border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10">
                                                    <CardHeader>
                                                        <CardTitle>
                                                            <div className="flex items-center">
                                                                <span className="mr-2">🦇</span>
                                                                New Bat-Diary Entry
                                                            </div>
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Record your secret developer thoughts - they&apos;ll remain hidden in the Batcave.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div>
                                                            <label htmlFor="title" className="text-sm font-medium mb-1 block">
                                                                Title
                                                            </label>
                                                            <Input
                                                                id="title"
                                                                name="title"
                                                                value={newEntry.title}
                                                                onChange={handleEntryChange}
                                                                placeholder="The name of your entry"
                                                                className="bg-white dark:bg-neutral-900"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="excerpt" className="text-sm font-medium mb-1 block">
                                                                Excerpt
                                                            </label>
                                                            <Input
                                                                id="excerpt"
                                                                name="excerpt"
                                                                value={newEntry.excerpt}
                                                                onChange={handleEntryChange}
                                                                placeholder="A brief description of your entry"
                                                                className="bg-white dark:bg-neutral-900"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="content" className="text-sm font-medium mb-1 block">
                                                                Content
                                                            </label>
                                                            <Textarea
                                                                id="content"
                                                                name="content"
                                                                value={newEntry.content}
                                                                onChange={handleEntryChange}
                                                                placeholder="Your entry content"
                                                                rows={6}
                                                                className="bg-white dark:bg-neutral-900 resize-none"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label htmlFor="tags" className="text-sm font-medium mb-1 block">
                                                                    Tags (comma-separated)
                                                                </label>
                                                                <Input
                                                                    id="tags"
                                                                    name="tags"
                                                                    value={newEntry.tags}
                                                                    onChange={handleEntryChange}
                                                                    placeholder="batman, code, secret"
                                                                    className="bg-white dark:bg-neutral-900"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor="imageUrl" className="text-sm font-medium mb-1 block">
                                                                    Image URL (optional)
                                                                </label>
                                                                <Input
                                                                    id="imageUrl"
                                                                    name="imageUrl"
                                                                    value={newEntry.imageUrl}
                                                                    onChange={handleEntryChange}
                                                                    placeholder="https://example.com/image.jpg"
                                                                    className="bg-white dark:bg-neutral-900"
                                                                />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="flex justify-end">
                                                        <Button
                                                            onClick={handleCreateEntry}
                                                            className="gap-1 bg-amber-600 hover:bg-amber-700"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save Entry
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Batman-themed quote */}
                                    <div className="bg-gradient-to-r from-amber-950/20 to-amber-800/10 p-4 rounded-lg mb-8 border-l-4 border-amber-500 dark:from-amber-900/10 dark:to-black/20">
                                        <p className="italic text-sm text-amber-800 dark:text-amber-300">
                                            {randomQuote}
                                        </p>
                                    </div>

                                    {/* List of diary entries */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {filteredPosts(diaryEntries).length > 0 ? (
                                            filteredPosts(diaryEntries).map((entry) => (
                                                <motion.div
                                                    key={entry._id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <Card className="overflow-hidden border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
                                                        <CardHeader className="py-4">
                                                            <div className="flex justify-between items-start">
                                                                <CardTitle className="text-lg">{entry.title}</CardTitle>
                                                                <div className="flex items-center gap-1">
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => setExpandedPostId(entry._id)}
                                                                                    className="h-8 w-8 p-0"
                                                                                >
                                                                                    <Eye className="h-4 w-4" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>View full entry</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>

                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => setPublishConfirmation(entry._id)}
                                                                                    className="h-8 w-8 p-0 text-emerald-600"
                                                                                >
                                                                                    <Upload className="h-4 w-4" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>Publish as blog post</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })}
                                                                </span>
                                                                <span className="inline-block w-1 h-1 bg-muted-foreground rounded-full"></span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {entry.readTime} min read
                                                                </span>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="py-2">
                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                {entry.excerpt}
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                                {entry.tags.map(tag => (
                                                                    <Badge key={tag} variant="outline" className="text-xs bg-amber-500/5 border-amber-500/30 text-amber-700 dark:text-amber-400">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                                <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                                    <FileText className="w-8 h-8 text-amber-500" />
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2">Your Bat-Diary is empty</h3>
                                                <p className="text-muted-foreground max-w-md">
                                                    Start writing your secret thoughts in the Bat-Diary.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                                    <Lock className="w-16 h-16 text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Please enter the secret code to access your Bat-Diary.
                                    </p>
                                    <div className="mt-6">
                                        <Input
                                            type="password"
                                            placeholder="Enter secret code"
                                            value={secretCode}
                                            onChange={(e) => setSecretCode(e.target.value)}
                                            className="w-full max-w-xs"
                                        />
                                        <Button
                                            onClick={handlePasswordSubmit}
                                            className="mt-4 bg-amber-600 hover:bg-amber-700"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Enter
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Password Dialog */}
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Enter Secret Code</DialogTitle>
                        <DialogDescription>
                            Only authorized users can access the secret diary. Enter the code to proceed.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Input
                                type="password"
                                placeholder="Enter the secret code"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                className="col-span-3"
                            />
                            {passwordError && (
                                <p className="text-sm text-red-500">{passwordError}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handlePasswordSubmit} className="gap-2">
                            <Lock className="w-4 h-4" />
                            Unlock
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Post View Dialog */}
            <Dialog open={!!expandedPostId} onOpenChange={() => setExpandedPostId(null)}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    {expandedPostId && (
                        <>
                            {(() => {
                                const post = [...posts, ...diaryEntries].find(p => p._id === expandedPostId);
                                if (!post) return null;

                                return (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>{post.title}</DialogTitle>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.publishedAt).toLocaleDateString()}
                                                </span>
                                                <span className="inline-block w-1 h-1 bg-muted-foreground rounded-full"></span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime} min read
                                                </span>
                                            </div>
                                        </DialogHeader>
                                        
                                        {post.imageUrl && (
                                            <div className="relative h-48 md:h-64 w-full my-4 rounded-lg overflow-hidden">
                                                <Image
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="prose prose-sm dark:prose-invert max-w-none">
                                            {post.content.split('\n').map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {post.tags.map(tag => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </>
                                );
                            })()}
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Publish Confirmation Dialog */}
            <Dialog open={!!publishConfirmation} onOpenChange={() => setPublishConfirmation(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Publish to Blog</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to publish this diary entry to your public blog?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPublishConfirmation(null)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="default"
                            onClick={() => publishConfirmation && handlePublishToBlog(publishConfirmation)}
                            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Upload className="w-4 h-4" />
                            Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
