"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { RingLoader } from "react-spinners";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const LoaderLandingPage = () => {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const duration = 3200;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const prog = Math.min((elapsed / duration) * 100, 100);
      setProgress(prog);
      if (prog < 100) requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] ${inter.className}`}>
      <div className="flex flex-col items-center w-full max-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <RingLoader color="#22d3ee" size={64} />
        </div>
        <div className="w-full h-1 bg-[#27272a] rounded-full">
          <div
            className="h-full bg-[#22d3ee] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="mt-4 text-xs text-[#71717a]">@1ndrajeet</p>
    </div>
  );
};