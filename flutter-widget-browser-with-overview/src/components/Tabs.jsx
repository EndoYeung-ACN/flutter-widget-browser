
export function Tabs({ children }) {
  return <div>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={`flex gap-2 mb-2 flex-wrap ${className || ""}`}>{children}</div>;
}

export function TabsTrigger({ children, value, onClick, selected }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-1 border rounded-full text-sm font-medium transition ${
        selected ? "bg-blue-600 text-white" : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}
