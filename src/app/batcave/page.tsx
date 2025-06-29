// src/app/batcave/page.ts
'use client';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Projects from './projects';
import About from './about';
import { DataState } from './types';
import Certifications from './certification';
import { UserButton } from '@clerk/nextjs';

export default function BatcaveAdmin() {
  const [data, setData] = useState<DataState>({ projects: [], about: [], certificates: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show message with auto-dismiss
  useEffect(() => {
    if (message) {
      setMessageVisible(true);
      const timer = setTimeout(() => {
        setMessageVisible(false);
        setTimeout(() => setMessage(''), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch data from /api/home
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/home');
        if (!res.ok) throw new Error('Failed to fetch data');
        const fetchedData = await res.json();
        setData({
          projects: fetchedData.projects || [],
          about: fetchedData.about || [],
          certificates: fetchedData.certificates || []
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col">
          <span className="text-yellow-500 text-4xl text-center">🦇</span>
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
        <UserButton />
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

      <Tabs defaultValue="projects" className="mb-6">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger value="projects" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
            Projects
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
            About
          </TabsTrigger>
          <TabsTrigger value="certifications" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
            Certifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Projects
            projects={data.projects}
            setData={setData}
            setMessage={setMessage}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <About
            about={data.about}
            setData={setData}
            setMessage={setMessage}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </TabsContent>
        <TabsContent value="certifications" className="mt-6">
          <Certifications
            certificates={data.certificates}
            setData={setData}
            setMessage={setMessage}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </TabsContent>
      </Tabs>

      <footer className="mt-12 pt-4 border-t border-gray-800 text-gray-500 text-sm text-center">
        <p>BATCAVE ADMIN CONSOLE · AUTHORIZED ACCESS ONLY</p>
      </footer>
    </div>
  );
}