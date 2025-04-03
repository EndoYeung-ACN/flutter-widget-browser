import { useState } from "react";

export function Tabs({ value, children }) {
  return <div>{children}</div>;
}

export function TabsList({ children }) {
  return <div className="flex gap-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, selected, onClick, children }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full text-sm border ${
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
