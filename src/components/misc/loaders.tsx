import { useEffect, useState } from "react";

export const LoaderComponent = () => {
    const [loadingText, setLoadingText] = useState("Scanning Gotham");

    // Cycle through Batman-themed loading messages
    useEffect(() => {
        const messages = [
            "Scanning Gotham",
            "Accessing Batcomputer",
            "Analyzing Evidence",
            "Loading Protocols",
            "Engaging Bat-Systems"
        ];

        let count = 0;
        const interval = setInterval(() => {
            count = (count + 1) % messages.length;
            setLoadingText(messages[count]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300">
            {/* Bat signal pulsing */}
            <div className="relative mb-8">
                <div className="w-16 h-16 bg-yellow-500 rounded-full opacity-20 animate-pulse flex items-center justify-center"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
                        <path d="M24,18.2c0.7,0,0.9,0.2,0.9,0.2l0.4-1.7c0,0,0.4,1.5,0.4,2.8c0.2,1.1,2.2,0.4,3.9,0C31.4,19.1,32,16,32,16h16c0,0-9.4,3.5-7,10c0,0-14.8-2-17,7l0,0c-2.2-9-17-7-17-7c2.4-6.5-7-10-7-10h16c0,0,0.6,3.1,2.3,3.5c1.7,0.4,3.9,1.1,3.9,0c0.2-1.1,0.4-2.8,0.4-2.8l0.4,1.7C23.1,18.4,23.4,18.2,24,18.2L24,18.2L24,18.2z"></path>
                    </svg>
                </div>
            </div>

            {/* Loading text */}
            <div className="text-center">
                <p className="text-lg font-mono tracking-wider mb-2">{loadingText}</p>
                <div className="flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-ping" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-ping" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-ping" style={{ animationDelay: "600ms" }}></div>
                </div>
            </div>

            {/* Signature */}
            <div className="absolute bottom-6 left-0 right-0">
                <p className="text-xs text-gray-600 text-center font-mono">WAYNE ENTERPRISES</p>
            </div>
        </div>
    );
};