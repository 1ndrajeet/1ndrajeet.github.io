"use client";
import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorOutlineRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorOutlineRef.current) {
      const { x, y } = cursorPosition;
      const outline = cursorOutlineRef.current;

      // Update dot position directly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }

      // Animate the outline
      outline.animate(
        [
          { transform: `translate(${x-16}px, ${y-16}px)` },
        ],
        {
          duration: 300,
          fill: "forwards",
          easing: "ease-out"
        }
      );
    }
  }, [cursorPosition]);

  return (
    <div className="md:block hidden">
      <div
        ref={cursorDotRef}
        className="fixed w-3 h-3 bg-gray-950 rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        data-cursor-dot
      ></div>
      <div
        ref={cursorOutlineRef}
        className="fixed w-8 h-8 border-2 border-emerald-400 rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        data-cursor-outline
      ></div>
    </div>
  );
};

export default CustomCursor;
