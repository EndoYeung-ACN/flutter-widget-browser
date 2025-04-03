
export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border rounded px-3 py-2 text-sm shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${className}`}
      {...props}
    />
  );
}
