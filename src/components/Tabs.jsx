
export function Tabs({ value, onValueChange, children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={`flex gap-2 mb-2 ${className || ''}`}>{children}</div>;
}

export function TabsTrigger({ children, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 rounded-full text-sm font-medium border bg-white dark:bg-zinc-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
    >
      {children}
    </button>
  );
}
