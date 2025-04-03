
export default function Card({ children, className = "" }) {
  return (
    <div className={"rounded-xl border bg-white dark:bg-zinc-800 dark:border-zinc-700 " + className}>
      {children}
    </div>
  );
}
