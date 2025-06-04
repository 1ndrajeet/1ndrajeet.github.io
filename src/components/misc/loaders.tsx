"use client";
import { useEffect, useState } from "react";
import { Gotu } from "next/font/google";

const gotu = Gotu({ subsets: ["devanagari"], weight: "400" });

export const LoaderLandingPage = () => {
  const [loadingText, setLoadingText] = useState("INITIALIZING");
  const [progressValue, setProgressValue] = useState(0);

  // Cycle through loading messages
  useEffect(() => {
    const messages = ["INITIALIZING", "LOADING", "DEPLOYING", "READY"];
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % messages.length;
      setLoadingText(messages[count]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const duration = 3000;
    let startTime: number | null = null;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setProgressValue(progress);
      if (progress < 100) requestAnimationFrame(animateProgress);
    };

    const animationId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-neutral-200">
      {/* Sanskrit quote */}
      <span className={`${gotu.className} text-sm font-bold text-neutral-400 mb-6`}>
        || विजिगीषु: न समवेतव्यः ||
      </span>

      {/* Loader */}
      <div className="w-full max-w-xs px-4">
        <p className="text-lg font-mono uppercase text-center mb-4">{loadingText}</p>
        <div className="h-1 bg-neutral-800 rounded">
          <div
            className="h-1 bg-amber-500 transition-all duration-100"
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-mono text-neutral-400">
          <span>START</span>
          <span>{Math.floor(progressValue)}%</span>
        </div>
      </div>

      {/* Signature */}
      <p className="mt-8 text-xs font-mono text-neutral-500">
        @1NDRAJEET
      </p>
    </div>
  );
};