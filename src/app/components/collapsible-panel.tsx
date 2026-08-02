"use client";

import { ReactNode, useState } from "react";

interface CollapsiblePanelProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsiblePanel({ title, defaultOpen = true, children }: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-3 text-left text-lg font-semibold text-slate-900 cursor-pointer"
      >
        <span>{title}</span>
        <span className="text-slate-400 text-sm">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
