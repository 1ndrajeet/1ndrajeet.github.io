// src/app/batcave/projects.tsx
'use client';

import { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectType, CollectionType, projectCategories, projectTypes, projectAccents, AboutType, CertificateType } from './types';

type ProjectsProps = {
  projects: ProjectType[];
  setData: React.Dispatch<React.SetStateAction<{ projects: ProjectType[]; about: AboutType[], certificates: CertificateType[] }>>;
  setMessage: (msg: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
};

export default function Projects({ projects, setData, setMessage, isSubmitting, setIsSubmitting }: ProjectsProps) {
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<ProjectType>>({});

  async function addItem<T>(collection: CollectionType, data: Partial<T>, successCallback: (result: Record<string, unknown>) => void) {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/batcave/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, data }),
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

  async function deleteItem(collection: CollectionType, id: string, successCallback: () => void) {
    if (!confirm(`Are you sure you want to delete this project?`)) return;
    try {
      const res = await fetch('/api/batcave/home', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, id }),
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
    }
  }

  async function addProject() {
    addItem<ProjectType>('project_data', newProject, (result) => {
      setData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject, _id: result.id } as ProjectType],
      }));
      setNewProject({});
      setProjectDialogOpen(false);
    });
  }

  async function deleteProject(id: string) {
    deleteItem('project_data', id, () => {
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p._id !== id),
      }));
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-yellow-500">PROJECTS DATABASE</h2>
        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold" onClick={() => setNewProject({})}>
              <Plus size={16} className="mr-2" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-850 border border-yellow-600 text-gray-200 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-500">Add New Project</DialogTitle>
              <DialogDescription className="text-gray-400">Add a new project to the database.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                placeholder="Title"
                value={newProject.title || ''}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              <select
                value={newProject.category || ''}
                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Select a category</option>
                {projectCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={newProject.type || ''}
                onChange={e => setNewProject({ ...newProject, type: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Select a type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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
              <select
                value={newProject.accentColor || ''}
                onChange={e => setNewProject({ ...newProject, accentColor: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Select an accent color</option>
                {projectAccents.map(accent => (
                  <option key={accent} value={accent}>{accent}</option>
                ))}
              </select>
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
                onClick={addProject}
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
            {projects.length > 0 ? (
              projects.map(project => (
                <TableRow key={project._id} className="border-b border-gray-800 hover:bg-gray-850">
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
                            onClick={() => deleteProject(project._id)}
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
    </div>
  );
}