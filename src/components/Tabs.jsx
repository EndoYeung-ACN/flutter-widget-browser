
export function Tabs({ value, children }) {
  return <div>{children}</div>;
}

export function TabsList({ children }) {
  return <div className="flex gap-2 border-b pb-2 mb-2">{children}</div>;
}

export function TabsTrigger({ children, value, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1 rounded-t border-b-2 " +
        (selected
          ? "border-blue-500 text-blue-600 dark:text-blue-300"
          : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-white")
      }
    >
      {children}
    </button>
  );
}
