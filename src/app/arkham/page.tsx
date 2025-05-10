'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Smile, Skull, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ArkhamPage() {
  const router = useRouter();
  const [showLaugh, setShowLaugh] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [flickerLight, setFlickerLight] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const jokerQuotes = [
    "You logged in, thinking you mattered.",
    "Batsy's not home. But I am...",
    "Normies go to Arkham. Heroes go to the Cave.",
    "Why so serious about getting access?",
    "Oops! Wrong identity. You're not wearing the right mask.",
    "The joke's on you for thinking you're special!",
    "This isn't a cave, it's a MADHOUSE! HA HA HA!",
    "Access denied. Sanity optional.",
  ];
  
  useEffect(() => {
    // Cycle through quotes
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % jokerQuotes.length);
    }, 4000);
    
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, Math.random() * 5000 + 3000);
    
    // Flickering light effect
    const flickerInterval = setInterval(() => {
      setFlickerLight(true);
      setTimeout(() => setFlickerLight(false), 100);
    }, Math.random() * 8000 + 2000);
    
    return () => {
      clearInterval(quoteInterval);
      clearInterval(glitchInterval);
      clearInterval(flickerInterval);
    };
  }, []);
  
  // Play Joker laugh
  const playLaugh = () => {
    setShowLaugh(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => setShowLaugh(false), 3000);
  };
  
  // Fake escape button
  const fakeEscape = () => {
    playLaugh();
    const jokes = [
      "There's no escape from Arkham!",
      "Leaving so soon? The party just started!",
      "HA HA HA! Did you really think it would be that easy?",
      "The doors only open for the Bat. Not for you.",
      "Click, click, click... but all the exits are locked!",
    ];
    alert(jokes[Math.floor(Math.random() * jokes.length)]);
  };
  
  // Go back to login
  const goBack = () => {
    router.push('/');
  };

  return (
    <div className={`min-h-screen bg-gray-900 flex flex-col ${flickerLight ? 'bg-gray-950' : ''}`}>
      {/* Audio elements */}
      <audio ref={audioRef} className="hidden">
        <source src="/joker-laugh.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Flickering asylum lights */}
      <div className={`fixed top-0 left-0 w-full h-1 bg-green-500 ${flickerLight ? 'opacity-100' : 'opacity-70'} transition-opacity duration-100`}></div>
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 text-green-500 opacity-10 text-9xl font-bold transform rotate-12">HA HA HA</div>
        <div className="absolute bottom-0 left-0 text-red-500 opacity-10 text-9xl font-bold transform -rotate-12">HA HA HA</div>
        <div className="absolute top-1/4 left-1/4 text-purple-500 opacity-5 text-8xl font-bold transform rotate-45">ARKHAM</div>
      </div>
      
      {/* Glitch overlay */}
      {glitchEffect && (
        <div className="fixed inset-0 bg-red-500 opacity-5 z-10 pointer-events-none"></div>
      )}
      
      {/* Content */}
      <main className={`flex-grow flex flex-col items-center justify-center p-6 relative ${glitchEffect ? 'transform translate-x-1' : ''}`}>
        {/* Asylum logo */}
        <div className="mb-8 relative">
          <div className="text-center">
            <div className="border-4 border-yellow-500 p-4 relative transform rotate-2 bg-gray-900">
              <h2 className="text-xl text-gray-300 mb-1 font-mono">PROPERTY OF</h2>
              <h1 className={`text-4xl md:text-6xl font-bold text-yellow-500 ${glitchEffect ? 'text-red-500' : ''}`}>
                ARKHAM ASYLUM
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-red-500 transform -rotate-1 -z-10"></div>
          </div>
        </div>
        
        {/* Main message */}
        <div className={`text-center max-w-2xl mx-auto mb-12 ${glitchEffect ? 'transform -translate-x-1' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            You&apos;re not <span className="text-gray-400">Batman</span>...
            <br />Welcome to Arkham, <span className="text-red-500">Impostor</span> 🃏
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 font-semibold italic">
            &quot;Only the Bat gets in the Cave. You? You&apos;re just another clown in the madhouse.&quot;
          </p>
          
          {/* Joker quote carousel */}
          <div className="bg-gray-800 p-6 mb-12 border-l-4 border-green-500 relative">
            <div className="absolute -top-4 -left-4">
              <Smile size={32} className="text-green-500" />
            </div>
            <div className="absolute -bottom-4 -right-4">
              <Skull size={32} className="text-red-500" />
            </div>
            <p className="text-2xl text-gray-100 font-semibold min-h-16">
              &quot;{jokerQuotes[quoteIndex]}&quot;
            </p>
          </div>
          
          {/* Patient ID */}
          <div className="text-left bg-gray-800 p-4 mb-8 max-w-md mx-auto border border-yellow-600">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">PATIENT ID:</span>
              <span className="text-yellow-400 font-mono">#4479-JK</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-red-400 font-bold">UNAUTHORIZED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">THREAT LEVEL:</span>
              <span className="text-green-400 font-bold">PATHETIC</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg relative overflow-hidden group"
              onClick={fakeEscape}
            >
              <span className="relative z-10">ESCAPE ARKHAM</span>
              <span className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
            </Button>
            
            <Button 
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-950 font-bold py-3 px-6 text-lg"
              onClick={goBack}
            >
              <ArrowLeft size={20} className="mr-2" />
              Leave Quietly
            </Button>
          </div>
        </div>
        
        {/* Joker laugh overlay */}
        {showLaugh && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-green-900 bg-opacity-40">
            <div className="text-8xl text-red-500 font-bold animate-bounce">
              HA HA HA HA!
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 border-t border-gray-800">
        <p>ARKHAM ASYLUM • ELIZABETH ARKHAM ASYLUM FOR THE CRIMINALLY INSANE</p>
      </footer>
      
      {/* Broken glass effect corner */}
      <div className="fixed top-0 right-0 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L200 0L200 200" stroke="rgba(255,0,0,0.3)" strokeWidth="2" />
          <path d="M20 0L180 0L180 180" stroke="rgba(0,255,0,0.2)" strokeWidth="1" />
          <path d="M0 0L100 100L200 0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M150 0L0 150" stroke="rgba(255,0,0,0.1)" strokeWidth="1" />
          <path d="M180 0L0 180" stroke="rgba(0,255,0,0.1)" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Scattered "HA HA" graffiti */}
      <div className="fixed bottom-10 left-10 text-red-500 opacity-30 font-bold transform -rotate-12 text-xl pointer-events-none">HA HA HA</div>
      <div className="fixed top-20 right-20 text-green-500 opacity-20 font-bold transform rotate-45 text-xl pointer-events-none">HA HA</div>
    </div>
  );
}