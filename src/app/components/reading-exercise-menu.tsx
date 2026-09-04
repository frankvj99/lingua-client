"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ReadingExerciseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-slate-500 cursor-pointer"
      >
        Reading Exercise
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 mt-2 w-36 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-10"
        >
          <Link
            href="/reading-exercise"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Long Form
          </Link>
          <Link
            href="/short-reading-exercise"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Short Form
          </Link>
        </div>
      )}
    </div>
  );
}
