export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow ${className}`}>
      {children}
    </div>
  );
}
