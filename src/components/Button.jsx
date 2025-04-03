export default function Button({ children, onClick, variant = "solid", size = "md", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white",
    ghost: "text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    icon: "p-2"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}
