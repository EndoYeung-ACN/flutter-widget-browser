
export default function Card({ children, className }) {
  return (
    <div className={`rounded-xl border bg-white dark:bg-zinc-900 shadow-sm ${className || ''}`}>
      {children}
    </div>
  );
}
