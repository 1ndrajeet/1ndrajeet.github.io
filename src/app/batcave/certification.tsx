'use client';

import { useState } from 'react';
import { Loader2, Plus, Trash2, Award, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CertificateType, CollectionType, AboutType, ProjectType } from './types';

type CertificationsProps = {
  certificates: CertificateType[];
  setData: React.Dispatch<React.SetStateAction<{ projects: ProjectType[]; about: AboutType[]; certificates: CertificateType[] }>>;
  setMessage: (msg: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
};

const certificationCategories = ['Hackathon', 'Course', 'Professional', 'Academic', 'Competition'] as const;

const categoryIcons = {
  'Hackathon': '🏆',
  'Course': '📚',
  'Professional': '💼',
  'Academic': '🎓',
  'Competition': '🥇'
};

export default function Certifications({ certificates, setData, setMessage, isSubmitting, setIsSubmitting }: CertificationsProps) {
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [newCert, setNewCert] = useState<Partial<CertificateType>>({});

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
    if (!confirm(`⚠️ BATCAVE SECURITY ALERT: Are you sure you want to delete this certification?`)) return;
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      setMessage('❌ Please upload a valid image (JPEG, PNG, or GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setMessage('❌ Image size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setNewCert(prev => ({ ...prev, image: data.url }));
        setMessage('✅ Image uploaded successfully!');
      } else {
        setMessage(`❌ Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch {
      setMessage('❌ Error uploading image');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function addCertification() {
    // Basic validation
    if (!newCert.title || !newCert.category || !newCert.date || !newCert.organization) {
      setMessage('❌ Please fill in all required fields (Title, Category, Date, Organization)');
      return;
    }

    addItem<CertificateType>('certificates', newCert, (result) => {
      setData(prev => ({
        ...prev,
        certificates: [...prev.certificates, { ...newCert, _id: result.id } as CertificateType],
      }));
      setNewCert({});
      setCertDialogOpen(false);
    });
  }

  async function deleteCertification(id: string) {
    deleteItem('certificates', id, () => {
      setData(prev => ({
        ...prev,
        certificates: prev.certificates.filter(c => c._id !== id),
      }));
    });
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Header with enhanced Batcave styling */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-black rounded-xl border border-yellow-600/50 shadow-lg shadow-yellow-600/10">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-600 p-2 rounded-full">
            <Award className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-yellow-500 tracking-tight">BATCAVE CERTIFICATIONS</h2>
            <p className="text-yellow-400/70 text-xs font-mono">{'//'} SECURE ACHIEVEMENT VAULT</p>
          </div>
        </div>
        <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-mono text-sm px-4 py-2 rounded-md transition-transform duration-200 hover:scale-105"
              onClick={() => setNewCert({})}
            >
              <Plus size={14} className="mr-1" />
              <span className="hidden sm:inline">ADD CERT</span>
              <span className="sm:hidden">ADD</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900/95 border border-yellow-600/50 text-gray-100 max-w-[95vw] sm:max-w-2xl max-h-[85vh] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent pointer-events-none" />
            <DialogHeader className="border-b border-yellow-600/30 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <DialogTitle className="text-lg font-bold text-yellow-500">NEW CERTIFICATION</DialogTitle>
                  <DialogDescription className="text-yellow-400/70 text-xs font-mono">
                    {'//'} Register achievement in Batcave
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable form content */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">TITLE *</label>
                <Input
                  placeholder="Certification title..."
                  value={newCert.title || ''}
                  onChange={e => setNewCert({ ...newCert, title: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">CATEGORY *</label>
                <select
                  value={newCert.category || ''}
                  onChange={e => setNewCert({ ...newCert, category: e.target.value })}
                  className="w-full bg-gray-800/50 border-yellow-600/30 text-gray-100 rounded-md p-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                >
                  <option value="">Select category</option>
                  {certificationCategories.map(category => (
                    <option key={category} value={category}>
                      {categoryIcons[category]} {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">DATE *</label>
                <Input
                  type="date"
                  value={newCert.date || ''}
                  onChange={e => setNewCert({ ...newCert, date: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">ORGANIZATION *</label>
                <Input
                  placeholder="Issuing organization..."
                  value={newCert.organization || ''}
                  onChange={e => setNewCert({ ...newCert, organization: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">INSTITUTION</label>
                <Input
                  placeholder="Associated institution..."
                  value={newCert.college || ''}
                  onChange={e => setNewCert({ ...newCert, college: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">CERTIFICATE IMAGE</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
                {newCert.image && (
                  <div className="mt-2">
                    <img src={newCert.image} alt="Preview" className="w-32 h-auto rounded-md border border-yellow-600/30" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">ALT TEXT</label>
                <Input
                  placeholder="Image description..."
                  value={newCert.alt || ''}
                  onChange={e => setNewCert({ ...newCert, alt: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">SKILLS</label>
                <Input
                  placeholder="Skills (comma-separated)..."
                  value={newCert.skills?.join(', ') || ''}
                  onChange={e =>
                    setNewCert({ ...newCert, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })
                  }
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">FEATURED</label>
                <div className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-md border border-yellow-600/30">
                  <input
                    type="checkbox"
                    checked={newCert.featured || false}
                    onChange={e => setNewCert({ ...newCert, featured: e.target.checked })}
                    className="w-4 h-4 accent-yellow-600"
                  />
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-200 font-mono text-sm">Mark as Featured</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-yellow-400 font-mono text-xs">DESCRIPTION</label>
                <Textarea
                  placeholder="Certification details and achievements..."
                  value={newCert.description || ''}
                  onChange={e => setNewCert({ ...newCert, description: e.target.value })}
                  className="bg-gray-800/50 border-yellow-600/30 text-gray-100 placeholder:text-gray-500 focus:border-yellow-500 font-mono min-h-[80px] text-sm"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter className="border-t border-yellow-600/30 pt-3 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setCertDialogOpen(false)}
                className="w-full sm:w-auto border-yellow-600/50 text-yellow-400 hover:bg-gray-800 font-mono text-sm"
              >
                CANCEL
              </Button>
              <Button
                onClick={addCertification}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-black font-mono text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    SAVING...
                  </>
                ) : (
                  'SAVE'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile-optimized table */}
      <div className="bg-gray-900 rounded-xl border border-yellow-600/50 shadow-lg overflow-hidden">
        <div className="bg-yellow-600/10 p-3 border-b border-yellow-600/30">
          <h3 className="text-yellow-400 font-mono text-xs tracking-wider">{'//'} ACHIEVEMENT LOG</h3>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-800/30 border-b border-yellow-600/30">
                <TableHead className="text-yellow-500 font-mono text-xs py-2">CERTIFICATION</TableHead>
                <TableHead className="text-yellow-500 font-mono text-xs py-2">CATEGORY</TableHead>
                <TableHead className="text-yellow-500 font-mono text-xs py-2 hidden sm:table-cell">ORGANIZATION</TableHead>
                <TableHead className="text-yellow-500 font-mono text-xs py-2 text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.length > 0 ? (
                certificates.map(cert => (
                  <TableRow key={cert._id} className="border-b border-gray-800/30 hover:bg-yellow-600/5">
                    <TableCell className="text-gray-100 font-mono text-sm py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{cert.title}</span>
                        {cert.date && (
                          <span className="text-xs text-gray-400">{new Date(cert.date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-600/10 text-yellow-400 border-yellow-600/30 font-mono text-xs">
                        {categoryIcons[cert.category as keyof typeof categoryIcons]} {cert.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-300 font-mono text-sm">
                      {cert.organization}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => deleteCertification(cert._id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-red-900/80 border-red-600 font-mono text-xs">
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <Award className="w-6 h-6 text-gray-600" />
                      <p className="font-mono text-sm">NO CERTIFICATIONS</p>
                      <p className="font-mono text-xs text-gray-600">{'//'} Vault is empty</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.6);
        }
      `}</style>
    </div>
  );
}