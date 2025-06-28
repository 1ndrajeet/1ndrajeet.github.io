// src/app/batcave/about.tsx
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
import { AboutType, CollectionType, aboutCategories, accents, ProjectType, CertificateType } from './types';

type AboutProps = {
  about: AboutType[];
  setData: React.Dispatch<React.SetStateAction<{ projects: ProjectType[]; about: AboutType[], certificates: CertificateType[] }>>;
  setMessage: (msg: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
};

export default function About({ about, setData, setMessage, isSubmitting, setIsSubmitting }: AboutProps) {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [newAbout, setNewAbout] = useState<Partial<AboutType>>({});

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
    if (!confirm(`Are you sure you want to delete this about section?`)) return;
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

  async function addAbout() {
    addItem<AboutType>('about_data', newAbout, (result) => {
      setData(prev => ({
        ...prev,
        about: [...prev.about, { ...newAbout, _id: result.id } as AboutType],
      }));
      setNewAbout({});
      setAboutDialogOpen(false);
    });
  }

  async function deleteAbout(id: string) {
    deleteItem('about_data', id, () => {
      setData(prev => ({
        ...prev,
        about: prev.about.filter(a => a._id !== id),
      }));
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-yellow-500">ABOUT DATABASE</h2>
        <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold" onClick={() => setNewAbout({})}>
              <Plus size={16} className="mr-2" /> Add New About
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-850 border border-yellow-600 text-gray-200 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-500">Add New About Section</DialogTitle>
              <DialogDescription className="text-gray-400">Add a new about section to the database.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                placeholder="Title"
                value={newAbout.title || ''}
                onChange={e => setNewAbout({ ...newAbout, title: e.target.value })}
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              <select
                value={newAbout.category || ''}
                onChange={e => setNewAbout({ ...newAbout, category: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Select a category</option>
                {aboutCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
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
              <select
                value={newAbout.accent || ''}
                onChange={e => setNewAbout({ ...newAbout, accent: e.target.value })}
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">Select an accent</option>
                {accents.map(accent => (
                  <option key={accent} value={accent}>{accent}</option>
                ))}
              </select>
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
                onClick={addAbout}
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
            {about.length > 0 ? (
              about.map(item => (
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
    </div>
  );
}