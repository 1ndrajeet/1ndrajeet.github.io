"use client";
import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleUpdateCursorPosition = () => {
      document.querySelectorAll("[data-cursor-dot], [data-cursor-outline]").forEach((el) => {
        el.style.left = `${cursorPosition.x}px`;
        el.style.top = `${cursorPosition.y}px`;
      });
    };

    requestAnimationFrame(handleUpdateCursorPosition);
  }, [cursorPosition]);

  return (
    <>
      <div
        className="fixed w-3 h-3 bg-gray-950 rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        data-cursor-dot
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      <div
        className="fixed w-8 h-8 border-2 border-emerald-400 rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000"
        data-cursor-outline
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
    </>
  );
};

export default CustomCursor;
