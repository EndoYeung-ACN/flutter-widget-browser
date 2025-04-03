
export default function Button({ children, ...props }) {
  return (
    <button
      className="px-3 py-1 rounded border border-zinc-400 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}
