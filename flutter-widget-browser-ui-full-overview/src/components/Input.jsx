
export default function Input({ className = '', ...props }) {
  return <input className={`w-full border px-3 py-2 rounded text-sm bg-white dark:bg-zinc-800 text-black dark:text-white ${className}`} {...props} />;
}
