'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Project = {
    id: string;
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

const accents = ["blue", "emerald", "rose", "amber", "indigo", "cyan"]
const aboutCategories = ["Achievement", "Current", "Philosophy", "Foundation"]
const projectTypes = ["Web", "App", "Native", "Design", "Cross-Platform", "AI"]
const projectCategories = ["Industry-Grade", "Freelance", "Practice"]
const projectAccents = ["blue", "emerald", "rose", "amber", "purple"]
type About = {
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

type DataState = {
    projects: Project[];
    about: About[];
};

type CollectionType = 'project_data' | 'about_data';

export default function BatcaveAdmin() {
    const [data, setData] = useState<DataState>({ projects: [], about: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [newProject, setNewProject] = useState<Partial<Project>>({});
    const [newAbout, setNewAbout] = useState<Partial<About>>({});
    const [, set] = useState<string | null>(null);
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);

    // Show message with auto-dismiss
    useEffect(() => {
        if (message) {
            setMessageVisible(true);
            const timer = setTimeout(() => {
                setMessageVisible(false);
                setTimeout(() => setMessage(''), 300); // Clear message after fade-out
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Reset form states when dialogs close
    useEffect(() => {
        if (!projectDialogOpen) {
            set(null);
            setNewProject({});
        }
        if (!aboutDialogOpen) {
            setNewAbout({});
        }
    }, [projectDialogOpen, aboutDialogOpen]);

    // Fetch data from /api/home
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/home');
                if (!res.ok) throw new Error('Failed to fetch data');
                const fetchedData = await res.json();
                setData({
                    projects: fetchedData.projects || [],
                    about: fetchedData.about || []
                });
            } catch (error) {
                setMessage('Error loading data');
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    // Generic add item function
    async function addItem<T>(collection: CollectionType, data: Partial<T>, successCallback: (result: Record<string, unknown>) => void) {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/batcave/home', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    data,
                }),
            });
            const result = await res.json();
            if (res.ok) {
                successCallback(result);
                setMessage(result.message || `Item added successfully to ${collection}`);
            } else {
                setMessage(result.error || `Failed to add item to ${collection}`);
            }
        } catch {
            setMessage(`Error adding item to ${collection}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Generic delete item function
    async function deleteItem(collection: CollectionType, id: string, successCallback: () => void) {
        if (!confirm(`Are you sure you want to delete this ${collection === 'project_data' ? 'project' : 'about section'}?`)) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/batcave/home', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    id,
                }),
            });
            const result = await res.json();
            if (res.ok) {
                successCallback();
                setMessage(result.message || `Item deleted successfully from ${collection}`);
            } else {
                setMessage(result.error || `Failed to delete item from ${collection}`);
            }
        } catch {
            setMessage(`Error deleting item from ${collection}`);
        } finally {
            setIsLoading(false);
        }
    }

    // Add new project
    async function addProject() {
        addItem<Project>('project_data', newProject, (result) => {
            setData(prev => ({
                ...prev,
                projects: [...prev.projects, { ...newProject, id: result.id } as Project],
            }));
            setNewProject({});
            setProjectDialogOpen(false);
        });
    }

    // Delete project
    async function deleteProject(id: string) {
        deleteItem('project_data', id, () => {
            setData(prev => ({
                ...prev,
                projects: prev.projects.filter(p => p.id !== id),
            }));
        });
    }

    // Add new about
    async function addAbout() {
        addItem<About>('about_data', newAbout, (result) => {
            setData(prev => ({
                ...prev,
                about: [...prev.about, { ...newAbout, _id: result.id } as About],
            }));
            setNewAbout({});
            setAboutDialogOpen(false);
        });
    }

    // Delete about
    async function deleteAbout(id: string) {
        deleteItem('about_data', id, () => {
            setData(prev => ({
                ...prev,
                about: prev.about.filter(a => a._id !== id),
            }));
        });
    }

    // Handle form submit
    const handleProjectSubmit = () => {
        addProject();
    };

    // Handle about form submit
    const handleAboutSubmit = () => {
        addAbout();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <span className="text-yellow-500 text-4xl">🦇</span>
                    <p className="mt-4 text-yellow-500 font-bold">Loading the Batcave...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 p-6">
            <header className="flex items-center justify-between mb-8 border-b border-yellow-600 pb-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-yellow-600 h-8 w-8 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold">B</span>
                    </div>
                    <h1 className="text-3xl font-bold text-yellow-500">BATCAVE ADMIN</h1>
                </div>
            </header>

            {message && (
                <div className={`fixed bottom-4 right-4 transition-all duration-300 ${messageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Alert className={`w-80 shadow-lg ${message.includes('Error') ? 'border-red-600 bg-red-950/90' : 'border-green-600 bg-green-950/90'}`}>
                        <AlertCircle className={`h-4 w-4 ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`} />
                        <AlertTitle className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>
                            {message.includes('Error') ? 'Error' : 'Success'}
                        </AlertTitle>
                        <AlertDescription className="text-gray-300">
                            {message}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <Tabs defaultValue="projects" className="mb-6" >
                <TabsList className="bg-gray-800 border border-gray-700">
                    <TabsTrigger value="projects" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
                        Projects
                    </TabsTrigger>
                    <TabsTrigger value="about" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
                        About
                    </TabsTrigger>
                </TabsList>

                {/* Projects Tab */}
                <TabsContent value="projects" className="mt-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-yellow-500">PROJECTS DATABASE</h2>
                        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                                    onClick={() => {
                                        set(null);
                                        setNewProject({});
                                    }}
                                >
                                    <Plus size={16} className="mr-2" /> Add New Project
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-850 border border-yellow-600 text-gray-200 max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl text-yellow-500">
                                        {'Add New Project'}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        {'Add a new project to the database.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Input
                                        placeholder="Title"
                                        value={newProject.title || ''}
                                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <select
                                            id="category"
                                            value={newProject.category || ''}
                                            onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select a category</option>
                                            {projectCategories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <select
                                            id="type"
                                            value={newProject.type || ''}
                                            onChange={e => setNewProject({ ...newProject, type: e.target.value })}
                                            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select a type</option>
                                            {projectTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        placeholder="Image URL"
                                        value={newProject.image || ''}
                                        onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Alt Text"
                                        value={newProject.alt || ''}
                                        onChange={e => setNewProject({ ...newProject, alt: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Link"
                                        value={newProject.link || ''}
                                        onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Tech (comma-separated)"
                                        value={newProject.tech?.join(', ') || ''}
                                        onChange={e =>
                                            setNewProject({ ...newProject, tech: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') })
                                        }
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <select
                                            id="accentColor"
                                            value={newProject.accentColor || ''}
                                            onChange={e => setNewProject({ ...newProject, accentColor: e.target.value })}
                                            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select an accent color</option>
                                            {projectAccents.map((accent) => (
                                                <option key={accent} value={accent}>{accent}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        placeholder="Icon"
                                        value={newProject.icon || ''}
                                        onChange={e => setNewProject({ ...newProject, icon: e.target.value })}
                                        className="bg-gray-800 md:col-span-2 border-gray-700 text-gray-200"
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        value={newProject.description || ''}
                                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200 md:col-span-2"
                                        rows={4}
                                    />
                                </div>

                                <DialogFooter className="mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => setProjectDialogOpen(false)}
                                        className="border-gray-600 text-gray-200 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleProjectSubmit}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing
                                            </>
                                        ) : (
                                            'Save Project'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="bg-gray-900 rounded-md shadow-md border border-gray-800">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-800 hover:bg-gray-800">
                                    <TableHead className="text-yellow-500">Title</TableHead>
                                    <TableHead className="text-yellow-500">Category</TableHead>
                                    <TableHead className="text-yellow-500">Type</TableHead>
                                    <TableHead className="text-yellow-500 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.projects && data.projects.length > 0 ? (
                                    data.projects.map(project => (
                                        <TableRow key={project.id} className="border-b border-gray-800 hover:bg-gray-850">
                                            <TableCell className="font-medium">{project.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-gray-800 text-yellow-400 border-yellow-600">
                                                    {project.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{project.type}</TableCell>
                                            <TableCell className="text-right">

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() => deleteProject(project.id)}
                                                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                            >
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Delete project</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                            No projects found in the database
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-yellow-500">ABOUT DATABASE</h2>
                        <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                                    onClick={() => {
                                        setNewAbout({});
                                    }}
                                >
                                    <Plus size={16} className="mr-2" /> Add New About
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-850 border border-yellow-600 text-gray-200 max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl text-yellow-500">
                                        {'Add New About Section'}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        {'Add a new about section to the database.'}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Input
                                        placeholder="Title"
                                        value={newAbout.title || ''}
                                        onChange={e => setNewAbout({ ...newAbout, title: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <select
                                            id="category"
                                            value={newAbout.category || ''}
                                            onChange={e => setNewAbout({ ...newAbout, category: e.target.value })}
                                            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select a category</option>
                                            {aboutCategories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        placeholder="Image URL"
                                        value={newAbout.image || ''}
                                        onChange={e => setNewAbout({ ...newAbout, image: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Alt Text"
                                        value={newAbout.alt || ''}
                                        onChange={e => setNewAbout({ ...newAbout, alt: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <select
                                            id="accent"
                                            value={newAbout.accent || ''}
                                            onChange={e => setNewAbout({ ...newAbout, accent: e.target.value })}
                                            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="">Select an accent</option>
                                            {accents.map((accent) => (
                                                <option key={accent} value={accent}>{accent}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input
                                        placeholder="Icon"
                                        value={newAbout.icon || ''}
                                        onChange={e => setNewAbout({ ...newAbout, icon: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Quote"
                                        value={newAbout.quote || ''}
                                        onChange={e => setNewAbout({ ...newAbout, quote: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Input
                                        placeholder="Quote Note"
                                        value={newAbout.quoteNote || ''}
                                        onChange={e => setNewAbout({ ...newAbout, quoteNote: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200"
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        value={newAbout.description || ''}
                                        onChange={e => setNewAbout({ ...newAbout, description: e.target.value })}
                                        className="bg-gray-800 border-gray-700 text-gray-200 md:col-span-2"
                                        rows={4}
                                    />
                                </div>

                                <DialogFooter className="mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => setAboutDialogOpen(false)}
                                        className="border-gray-600 text-gray-200 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAboutSubmit}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing
                                            </>
                                        ) : (
                                            'Save About Section'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="bg-gray-900 rounded-md shadow-md border border-gray-800">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-800 hover:bg-gray-800">
                                    <TableHead className="text-yellow-500">Title</TableHead>
                                    <TableHead className="text-yellow-500">Category</TableHead>
                                    <TableHead className="text-yellow-500 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.about && data.about.length > 0 ? (
                                    data.about.map(item => (
                                        <TableRow key={item._id} className="border-b border-gray-800 hover:bg-gray-850">
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-gray-800 text-yellow-400 border-yellow-600">
                                                    {item.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() => deleteAbout(item._id)}
                                                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                            >
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Delete about section</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                                            No about sections found in the database
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>

            <footer className="mt-12 pt-4 border-t border-gray-800 text-gray-500 text-sm text-center">
                <p>BATCAVE ADMIN CONSOLE · AUTHORIZED ACCESS ONLY</p>
            </footer>
        </div>
    );
}