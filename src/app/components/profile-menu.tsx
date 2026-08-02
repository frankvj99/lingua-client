"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ProfileMenuProps {
  name?: string | null;
  email?: string | null;
}

function getInitial(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim();
  return source ? source.charAt(0).toUpperCase() : "?";
}

export default function ProfileMenu({ name, email }: ProfileMenuProps) {
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
        title={name ?? email ?? undefined}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-100 text-navy-800 text-sm font-medium hover:ring-2 hover:ring-navy-300 hover:ring-offset-2 transition cursor-pointer"
      >
        {getInitial(name, email)}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-10"
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Profile
          </Link>
          <a
            href="/auth/logout"
            role="menuitem"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
