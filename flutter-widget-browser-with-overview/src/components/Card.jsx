
export default function Card({ children, className }) {
  return <div className={`rounded-xl shadow-sm transition hover:shadow-md bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 ${className || ""}`}>{children}</div>;
}
