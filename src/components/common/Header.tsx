// src/components/common/Header.tsx
import React from "react";

export default function Header({ onOpenMenu }: { onOpenMenu?: () => void }) {
  return (
    <header className="w-full bg-transparent p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          aria-label="menu"
          onClick={onOpenMenu}
          className="p-2 border rounded bg-white/10"
        >
          <span className="block w-5 h-0.5 bg-brown-600 mb-1"></span>
          <span className="block w-5 h-0.5 bg-brown-600 mb-1"></span>
          <span className="block w-5 h-0.5 bg-brown-600"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-yellow-400">MAR</div>
          <div className="text-lg font-semibold text-brown-700">QUESPAÇO</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-brown-700 text-white px-4 py-1 rounded shadow-sm">Novo cliente</button>
      </div>
    </header>
  );
}
